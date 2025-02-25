import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomebackComponent } from './components/homeback/homeback.component';
import { HeaderbackComponent } from './components/headerback/headerback.component';
import { LoginfrontComponent } from './loginfront/loginfront.component';
import { ProfilebackComponent } from './profileback/profileback.component';
<<<<<<< Updated upstream

const routes: Routes = [
  { path: '', redirectTo: 'front', pathMatch: 'full' }, // Redirige vers /front au lieu de répéter HomeComponent
=======

import { InternshipOfferFormComponent } from './components/internship-offer-form/internship-offer-form.component';
import { DashboardOffersComponent } from './components/dashboard-offers/dashboard-offers.component';
import { InternshipOffersComponent } from './intershipoffers/internship-offers.component';

const routes: Routes = [
  // 🎯 Route par défaut → Redirige vers la page d'accueil du front
  { path: '', redirectTo: 'front', pathMatch: 'full' },

  // 🎯 Routes du FRONT
>>>>>>> Stashed changes
  { path: 'front', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginfrontComponent },
<<<<<<< Updated upstream
  { path: 'homeback', component: HomebackComponent },
  { path: 'profileback', component: ProfilebackComponent },
 // { path: '**', redirectTo: 'front', pathMatch: 'full' } // Gère les routes inconnues
=======

  // 🎯 Liste des offres de stage (Front)
  { path: 'internship-list', component: InternshipOffersComponent },

  // 🎯 Routes du BACK-OFFICE
  { 
    path: 'backoffice', component: ProfilebackComponent, 
    children: [
      { path: 'internship-offer-form', component: InternshipOfferFormComponent },
      { path: 'dashboard-offers', component: DashboardOffersComponent }
    ] 
  },

  // 🎯 Gestion des erreurs (redirection vers la page d'accueil si URL inconnue)
  { path: '**', redirectTo: 'front', pathMatch: 'full' }
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
