import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InternshipOfferService } from 'src/app/services/internship-offer.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { ApplicationService } from '../services/application.service';
interface Weather {
  description: string;
  icon: string;
}

interface WeatherResponse {
  name: string;
  main: { temp: number };
  weather: Weather[];
}

interface InternshipOffer {
  id?: number;
  title: string;
  companyName: string;
  location: string;
  stageType: string;
  offerStatus: string;
  paid: boolean;
  imageUrls: string[];
  jobDescription: string;
  lat?: number;
  lng?: number;
  weather?: WeatherResponse;
}

@Component({
  selector: 'app-internship-offers',
  templateUrl: './internship-offers.component.html',
  styleUrls: ['./internship-offers.component.css']
})
export class InternshipOffersComponent implements OnInit, AfterViewInit {
  offers: InternshipOffer[] = [];
  filteredOffers: InternshipOffer[] = [];
  searchTerm: string = '';
  statusFilter: string = '';
  paidFilter: boolean = false;
  sortField: keyof InternshipOffer = '' as keyof InternshipOffer;
  sortDirection: 'asc' | 'desc' = 'asc';
  proximityRadius: number = 50;
  selectedOffer: InternshipOffer | null = null;
  showApplicationForm: boolean = false;
  applicationForm: FormGroup;
  map!: L.Map;
  selectedLocation: { lat: number; lng: number; name: string } | null = null;
  geocodeError: string | null = null;
  hasAlreadyApplied: boolean = false;
  selectedPhoto: File | null = null;


  @ViewChild('mapFilter') mapFilter!: ElementRef;

