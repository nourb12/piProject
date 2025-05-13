import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InternshipOfferService } from 'src/app/services/internship-offer.service';
import { InternshipOffer } from 'src/app/models/internship-offer.model';
import { Application } from 'src/app/models/application.model';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  applicationForm: FormGroup;
  offer: InternshipOffer | null = null;
  private offerId: number | undefined;
  hasAlreadyApplied: boolean = false;
  applicationSubmitted: boolean = false;


  selectedPhoto: File | null = null;
  submittedApplication: Application | null = null;

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private internshipOfferService: InternshipOfferService
  ) {
    this.applicationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      careerObjective: ['', [Validators.required, Validators.maxLength(1000)]],
      technologyProfile: ['', [Validators.required, Validators.maxLength(1000)]],
      skills: ['', [Validators.required]],
      experiences: ['', [Validators.required, Validators.maxLength(2000)]],
      linkedinProfile: ['', [Validators.pattern('https?://.+')]],
      portfolio: ['', [Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.offerId = +params['offerId'];
      if (this.offerId) {
        this.fetchInternshipOffer(this.offerId);
      }
    });
  }

  fetchInternshipOffer(offerId: number): void {
    this.internshipOfferService.getInternshipOfferById(offerId).subscribe({
      next: (offer) => {
        this.offer = offer;
      },
      error: (err) => {
        console.error('❌ Error fetching offer:', err);
      }
    });
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPhoto = file;
    }
  }

  onSubmit(): void {
    if (this.applicationForm.invalid || !this.offerId || !this.offer) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('fullName', this.applicationForm.get('fullName')?.value);
    formData.append('email', this.applicationForm.get('email')?.value);
    formData.append('phone', this.applicationForm.get('phone')?.value);
    formData.append('city', this.applicationForm.get('city')?.value);
    formData.append('careerObjective', this.applicationForm.get('careerObjective')?.value);
    formData.append('technologyProfile', this.applicationForm.get('technologyProfile')?.value);
    formData.append('skills', this.applicationForm.get('skills')?.value);
    formData.append('experiences', this.applicationForm.get('experiences')?.value || 'N/A');
    formData.append('linkedinProfile', this.applicationForm.get('linkedinProfile')?.value || '');
    formData.append('portfolio', this.applicationForm.get('portfolio')?.value || '');
    formData.append('offerId', this.offerId.toString());
    formData.append('userId', '1'); // temporairement statique

    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }

    this.applicationService.submitApplication(formData).subscribe({
      next: (createdApplication) => {
        // ✅ Stocker l'ID dans localStorage AVANT la redirection
        localStorage.setItem('lastApplicationId', createdApplication.id.toString());
        console.log("🧠 ID stocké :", createdApplication.id);

        // ✅ Redirection dynamique vers les matched offers
        this.router.navigate(['/matched-offers', createdApplication.id]);

        // Nettoyage après soumission
        this.submittedApplication = createdApplication;
        this.applicationSubmitted = true;
        this.applicationForm.reset();
        this.selectedPhoto = null;
      },
      error: (err) => {
        const message = err?.error?.message || err?.error;

        if (err.status === 400 && message?.includes('has already applied')) {
          this.hasAlreadyApplied = true;
        } else {
          console.error('❌ Erreur lors de la soumission :', err);
          alert('Erreur : ' + message);
        }
      }
    });
  }

  redirectToHome(): void {
    this.router.navigate(['/']);
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPhoto = file;
    }
  }
  mapToPredictionPayload(applicationData: any, internshipOffer: any): any {
    return {
      IDCandidate: applicationData.id || 0,  // Replace with your ID logic if available
      NomCandidate: applicationData.fullName,
      Competences: applicationData.technologyProfile,  // Assuming this holds the technologies
      Langage_Dev: applicationData.skills.split(",")[0], // Map the first skill as primary language
      Langues_Parlees: "English, French",  // If you want, you can add this as a form input
      Domaine: internshipOffer.speciality || "DevOps",  // Map to the internship's speciality if available
      competences_offres: internshipOffer.stageType || "Spring Boot",  // Example mapping
      salaire: 1063  // You can replace this with a form field if you want
    };
  }

  predictApplication(applicationData: any, internshipOffer: any) {
    const payload = this.mapToPredictionPayload(applicationData, internshipOffer);
  
    this.applicationService.getPrediction(payload).subscribe({
      next: (response) => {
        console.log("🧠 Prediction Result: ", response);
        // Handle the response (e.g., display in the table or as a badge)
      },
      error: (err) => {
        console.error('❌ Error during prediction:', err);
      }
    });
  }
  
  
}
