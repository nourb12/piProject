import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InternshipOfferService } from '../../services/internship-offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InternshipOffer } from 'src/app/models/internship-offer.model';

@Component({
  selector: 'app-internship-offer-form',
  templateUrl: './internship-offer-form.component.html',
  styleUrls: ['./internship-offer-form.component.css']
})
export class InternshipOfferFormComponent implements OnInit {
  internshipForm: FormGroup;
  selectedFiles: File[] = [];
  fileError = false;
  offerId: number | null = null;

  // 24 gouvernorats tunisiens pour le dropdown
  locations: string[] = [
    "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa",
    "Jendouba", "Kairouan", "Kasserine", "Kébili", "Kef", "Mahdia",
    "Manouba", "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid",
    "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
  ];

  constructor(
    private fb: FormBuilder,
    private offerService: InternshipOfferService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.internshipForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      companyName: ['', [Validators.required, Validators.maxLength(100)]],
      location: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      stageType: ['', Validators.required],
      offerStatus: ['', Validators.required],
      remote: [false], // ✅ Correction : Boolean au lieu de string
      paid: [false],   // ✅ Correction : Boolean au lieu de string
      startDate: ['', Validators.required],
      jobDescription: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.offerId = +params['id']; // Convertir en nombre
        this.loadOffer(this.offerId);
      }
    });
  }
  
  // ✅ Charger une offre si on est en mode édition (Update)
  loadOffer(id: number): void {
    this.offerService.getInternshipOfferById(id).subscribe(
      (offer: InternshipOffer) => {
        this.internshipForm.patchValue(offer); // Remplit le formulaire avec les données existantes
      },
      (error) => {
        console.error('❌ Error loading offer:', error);
      }
    );
  }
  

  // ✅ Gestion sélection images multiples
  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.fileError = this.selectedFiles.length === 0;
  }

  // ✅ Soumission du formulaire (Ajout ou Mise à jour)
  submitOffer() {
    if (this.internshipForm.invalid) {
      this.internshipForm.markAllAsTouched();
      return;
    }

    const formData = { ...this.internshipForm.value };

    if (this.offerId) {
      // 🔄 **Mise à jour**
      this.offerService.updateInternshipOffer(this.offerId, formData, this.selectedFiles)
        .subscribe(() => {
          alert("✅ Offer updated successfully!");
          this.router.navigate(['/backoffice/dashboard-offers']);
        }, () => {
          alert("❌ Error updating offer!");
        });
    } else {
      // ➕ **Ajout d'une nouvelle offre**
      if (this.selectedFiles.length === 0) {
        this.fileError = true;
        return;
      }

      this.offerService.addInternshipOffer(formData, this.selectedFiles)
        .subscribe(() => {
          alert("✅ Offer added successfully!");
          this.router.navigate(['/backoffice/dashboard-offers']);
        }, () => {
          alert("❌ Error adding offer!");
        });
    }
  }
}
