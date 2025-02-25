import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ✅ Import des composants Front
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { PartnershipsComponent } from './components/partnerships/partnerships.component';
import { AboutComponent } from './components/about/about.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';

// ✅ Import des composants Back
import { FooterbackComponent } from './components/footerback/footerback.component';
import { HomebackComponent } from './components/homeback/homeback.component';
import { SidebackComponent } from './components/sideback/sideback.component';
import { HeaderbackComponent } from './components/headerback/headerback.component';
import { ProfilebackComponent } from './profileback/profileback.component';
<<<<<<< Updated upstream
=======
import { LayoutComponent } from './components/layout/layout.component';

// ✅ Import des pages importantes
import { LoginfrontComponent } from './loginfront/loginfront.component';
import { InternshipOfferFormComponent } from './components/internship-offer-form/internship-offer-form.component';
import { DashboardOffersComponent } from './components/dashboard-offers/dashboard-offers.component';


// ✅ Modules nécessaires pour Angular
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InternshipOffersComponent } from './intershipoffers/internship-offers.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    // ✅ Composants Front
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    HeroComponent,
    PartnershipsComponent,
    AboutComponent,
    TestimonialsComponent,
    ContactComponent,
    // ✅ Composants Back
    FooterbackComponent,
    HomebackComponent,
    SidebackComponent,
    HeaderbackComponent,
<<<<<<< Updated upstream
    LoginfrontComponent,
    ProfilebackComponent
=======
    ProfilebackComponent,
    LayoutComponent,
    // ✅ Pages et formulaires
    LoginfrontComponent,
    InternshipOffersComponent,
    InternshipOfferFormComponent,
    DashboardOffersComponent,
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // 📌 Gestion des routes
    HttpClientModule,  // 📌 Pour les requêtes API
    ReactiveFormsModule, // 📌 Pour les formulaires dynamiques `[formGroup]`
    FormsModule, // 📌 Pour `ngModel`
    CommonModule, // 📌 Pour éviter les erreurs `ngClass`
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
