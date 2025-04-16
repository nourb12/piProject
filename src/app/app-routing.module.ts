import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomebackComponent } from './components/homeback/homeback.component';
import { HeaderbackComponent } from './components/headerback/headerback.component';
import { LoginfrontComponent } from './loginfront/loginfront.component';
import { ProfilebackComponent } from './profileback/profileback.component';
import { LayoutComponent } from './components/layout/layout.component';
import { IntershipoffersComponent } from './intershipoffers/intershipoffers.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectListComponent } from './components/list-project/list-project.component';
import { ProjectUpdateComponent } from './components/update-project/update-project.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { ArchivedProjectsComponent } from './components/archived-projects/archived-projects.component';
import { InternshipCertificateComponent } from './components/internship-certificate/internship-certificate.component';

const routes: Routes = [


  { path: '', redirectTo: 'front', pathMatch: 'full' }, // Redirige vers /front au lieu de répéter HomeComponent
  { path: 'front', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'back', component: HomebackComponent },
  { path: 'backnav', component: HeaderbackComponent },
  { path: 'login', component: LoginfrontComponent },
  { path: 'homeback', component: HomebackComponent },
  { path: 'profileback', component: ProfilebackComponent },
  { path: 'intership' , component: IntershipoffersComponent},
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'list-project', component: ProjectListComponent },
  { path: 'update-project/:id', component: ProjectUpdateComponent },
  { path: 'create-task/:projectId', component: CreateTaskComponent },
  { path: 'list-task/:projectId', component: ListTaskComponent },
  { path: 'list-task/:projectId/update-task/:taskId', component: UpdateTaskComponent },
  { path: 'upload-document', component: DocumentUploadComponent },
  { path: 'archived-projects', component: ArchivedProjectsComponent},
  { path: 'internship-certificate', component: InternshipCertificateComponent }

 // { path: '**', redirectTo: 'front', pathMatch: 'full' } // Gère les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
