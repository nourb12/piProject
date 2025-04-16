import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-headerback',
  templateUrl: './headerback.component.html',
  styleUrls: ['./headerback.component.css']
})
export class HeaderbackComponent {
  notifications: { title: string, message: string }[] = [];
  dropdownVisible: boolean = false;

  constructor(private notifService: NotificationService) {
    this.notifService.notifications$.subscribe(notifs => {
      this.notifications = notifs;
    });
  }

  addNotification(type: 'add' | 'update', eventName: string) {
    // Call pushNotification with the correct type ('add' or 'update')
    this.notifService.pushNotification(type, eventName);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  deleteNotification(index: number) {
    // Call the deleteNotification method in the service
    this.notifService.deleteNotification(index);
  }
}
