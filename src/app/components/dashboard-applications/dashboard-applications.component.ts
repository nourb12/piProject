import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/application.model';
import { InternshipOffer } from 'src/app/models/internship-offer.model';
import { Router } from '@angular/router';
import { InternshipOfferService } from 'src/app/services/internship-offer.service';
import { ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard-applications',
  templateUrl: './dashboard-applications.component.html',
  styleUrls: ['./dashboard-applications.component.css']
})
export class DashboardApplicationsComponent implements OnInit {
  applications: Application[] = [];
  filteredApplications: Application[] = [];
  internshipOffers: InternshipOffer[] = [];
  notifications: any[] = [];
  searchTerm: string = '';
  offerIdFilter: number | '' = '';
  sortField: keyof Application | 'internshipOffer' = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';
  dropListIds: string[] = ['waitingList', 'acceptedList', 'deniedList'];

  //  listes par statut pour le pipeline
  waitingApps: Application[] = [];
  acceptedApps: Application[] = [];
  deniedApps: Application[] = [];

  constructor(
    private internshipOfferService: InternshipOfferService,
    private applicationService: ApplicationService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.fetchApplications();
    this.fetchNotifications();
    this.fetchOffers();
  }

  fetchApplications(): void {
    this.applicationService.getAllApplications().subscribe(
      (applications) => {
        this.applications = applications.map(app => ({
          ...app,
          status: app.status || 'WAITING'
        }));
        this.filterApplications();

        //  Séparer les applications par statut pour le pipeline
        this.waitingApps = this.applications.filter(app => app.status === 'WAITING');
        this.acceptedApps = this.applications.filter(app => app.status === 'ACCEPTED');
        this.deniedApps = this.applications.filter(app => app.status === 'DENIED');
      },
      (error) => {
        console.error('❌ Error fetching applications:', error);
        alert('An error occurred while fetching applications.');
      }
    );
  }

  fetchOffers(): void {
    this.internshipOfferService.getAllInternshipOffers().subscribe(
      (offers) => {
        this.internshipOffers = offers;
      },
      (error) => {
        console.error('❌ Error fetching internship offers:', error);
        alert('An error occurred while fetching internship offers.');
      }
    );
  }

  fetchNotifications(): void {
    this.applicationService.getAllNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;
      },
      (error) => {
        console.error('❌ Error fetching notifications:', error);
      }
    );
  }

  filterApplications(): void {
    let tempApplications = [...this.applications];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      tempApplications = tempApplications.filter(application =>
        application.fullName?.toLowerCase().includes(term) ||
        application.email?.toLowerCase().includes(term)
      );
    }

    if (this.offerIdFilter !== '') {
      tempApplications = tempApplications.filter(application =>
        application.internshipOffer?.id === Number(this.offerIdFilter)
      );
    }

    if (this.sortField) {
      tempApplications.sort((a, b) => {
        let aValue: any = a[this.sortField];
        let bValue: any = b[this.sortField];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    this.filteredApplications = tempApplications;
  }

  sort(field: keyof Application | 'internshipOffer'): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.filterApplications();
  }

  deleteApplication(id: number): void {
    if (confirm('🚨 Are you sure you want to delete this application?')) {
      this.applicationService.deleteApplication(id).subscribe(() => {
        this.applications = this.applications.filter(app => app.id !== id);
        this.filterApplications();
      });
    }
  }

  changeStatus(applicationId: number, newStatus: 'ACCEPTED' | 'WAITING' | 'DENIED') {
    this.applicationService.updateApplicationStatus(applicationId, newStatus)
      .subscribe({
        next: (response) => {
          console.log('✅ Status updated:', response);
          this.refreshStatus(applicationId, newStatus);
        },
        error: (error) => {
          console.error('❌ Error updating status:', error);
          alert("An error occurred while updating the status.");
        }
      });
  }

  private refreshStatus(applicationId: number, newStatus: 'ACCEPTED' | 'WAITING' | 'DENIED'): void {
    const index = this.applications.findIndex(app => app.id === applicationId);
    if (index !== -1) {
      this.applications[index].status = newStatus;
      this.filterApplications();
    }
  }
  onDrop(event: CdkDragDrop<Application[]>, newStatus: 'ACCEPTED' | 'WAITING' | 'DENIED') {
    const draggedApp: Application = event.item.data;
  
    if (draggedApp.status === newStatus) return;
  
    this.applicationService.updateApplicationStatus(draggedApp.id!, newStatus).subscribe(() => {
      const sourceList = this.getListByStatus(draggedApp.status);
      const targetList = this.getListByStatus(newStatus);
  
      const index = sourceList.findIndex(app => app.id === draggedApp.id);
      if (index > -1) {
        sourceList.splice(index, 1);
      }
  
      draggedApp.status = newStatus;
      targetList.push(draggedApp);
   
console.log(`✅ Moved to ${newStatus}`);

  
    
      this.filterApplications(); 
      this.cdr.detectChanges(); 
    }, error => {
      console.error('❌ Failed to update status in backend:', error);
      alert("Failed to update status.");
    });
  }
  
  getListByStatus(status: string): Application[] {
    switch (status.toUpperCase()) {
      case 'WAITING': return this.waitingApps;
      case 'ACCEPTED': return this.acceptedApps;
      case 'DENIED': return this.deniedApps;
      default: return [];
    }
  }
  
    
  
}
