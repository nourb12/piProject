import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  goToLastMatchedOffers(event: Event): void {
    event.preventDefault(); // Empêche le rechargement

    const lastId = localStorage.getItem('lastApplicationId');
    console.log('📦 [Navbar] ID récupéré du localStorage :', lastId);

    if (lastId) {
      this.router.navigate(['/matched-offers', lastId]);
    } else {
      alert('😕 Aucune candidature récente trouvée.');
    }
  }
}
