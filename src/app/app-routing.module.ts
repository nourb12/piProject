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
import { ComplaintAddComponent } from './components/complaint-add/complaint-add.component';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { ComplaintUpdateComponent } from './components/complaint-update/complaint-update.component';
import { EvaluationAddComponent } from './components/evaluation-add/evaluation-add.component';
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';
import { EvaluationUpdateComponent } from './components/evaluation-update/evaluation-update.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { ComplaintResponseAddComponent } from './components/complaint-response-add/complaint-response-add.component';

const routes: Routes = [


  { path: '', redirectTo: 'front', pathMatch: 'full' }, // Redirige vers /front au lieu de répéter HomeComponent
  { path: 'front', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'back', component: HomebackComponent },
  { path: 'backnav', component: HeaderbackComponent },
  { path: 'login', component: LoginfrontComponent },
  { path: 'homeback', component: HomebackComponent },
  { path: 'profileback', component: ProfilebackComponent },
  {path: 'intership' , component: IntershipoffersComponent},
  {path: 'complaint-add' , component: ComplaintAddComponent},
  {path: 'complaint-list' , component: ComplaintListComponent},
  { path: 'complaint-update/:id', component: ComplaintUpdateComponent },
  { path: '', redirectTo: '/complaint-list', pathMatch: 'full' },
  { path: 'complaint-add', component: ComplaintAddComponent },
  { path: 'evaluation-add', component: EvaluationAddComponent },
  { path: 'evaluation-list', component: EvaluationListComponent},
  { path: 'evaluation-update/:id', component: EvaluationUpdateComponent },
  { path: 'statistiques', component: StatistiqueComponent },
  { path: 'complaint-response-add/:complaintId', component: ComplaintResponseAddComponent },
  { path: 'complaint-reponse-list', redirectTo: '/complaints', pathMatch: 'full' }

 // { path: '**', redirectTo: 'front', pathMatch: 'full' } // Gère les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
