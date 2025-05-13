import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;
  users: any[] = []; // Stocker la liste des utilisateurs

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s]+$/)]], 
      description: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]], 
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required, this.endDateValidator]],
      status: ['', Validators.required],
     // userId: ['', Validators.required] 
    });


    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
      }
    });
  }

  endDateValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.parent?.get('startDate')?.value;
    const endDate = control.value;
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { endDateInvalid: true }; 
    }
    return null; 
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe({
        next: () => {
          alert('Projet créé avec succès !');
          this.router.navigate(['/list-project']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du projet', err);
        }
      });
    }
  }
}
