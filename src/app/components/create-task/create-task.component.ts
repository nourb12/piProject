import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  projectId!: number;
  successMessage: string='';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      position: [1, Validators.required], 
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = { ...this.taskForm.value, projectId: this.projectId };
      this.successMessage = `Task added successfully to project: ${this.projectId}`;

      this.taskService.createTask(taskData).subscribe(() => {
        this.router.navigate(['/list-project']); 
      });
    }
  }
}
