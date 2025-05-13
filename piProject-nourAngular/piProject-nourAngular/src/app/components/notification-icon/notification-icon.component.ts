import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css']
})
export class NotificationIconComponent implements OnInit, OnDestroy {
  alertCount: number = 0;
  deadlineAlertProjects: any[] = [];
  showProjects: boolean = false;
  private subscription!: Subscription;
  private notificationSound: HTMLAudioElement; 

  constructor(private projectService: ProjectService) {
    // Initialize the notification sound
    this.notificationSound = new Audio();
    this.notificationSound.src = 'assets/notification-sound.wav'; 
    this.notificationSound.load();
  }

  ngOnInit(): void {
    this.fetchAlertCount();
    this.subscription = interval(1000).subscribe(() => this.fetchAlertCount());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchAlertCount(): void {
    const currentDate = new Date();
    this.projectService.getAllProjects().subscribe((projects: any[]) => {
      this.deadlineAlertProjects = projects.filter(project => project.deadlineAlert && new Date(project.endDate) >= currentDate);
      const newAlertCount = this.deadlineAlertProjects.length;
      if (newAlertCount > this.alertCount) {
        this.notificationSound.play();
      }
      this.alertCount = newAlertCount;
    });
  }
  
  toggleProjects(): void {
    this.showProjects = !this.showProjects;
    if (this.showProjects) {
      this.fetchAlertProjects();
    }
  }

  fetchAlertProjects(): void {
    const currentDate = new Date();
  
    this.projectService.getAllProjects().subscribe((projects: any[]) => {
      const newAlerts = projects.filter(project => project.deadlineAlert && new Date(project.endDate) >= currentDate);
      // Remove expired alerts
      this.deadlineAlertProjects = this.deadlineAlertProjects.filter(project => new Date(project.endDate) >= currentDate);
      // Add new alerts at the top if they don’t already exist
      newAlerts.forEach(alert => {
        const exists = this.deadlineAlertProjects.some(p => p.id === alert.id);
        if (!exists) {
          this.deadlineAlertProjects.unshift(alert);
        }
      });
      this.alertCount = this.deadlineAlertProjects.length;
    });
  }
  
  
  
}
