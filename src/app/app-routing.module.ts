import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomebackComponent } from './components/homeback/homeback.component';
import { HeaderbackComponent } from './components/headerback/headerback.component';
import { LoginfrontComponent } from './loginfront/loginfront.component';
import { ProfilebackComponent } from './profileback/profileback.component';

const routes: Routes = [
  { path: '', redirectTo: 'front', pathMatch: 'full' }, // Redirige vers /front au lieu de répéter HomeComponent
  { path: 'front', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'back', component: HomebackComponent },
  { path: 'backnav', component: HeaderbackComponent },
  { path: 'login', component: LoginfrontComponent },
  { path: 'homeback', component: HomebackComponent },
  { path: 'profileback', component: ProfilebackComponent },
 // { path: '**', redirectTo: 'front', pathMatch: 'full' } // Gère les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
