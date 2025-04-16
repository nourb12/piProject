import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { HttpClientModule } from '@angular/common/http';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './components/list-project/list-project.component';
import { ProjectUpdateComponent } from './components/update-project/update-project.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { FormsModule } from '@angular/forms';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { NotificationIconComponent } from './components/notification-icon/notification-icon.component';
import { ProjectStatisticsComponent } from './components/project-statistics/project-statistics.component';
import { ProjectTimelineComponent } from './components/project-timeline/project-timeline.component';
import { ArchivedProjectsComponent } from './components/archived-projects/archived-projects.component';
import { InternshipCertificateComponent } from './components/internship-certificate/internship-certificate.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    CreateProjectComponent,
    ProjectListComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
