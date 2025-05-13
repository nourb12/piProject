import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from 'src/app/services/profileback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headerback',
  templateUrl: './headerback.component.html',
  styleUrls: ['./headerback.component.css']
})
export class HeaderbackComponent implements OnInit {
  notifications: { title: string, message: string }[] = [];
  dropdownVisible: boolean = false;
  user: any;

  constructor(
    private notifService: NotificationService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.notifService.notifications$.subscribe(notifs => {
      this.notifications = notifs;
    });
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil :', error);
      }
    );
  }

  addNotification(type: 'add' | 'update', eventName: string) {
    this.notifService.pushNotification(type, eventName);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  deleteNotification(index: number) {
    this.notifService.deleteNotification(index);
  }

  // ➡️ Méthode Logout
  logout() {
    localStorage.removeItem('token'); // Suppression du token
    this.router.navigate(['/login']); // Redirection vers la page de login
  }
}
