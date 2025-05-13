import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profileback.service'; // <-- Assure-toi du bon chemin

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        console.log("📝 Profil récupéré :", this.user);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la récupération du profil :', err);
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  goToLastMatchedOffers(event: Event): void {
    event.preventDefault();
    const lastId = localStorage.getItem('lastApplicationId');
    if (lastId) {
      this.router.navigate(['/matched-offers', lastId]);
    } else {
      alert('😕 Aucune candidature récente trouvée.');
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
