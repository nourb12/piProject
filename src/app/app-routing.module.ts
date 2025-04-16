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
import { AppoinmentsComponent } from './components/appoinments/appoinments.component';
import { StatsComponent } from './components/stats/stats.component';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import { ListMeetingComponent } from './components/list-meeting/list-meeting.component';
import { VideoCallComponent } from './components/video-call/video-call.component';

const routes: Routes = [


  { path: '', redirectTo: 'front', pathMatch: 'full' }, // Redirige vers /front au lieu de répéter HomeComponent
  { path: 'front', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'appoinments', component: AppoinmentsComponent },
  { path: 'back', component: HomebackComponent },
  { path: 'backnav', component: HeaderbackComponent },
  { path: 'login', component: LoginfrontComponent },
  { path: 'homeback', component: HomebackComponent },
  { path: 'profileback', component: ProfilebackComponent },
  {path: 'intership' , component: IntershipoffersComponent},
  { path: 'addMeeting', component: AddMeetingComponent },
  { path: 'addMeeting/:id', component: AddMeetingComponent },
  { path: 'listMeeting', component: ListMeetingComponent },
  { path: 'video-call', component: VideoCallComponent }



 // { path: '**', redirectTo: 'front', pathMatch: 'full' } // Gère les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
