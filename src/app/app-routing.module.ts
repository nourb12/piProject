import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 🌍 FRONT Components
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginfrontComponent } from './loginfront/loginfront.component';
import { InternshipOffersComponent } from './intershipoffers/internship-offers.component';
import { MyApplicationsComponent } from './components/my-applications/my-applications.component';


// 🏢 BACKOFFICE Components
import { ProfilebackComponent } from './profileback/profileback.component';
import { InternshipOfferFormComponent } from './components/internship-offer-form/internship-offer-form.component';
import { DashboardOffersComponent } from './components/dashboard-offers/dashboard-offers.component';
import { DashboardApplicationsComponent } from './components/dashboard-applications/dashboard-applications.component';
import { GlobalStatisticsComponent } from './statistics/global-statistics/global-statistics.component';
import { CompanyStatisticsComponent } from './statistics/company-statistics/company-statistics.component';
import { ApplicationFormComponent } from './components/applications-form/application-form.component';
import { MatchedOffersComponent } from './components/matched-offers/matched-offers.component';

const routes: Routes = [
  // ✅ Redirection par défaut vers la page d'accueil
  { path: '', redirectTo: 'front', pathMatch: 'full' },

  // 🌍 Routes du FRONT
  { path: 'front', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginfrontComponent },
  { path: 'my-applications', component: MyApplicationsComponent },
  { path: 'application-form/:offerId', component: ApplicationFormComponent },
  { path: 'internship-list', component: InternshipOffersComponent },
  { path: 'matched-offers/:submissionId', component: MatchedOffersComponent }
,

  // 🏢 Routes du BACKOFFICE (avec children dans ProfilebackComponent)
  {
    path: 'backoffice', component: ProfilebackComponent,
    children: [
      { path: 'internship-offer-form', component: InternshipOfferFormComponent },
      { path: 'application-form/:offerId', component: ApplicationFormComponent },
      { path: 'dashboard-offers', component: DashboardOffersComponent },
      { path: 'dashboard-apps', component: DashboardApplicationsComponent },
      { path: 'global-statistics', component: GlobalStatisticsComponent },
      { path: 'company-statistics', component: CompanyStatisticsComponent }
    ]
  },

  // ❌ Catch-all route → redirection si URL inconnue
  { path: '**', redirectTo: 'front', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
