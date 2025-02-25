import { Component, OnInit } from '@angular/core';
import { InternshipOffer } from 'src/app/models/internship-offer.model';
import { InternshipOfferService } from 'src/app/services/internship-offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-offers',
  templateUrl: './dashboard-offers.component.html',
  styleUrls: ['./dashboard-offers.component.css']
})
export class DashboardOffersComponent implements OnInit {
  internshipOffers: InternshipOffer[] = [];

  constructor(private internshipService: InternshipOfferService, private router: Router) {}

  ngOnInit(): void {
    this.fetchInternshipOffers();
  }

  fetchInternshipOffers(): void {
    this.internshipService.getAllInternshipOffers().subscribe(
      (offers) => {
        this.internshipOffers = offers;
      },
      (error) => {
        console.error('❌ Error fetching internship offers:', error);
      }
    );
  }

  deleteOffer(id: number): void {
    console.log("Tentative de suppression de l'offre ID :", id); // Debug
    if (confirm('🚨 Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      this.internshipService.deleteInternshipOffer(id).subscribe({
        next: () => {
          alert('✅ Offre supprimée avec succès !');
          this.internshipOffers = this.internshipOffers.filter(offer => offer.id !== id); // Met à jour la liste
        },
        error: (error) => {
          console.error('❌ Erreur lors de la suppression:', error);
          alert('⚠️ Erreur lors de la suppression. Veuillez réessayer.');
        }
      });
    }
  }
  

  updateOffer(id: number): void {
    // Redirige vers le formulaire en passant l'ID dans l'URL
    this.router.navigate(['/backoffice/internship-offer-form'], { queryParams: { id: id } });
  }
}
