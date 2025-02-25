import { Component, OnInit } from '@angular/core';
import { InternshipOfferService } from 'src/app/services/internship-offer.service';


@Component({
  selector: 'app-internship-offers',
  templateUrl: './internship-offers.component.html',
  styleUrls: ['./internship-offers.component.css']
})
export class InternshipOffersComponent implements OnInit {
  internshipOffers: any[] = [];
  selectedOffer: any = null;

  constructor(private internshipService: InternshipOfferService) {}

  ngOnInit(): void {
    this.fetchInternshipOffers();
  }

  fetchInternshipOffers(): void {
    this.internshipService.getAllInternshipOffers().subscribe(
      (offers) => {
        this.internshipOffers = offers;
      },
      (error) => {
        console.error('❌ Erreur lors de la récupération des offres:', error);
      }
    );
  }

  openDetails(offer: any): void {
    this.selectedOffer = offer;
  }

  closeDetails(): void {
    this.selectedOffer = null;
  }
}
