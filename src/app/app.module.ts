import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { HttpClientModule } from '@angular/common/http';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppoinmentsComponent } from './components/appoinments/appoinments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddInterviewComponent } from './components/add-interview/add-interview.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { DatePipe, registerLocaleData } from '@angular/common';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule for input fields
import { MatDatepickerModule } from '@angular/material/datepicker'; // Import MatDatepickerModule for datepicker
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule for date format
import localeFr from '@angular/common/locales/fr';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule for dialog
// Import Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ColorlegendsComponent } from './components/colorlegends/colorlegends.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { StatsComponent } from './components/stats/stats.component';




registerLocaleData(localeFr, 'fr');

class CustomDateFormatter extends CalendarNativeDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute:'numeric'}).format(date);
   }

  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute:'numeric'}).format(date);
   }
}









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
    AppoinmentsComponent,
    AddInterviewComponent,
    ColorlegendsComponent,
    ConfirmationDialogComponent,
    StatsComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatRadioModule,
    DatePipe,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,




  ],
  providers: [
    DatePipe,
    { provide: CalendarDateFormatter , useClass: CustomDateFormatter },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
