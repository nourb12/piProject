import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class ProjectUpdateComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({});
  projectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    // Create the form with default values
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required, this.endDateValidator.bind(this)]],
      status: ['', Validators.required]
    });

    if (this.projectId) {
      this.loadProject();
    }
  }

  loadProject(): void {
    this.projectService.getProjectById(this.projectId!).subscribe((data) => {
      this.projectForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService.updateProject(this.projectId!, this.projectForm.value).subscribe(() => {
        this.router.navigate(['/list-project']); 
      });
    }
  }

  endDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = this.projectForm?.get('startDate')?.value;
    const endDate = control.value;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { 'endDateInvalid': true };
    }
    return null;
  }
}
