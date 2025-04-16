import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifSubject = new BehaviorSubject<{ title: string, message: string }[]>(this.loadNotifications());
  notifications$ = this.notifSubject.asObservable();

  private currentNotifs: { title: string, message: string }[] = this.loadNotifications();

  constructor() {}

  private loadNotifications(): { title: string, message: string }[] {
    const storedNotifs = localStorage.getItem('notifications');
    return storedNotifs ? JSON.parse(storedNotifs) : [];
  }

  private saveNotifications(): void {
    localStorage.setItem('notifications', JSON.stringify(this.currentNotifs));
  }

  pushNotification(type: 'add' | 'update', eventName: string) {
    const title = type === 'add' ? 'Event Added' : 'Event Updated';
    const message = `${eventName} was ${type === 'add' ? 'added' : 'updated'} successfully.`;
    this.currentNotifs.unshift({ title, message });
    this.saveNotifications();
    this.notifSubject.next(this.currentNotifs);
  }

  deleteNotification(index: number) {
    // Remove the notification from the array
    this.currentNotifs.splice(index, 1);
    
    // Save the updated notifications list in localStorage
    this.saveNotifications();
  
    // Notify subscribers (components) about the updated notification list
    this.notifSubject.next([...this.currentNotifs]); // Use a new array reference
  }
}
