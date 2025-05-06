import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Core Modules
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// ✅ FRONT Components
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { PartnershipsComponent } from './components/partnerships/partnerships.component';
import { AboutComponent } from './components/about/about.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { InternshipOffersComponent } from './intershipoffers/internship-offers.component';
import { MyApplicationsComponent } from './components/my-applications/my-applications.component';

// ✅ BACKOFFICE Components
import { FooterbackComponent } from './components/footerback/footerback.component';
import { HomebackComponent } from './components/homeback/homeback.component';
import { SidebackComponent } from './components/sideback/sideback.component';
import { HeaderbackComponent } from './components/headerback/headerback.component';
import { ProfilebackComponent } from './profileback/profileback.component';
import { LayoutComponent } from './components/layout/layout.component';
import { InternshipOfferFormComponent } from './components/internship-offer-form/internship-offer-form.component';
import { DashboardOffersComponent } from './components/dashboard-offers/dashboard-offers.component';
import { DashboardApplicationsComponent } from './components/dashboard-applications/dashboard-applications.component';


// ✅ Statistiques
import { GlobalStatisticsComponent } from './statistics/global-statistics/global-statistics.component';
import { CompanyStatisticsComponent } from './statistics/company-statistics/company-statistics.component';
import { StatisticsService } from './services/statistics.service';

// ✅ Login
import { LoginfrontComponent } from './loginfront/loginfront.component';

// ✅ Charts
import { NgChartsModule } from 'ng2-charts';
import { ApplicationFormComponent } from './components/applications-form/application-form.component';
import { MatchedOffersComponent } from './components/matched-offers/matched-offers.component';
import { HeartAnimationComponent } from './heart-animation/heart-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    // Front
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    HeroComponent,
    PartnershipsComponent,
    AboutComponent,
    TestimonialsComponent,
    ContactComponent,
    InternshipOffersComponent,
    MyApplicationsComponent,
    LoginfrontComponent,

    // Back
    FooterbackComponent,
    HomebackComponent,
    SidebackComponent,
    HeaderbackComponent,
    ProfilebackComponent,
    LayoutComponent,
    InternshipOfferFormComponent,
    DashboardOffersComponent,
    DashboardApplicationsComponent,
    ApplicationFormComponent,

    // Statistiques
    GlobalStatisticsComponent,
    CompanyStatisticsComponent,
    MatchedOffersComponent,
    HeartAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    NgChartsModule,
    DragDropModule
  ],
  providers: [StatisticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
