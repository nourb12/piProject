import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { PartnershipsComponent } from './components/partnerships/partnerships.component';
import { AboutComponent } from './components/about/about.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterbackComponent } from './components/footerback/footerback.component';
import { HomebackComponent } from './components/homeback/homeback.component';
import { SidebackComponent } from './components/sideback/sideback.component';
import { HeaderbackComponent } from './components/headerback/headerback.component';
import { LoginfrontComponent } from './loginfront/loginfront.component';
import { ProfilebackComponent } from './profileback/profileback.component';
import { LayoutComponent } from './components/layout/layout.component';
import { IntershipoffersComponent } from './intershipoffers/intershipoffers.component';
import { ComplaintAddComponent } from './components/complaint-add/complaint-add.component';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { ComplaintUpdateComponent } from './components/complaint-update/complaint-update.component';
import { EvaluationAddComponent } from './components/evaluation-add/evaluation-add.component';
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';
import { EvaluationUpdateComponent } from './components/evaluation-update/evaluation-update.component';
import { MatIconModule } from '@angular/material/icon';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { ComplaintResponseAddComponent } from './components/complaint-response-add/complaint-response-add.component';
import { ComplaintResponseListComponent } from './components/complaint-response-list/complaint-response-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    HeroComponent,
    PartnershipsComponent,
    AboutComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterbackComponent,
    HomebackComponent,
    SidebackComponent,
    HeaderbackComponent,
    LoginfrontComponent,
    ProfilebackComponent,
    LayoutComponent,
    IntershipoffersComponent,
    ComplaintAddComponent,
    ComplaintListComponent,
    ComplaintUpdateComponent,
    EvaluationAddComponent,
    EvaluationListComponent,
    EvaluationUpdateComponent,
    StatistiqueComponent,
    ComplaintResponseAddComponent,
    ComplaintResponseListComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
