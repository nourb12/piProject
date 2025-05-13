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
import { AddAnswerComponent } from './components/add-answer/add-answer.component';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { AppoinmentsComponent } from './components/appoinments/appoinments.component';
import { ArchivedProjectsComponent } from './components/archived-projects/archived-projects.component';
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
import { QuizFrontComponent } from './components/quiz-front/quiz-front.component';
import { QuizStatComponent } from './components/quiz-stat/quiz-stat.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { UpdateAnswerComponent } from './components/update-answer/update-answer.component';
import { ProjectUpdateComponent } from './components/update-project/update-project.component';
import { UpdateQuestionComponent } from './components/update-question/update-question.component';
import { UpdateQuizComponent } from './components/update-quiz/update-quiz.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { VideoCallComponent } from './components/video-call/video-call.component';
import { BackprofileComponent } from './components/backprofile/backprofile.component';

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
  { path: 'matched-offers/:submissionId', component: MatchedOffersComponent },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'list-quiz', component: ListQuizComponent },
  { path: 'update-quiz/:id', component: UpdateQuizComponent },
  { path: 'add-question/:quizId', component: AddQuestionComponent },
  { path: 'questions-list/:quizId', component: ListQuestionComponent },
  { path: 'edit-question/:id', component: UpdateQuestionComponent },
  { path: 'add-answer/:questionId', component: AddAnswerComponent },
  { path: 'answer-list/:questionId', component: ListAnswerComponent },
  { path: 'update-answer/:answerId', component: UpdateAnswerComponent },
  { path: 'quizFront/:title', component: QuizFrontComponent },
  { path: 'quiz-statistics', component: QuizStatComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'list-project', component: ListProjectComponent },
  { path: 'update-project/:id', component: ProjectUpdateComponent },
  { path: 'create-task/:projectId', component: CreateTaskComponent },
  { path: 'list-task/:projectId', component: ListTaskComponent },
  { path: 'list-task/:projectId/update-task/:taskId', component: UpdateTaskComponent },
  { path: 'upload-document', component: DocumentUploadComponent },
  { path: 'archived-projects', component: ArchivedProjectsComponent},
  { path: 'internship-certificate', component: InternshipCertificateComponent },
  {path: 'complaint-add' , component: ComplaintAddComponent},
  {path: 'complaint-list' , component: ComplaintListComponent},
  { path: 'complaint-update/:id', component: ComplaintUpdateComponent },
  { path: 'complaint-add', component: ComplaintAddComponent },
  { path: 'evaluation-add', component: EvaluationAddComponent },
  { path: 'evaluation-list', component: EvaluationListComponent},
  { path: 'evaluation-update/:id', component: EvaluationUpdateComponent },
  { path: 'statistiques', component: StatistiqueComponent },
  { path: 'complaint-response-add/:complaintId', component: ComplaintResponseAddComponent },
  { path: 'addMeeting', component: AddMeetingComponent },
  { path: 'addMeeting/:id', component: AddMeetingComponent },
  { path: 'listMeeting', component: ListMeetingComponent },
  { path: 'video-call', component: VideoCallComponent },
  { path: 'appoinments', component: AppoinmentsComponent },
  { path: 'profile-back', component: BackprofileComponent }

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
      { path: 'company-statistics', component: CompanyStatisticsComponent },
      { path: 'profile-back', component: ProfilebackComponent }
    ]
  },

  // ❌ Catch-all route → redirection si URL inconnue
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
