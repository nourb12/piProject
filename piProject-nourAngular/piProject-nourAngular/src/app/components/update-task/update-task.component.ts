import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  projectId!: number;
  taskId!: number;
  taskForm!: FormGroup;
  task: any;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get projectId and taskId from the URL
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;
    this.taskId = +this.route.snapshot.paramMap.get('taskId')!;

    // Fetch task data using taskId and projectId
    this.taskService.getTaskByProjectAndId(this.projectId, this.taskId).subscribe(
      (task) => {
        this.task = task;
        this.initializeForm();
      },
      (error) => {
        console.error('Error fetching task', error);
        // Handle error if task is not found
      }
    );
  }

  initializeForm(): void {
    // Initialize the form with the fetched task data
    this.taskForm = this.fb.group({
      title: [this.task.title, [Validators.required]],
      description: [this.task.description, [Validators.required]],
      position: [this.task.position, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask = {
        ...this.task,
        ...this.taskForm.value
      };
      this.taskService.updateTask(this.projectId, this.taskId, updatedTask).subscribe(
        (response) => {
          console.log('Task updated successfully', response);
          // Navigate back to the list of tasks after update
          this.router.navigate([`/list-task/${this.projectId}`]);
        },
        (error) => {
          console.error('Error updating task', error);
        }
      );
    }
}


  // Cancel button handler (optional, navigate back to task list)
  onCancel(): void {
    this.router.navigate([`/list-task/${this.projectId}`]);
  }
}
