import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  projectId!: number;
  tasks: any[] = []; // Replace with your task type, e.g., Task[]

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router // Inject your task service to fetch tasks
  ) {}

  ngOnInit(): void {
    // Get the project ID from the route parameter
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;

    // Fetch tasks for the specified project
    this.taskService.getTasksByProject(this.projectId).subscribe(
      tasks => {
        this.tasks = tasks;
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  // Navigate to the update task page
  editTask(task: any): void {
    if (task && task.project && task.project.id) {
      this.router.navigate([`/list-task/${task.project.id}/update-task`, task.id]);
    } else {
      console.error('Task or project ID is undefined', task);
    }
  }
  deleteTask(projectId: number, taskId: number): void {
    this.taskService.deleteTask(projectId, taskId).subscribe(
      () => {
        console.log('Task deleted successfully');
        this.tasks = this.tasks.filter(task => task.id !== taskId); // Remove deleted task from the list
      },
      error => {
        console.error('Error deleting task', error);
      }
    );
  }
  markAsCompleted(taskId: number): void {
    this.taskService.markTaskAsCompleted(taskId).subscribe({
      next: (updatedTask) => {
        console.log(`Task ${taskId} marked as completed`);
        
        // Mise à jour locale de l'état de la tâche pour masquer le bouton
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
          task.status = 'COMPLETED';
        }
      },
      error: (err) => {
        console.error('Error marking task as completed:', err);
      }
    });
  }
  
  
  
}
