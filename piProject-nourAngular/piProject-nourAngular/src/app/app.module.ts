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
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';

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
import { AddAnswerComponent } from './components/add-answer/add-answer.component';
import { AddInterviewComponent } from './components/add-interview/add-interview.component';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { AppoinmentsComponent } from './components/appoinments/appoinments.component';
import { ArchivedProjectsComponent } from './components/archived-projects/archived-projects.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ColorlegendsComponent } from './components/colorlegends/colorlegends.component';
import { ComplaintAddComponent } from './components/complaint-add/complaint-add.component';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { ComplaintResponseAddComponent } from './components/complaint-response-add/complaint-response-add.component';
import { ComplaintUpdateComponent } from './components/complaint-update/complaint-update.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { EvaluationAddComponent } from './components/evaluation-add/evaluation-add.component';
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';
import { EvaluationUpdateComponent } from './components/evaluation-update/evaluation-update.component';
import { InternshipCertificateComponent } from './components/internship-certificate/internship-certificate.component';
import { ListAnswerComponent } from './components/list-answer/list-answer.component';
import { ListMeetingComponent } from './components/list-meeting/list-meeting.component';
import { ListProjectComponent } from './components/list-project/list-project.component';
import { ListQuestionComponent } from './components/list-question/list-question.component';
import { ListQuizComponent } from './components/list-quiz/list-quiz.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { NotificationIconComponent } from './components/notification-icon/notification-icon.component';
import { ProjectStatisticsComponent } from './components/project-statistics/project-statistics.component';
import { ProjectTimelineComponent } from './components/project-timeline/project-timeline.component';
import { QuizFrontComponent } from './components/quiz-front/quiz-front.component';
import { QuizStatComponent } from './components/quiz-stat/quiz-stat.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { StatsComponent } from './components/stats/stats.component';
import { UpdateAnswerComponent } from './components/update-answer/update-answer.component';
import { ProjectUpdateComponent } from './components/update-project/update-project.component';
import { UpdateQuestionComponent } from './components/update-question/update-question.component';
import { UpdateQuizComponent } from './components/update-quiz/update-quiz.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { VideoCallComponent } from './components/video-call/video-call.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { RouterModule } from '@angular/router';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Import MatDatepickerModule for datepicker
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule for date format
import localeFr from '@angular/common/locales/fr';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule for dialog
// Import Angular Material Modules
import { MatSelectModule } from '@angular/material/select';
import { BackprofileComponent } from './components/backprofile/backprofile.component';


registerLocaleData(localeFr, 'fr');

class CustomDateFormatter extends CalendarNativeDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute:'numeric'}).format(date);
   }

  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute:'numeric'}).format(date);
   }}



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
    HeartAnimationComponent,
    CreateQuizComponent,
    ListQuizComponent,
    UpdateQuizComponent,
    AddQuestionComponent,
    ListQuestionComponent,
    UpdateQuestionComponent,
    AddAnswerComponent,
    ListAnswerComponent,
    UpdateAnswerComponent,
    InternshipOffersComponent,
    QuizFrontComponent,
    QuizStatComponent,
    BadgeComponent ,
    CreateProjectComponent,
    ListProjectComponent,
    ProjectUpdateComponent,
    CreateTaskComponent,
    ListTaskComponent,
    UpdateTaskComponent,
    DocumentUploadComponent,
    NotificationIconComponent,
    ProjectStatisticsComponent,
    ProjectTimelineComponent,
    ArchivedProjectsComponent,
    InternshipCertificateComponent,
    ComplaintAddComponent,
    ComplaintListComponent,
    ComplaintUpdateComponent,
    EvaluationAddComponent,
    EvaluationListComponent,
    EvaluationUpdateComponent,
    StatistiqueComponent,
    ComplaintResponseAddComponent,
    AppoinmentsComponent,
    AddInterviewComponent,
    ColorlegendsComponent,
    ConfirmationDialogComponent,
    StatsComponent,
    AddMeetingComponent,
    ListMeetingComponent,
    VideoCallComponent,
    BackprofileComponent,
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
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatIconModule,
    RouterModule,
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
    ToastrModule.forRoot({
      progressBar : true,
      closeButton : true,
      newestOnTop : true,
      tapToDismiss: true,
      positionClass: 'toast-bottom-right',
      timeOut: 8000
    })
  ],
  providers: [StatisticsService ,

    DatePipe,
    { provide: CalendarDateFormatter , useClass: CustomDateFormatter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
