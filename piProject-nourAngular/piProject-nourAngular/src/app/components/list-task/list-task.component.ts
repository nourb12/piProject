import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  projectId!: number;
  plannedTasks: any[] = [];
  inProgressTasks: any[] = [];
  completedTasks: any[] = [];
  isDarkMode: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;
    this.fetchTasks();
    this.applyTheme();
  }

  fetchTasks() {
    this.taskService.getTasksByProject(this.projectId).subscribe(
      tasks => {
        this.plannedTasks = tasks.filter(t => t.status === 'PLANNED');
        this.inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
        this.completedTasks = tasks.filter(t => t.status === 'COMPLETED');
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  drop(event: CdkDragDrop<any[]>, newStatus: string): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      task.status = newStatus;
      this.taskService.updateTask(this.projectId, task.id, task).subscribe();
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  applyTheme(): void {
    const themeClass = this.isDarkMode ? 'dark-theme' : 'light-theme';
    const removeClass = this.isDarkMode ? 'light-theme' : 'dark-theme';
    this.renderer.removeClass(document.body, removeClass);
    this.renderer.addClass(document.body, themeClass);
  }
}
