import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s]+$/)]], // Only letters and spaces
      description: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]], // Only letters and spaces
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required, this.endDateValidator]], // Custom validator for end date
      status: ['', Validators.required]
    });
  }

  // Custom Validator for endDate
  endDateValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.parent?.get('startDate')?.value;
    const endDate = control.value;
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { endDateInvalid: true }; // If endDate is before startDate, return error
    }
    return null; // If valid, return null
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe({
        next: () => {
          alert('Projet créé avec succès !');
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du projet', err);
        }
      });
    }
  }
}
