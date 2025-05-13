import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { MatchedOffer } from '../../models/matched-offer.model';
import { Application } from '../../models/application.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-matched-offers',
  templateUrl: './matched-offers.component.html',
  styleUrls: ['./matched-offers.component.css']
})
export class MatchedOffersComponent implements OnInit {

  matchedOffers: MatchedOffer[] = [];
  selectedOffer?: MatchedOffer;
  showApplicationForm: boolean = false;
  applicationForm: FormGroup;
  selectedPhoto: File | null = null;
  hasAlreadyApplied: boolean = false;
  submittedApplication: Application | null = null;
  applicationSubmitted: boolean = false;
  submissionId!: number;
  showHeart: boolean = true;
  constructor(
    private appService: ApplicationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.applicationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      careerObjective: ['', [Validators.required, Validators.maxLength(1000)]],
      technologyProfile: ['', [Validators.required, Validators.maxLength(1000)]],
      skills: ['', [Validators.required]],
      experiences: ['', [Validators.maxLength(2000)]],
      linkedinProfile: [''],
      portfolio: ['']
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('submissionId');
      if (id && !isNaN(+id)) {
        this.submissionId = +id;
        this.getMatchedOffers();
      } else {
        alert("❗ ID de soumission invalide");
      }
    });
  }
  onAnimationFinished(): void {
    this.showHeart = false;
  }
  

  getMatchedOffers(): void {
    this.appService.getMatchedOffers(this.submissionId).subscribe(
      (offers) => {
        this.matchedOffers = offers;
      },
      (error) => {
        console.error("❌ Erreur lors de la récupération des offres matchées :", error);
      }
    );
  }

  openApplicationForm(offer: MatchedOffer): void {
    this.selectedOffer = offer;
    this.showApplicationForm = true;
    this.hasAlreadyApplied = false;
  }

  closeApplicationForm(): void {
    this.showApplicationForm = false;
    this.applicationForm.reset();
    this.selectedPhoto = null;
  }

  closeDetails(): void {
    this.selectedOffer = undefined;
    this.showApplicationForm = false;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPhoto = file;
    }
  }

  onSubmit(): void {
    if (this.applicationForm.invalid || !this.selectedOffer) {
      this.applicationForm.markAllAsTouched();
      this.applicationSubmitted = true;
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
    formData.append('experiences', this.applicationForm.get('experiences')?.value || '');
    formData.append('linkedinProfile', this.applicationForm.get('linkedinProfile')?.value || '');
    formData.append('portfolio', this.applicationForm.get('portfolio')?.value || '');
    formData.append('offerId', this.selectedOffer.id!.toString());
    formData.append('userId', '1'); // statique temporairement

    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }

    this.appService.submitApplication(formData).subscribe({
      next: (application) => {
        // 🧠 Mettre à jour localStorage avant de rediriger
        localStorage.setItem('lastApplicationId', application.id.toString());
        console.log("🧠 Dernier ID enregistré dans localStorage :", application.id);
    
        this.router.navigate(['/matched-offers', application.id]); // 🔁 Redirection dynamique
    
        this.submittedApplication = application;
        this.applicationSubmitted = true;
        this.applicationForm.reset();
        this.selectedPhoto = null;
        this.showApplicationForm = false;
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
  closeAlreadyAppliedPopup(): void {
    this.hasAlreadyApplied = false;
    this.closeApplicationForm();
  }
}