  constructor(
    private offerService: InternshipOfferService,
    private applicationService: ApplicationService,
    private fb: FormBuilder,
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
      portfolio: [''],
      photo: [null], // champ pour fichier
      submissionDate: [new Date().toISOString().slice(0, 16), Validators.required]
    });
  }    

  ngOnInit(): void {
    this.loadOffers();
  }

  ngAfterViewInit(): void {
    if (!this.mapFilter || !this.mapFilter.nativeElement) {
      console.error('Map container not found in DOM');
      return;
    }
    this.initializeMap();
  }

  initializeMap(): void {
    console.log('Initializing map...');
    this.map = L.map(this.mapFilter.nativeElement, {
      zoom: 6,
      center: L.latLng(34.0, 9.0),
      maxBounds: L.latLngBounds(L.latLng(30.0, 7.0), L.latLng(38.0, 12.0)),
      maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
      console.log('Map size invalidated');
    }, 100);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      console.log('Map clicked at:', e.latlng);
      this.geocodeError = null;
      this.getLocationFromCoordinates(e.latlng.lat, e.latlng.lng);
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
          this.map.removeLayer(layer);
        }
      });
      L.circle([e.latlng.lat, e.latlng.lng], { radius: this.proximityRadius * 1000 }).addTo(this.map);
    });
  }

  async getLocationFromCoordinates(lat: number, lng: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
      );
      const data = await response.json();
      const locationName = data.address.state || data.address.city || data.address.town || 'Unknown location';
      this.selectedLocation = { lat, lng, name: locationName };
      console.log('Selected location:', this.selectedLocation);
      this.filterOffers();
    } catch (error) {
      console.error('Error fetching location:', error);
      this.geocodeError = 'Could not determine location. Please try again.';
      this.selectedLocation = null;
      this.filterOffers();
    }
  }

  // Geocode location string to lat/lng
  async geocodeLocation(location: string): Promise<{ lat: number; lng: number }> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
      console.warn(`No coordinates found for location: ${location}`);
      return { lat: 0, lng: 0 }; // Fallback
    } catch (error) {
      console.error('Geocoding error:', error);
      return { lat: 0, lng: 0 };
    }
  }

 

  // ✅ Méthode modifiée pour charger les offres avec météo
  async loadOffers(): Promise<void> {
    this.offerService.getAllInternshipOffersWithWeather().subscribe(
      async (offers) => {
        console.log('📦 Données reçues du backend:', offers); // <= AJOUTE ÇA
    
        this.offers = offers;
        for (const offer of this.offers) {
          if (!offer.lat || !offer.lng) {
            const coords = await this.geocodeLocation(offer.location);
            offer.lat = coords.lat;
            offer.lng = coords.lng;
          }
        }
        this.filteredOffers = [...this.offers];
        this.filterOffers();
      },
      (error) => {
        console.error('❌ Erreur lors du chargement des offres:', error);
      }
    );
  }    

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  filterOffers(): void {
    let tempOffers = [...this.offers];
    console.log('Filtering offers with:', {
      searchTerm: this.searchTerm,
      statusFilter: this.statusFilter,
      paidFilter: this.paidFilter,
      proximityRadius: this.proximityRadius,
      selectedLocation: this.selectedLocation
    });

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      tempOffers = tempOffers.filter(offer =>
        offer.title.toLowerCase().includes(term) ||
        offer.companyName.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (this.statusFilter) {
      tempOffers = tempOffers.filter(offer => offer.offerStatus === this.statusFilter);
    }

    // Paid filter
    if (this.paidFilter) {
      tempOffers = tempOffers.filter(offer => offer.paid);
    }

    // Proximity filter
    if (this.selectedLocation && this.proximityRadius) {
      tempOffers = tempOffers.filter(offer => {
        if (offer.lat && offer.lng && this.selectedLocation) {
          const distance = this.calculateDistance(
            this.selectedLocation.lat,
            this.selectedLocation.lng,
            offer.lat,
            offer.lng
          );
          console.log(`Offer: ${offer.title}, Distance: ${distance} km, Within radius: ${distance <= this.proximityRadius}`);
          return distance <= this.proximityRadius;
        }
        console.log(`Offer: ${offer.title} excluded - no valid lat/lng`);
        return false; // Exclude if no valid coordinates
      });
    }

    // Sorting (unchanged)
    if (this.sortField) {
      tempOffers.sort((a, b) => {
        const aValue = a[this.sortField];
        const bValue = b[this.sortField];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }
        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          return this.sortDirection === 'asc'
            ? aValue === bValue ? 0 : aValue ? -1 : 1
            : bValue === aValue ? 0 : bValue ? -1 : 1;
        }
        return 0;
      });
    }

    this.filteredOffers = tempOffers;
  }

  onProximityChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.proximityRadius = value ? parseInt(value) : 50;
    console.log('Proximity radius changed to:', this.proximityRadius);
    this.filterOffers();
  }

  // Other methods (unchanged for brevity)
  openDetails(offer: InternshipOffer): void { this.selectedOffer = offer; }
  closeDetails(): void { this.selectedOffer = null; }
  openApplicationForm(offer: InternshipOffer): void { this.selectedOffer = offer; this.showApplicationForm = true; this.hasAlreadyApplied = false; }
  closeApplicationForm(): void { this.showApplicationForm = false; this.applicationForm.reset({ submissionDate: new Date().toISOString().slice(0, 16) }); }
  closeAlreadyAppliedPopup(): void { this.hasAlreadyApplied = false; this.showApplicationForm = false; this.applicationForm.reset({ submissionDate: new Date().toISOString().slice(0, 16) }); }

  submitApplication(): void {
    if (this.applicationForm.invalid || !this.selectedOffer) {
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
    formData.append('experiences', this.applicationForm.get('experiences')?.value || '');
    formData.append('linkedinProfile', this.applicationForm.get('linkedinProfile')?.value || '');
    formData.append('portfolio', this.applicationForm.get('portfolio')?.value || '');
    formData.append('submissionDate', this.applicationForm.get('submissionDate')?.value);
    formData.append('offerId', this.selectedOffer.id!.toString());
    formData.append('userId', '1'); // statique temporairement
  
    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }
  
    this.applicationService.submitApplication(formData).subscribe({
      next: (response: any) => {
        console.log('✅ Application submitted successfully:', response);
  
        // ✅ AJOUT ICI : stocker l'ID de l'application dans localStorage
        localStorage.setItem('lastApplicationId', response.id.toString());
        console.log("🧠 ID enregistré dans localStorage :", response.id);
  
        alert('✅ Application submitted successfully!');
        this.closeApplicationForm();
      },
      error: (err) => {
        if (err.status === 400 && err.error?.error === 'Vous avez déjà postulé à cette offre.') {
          this.hasAlreadyApplied = true;
        } else {
          alert('❌ Error submitting application: ' + (err.error?.message || 'Already Submitted'));
          console.error('❌ Submission error:', err);
        }
      }
    });
  }
  
  
  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPhoto = file;
    }
  }
  
}    