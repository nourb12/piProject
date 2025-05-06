import { Component, OnInit } from '@angular/core';
import { MyApplicationsService } from 'src/app/services/myapplications.service';  
import { Application } from 'src/app/models/application.model';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {
  applications: Application[] = [];
  filteredApplications: Application[] = [];
  userEmail = "nour.benmna@esprit.tn"; // ⚠️ Remplacer par un email dynamique plus tard
  displayedColumns: string[] = [
    'title', 'company', 'location', 'duration', 'stageType', 'offerStatus',
    'applicationStatus', 'submissionDate', 'image', 
    'cvPdfUrl',              // ✅ Colonne ajoutée
    'motivationPdfUrl'       // ✅ Colonne ajoutée
  ];
  loading: boolean = true;

  constructor(private myApplicationsService: MyApplicationsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchUserApplications();
  }

  fetchUserApplications(): void {
    this.myApplicationsService.getApplicationsByUser(this.userEmail).subscribe(
      (data) => {
        this.applications = data.map(app => ({
          ...app,
          status: app.status || 'WAITING'
        }));
        this.filteredApplications = [...this.applications];
        this.loading = false;
      },
      (error) => {
        console.error("❌ Erreur lors de la récupération des candidatures", error);
        this.loading = false;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!filterValue) {
      this.filteredApplications = [...this.applications];
      return;
    }

    this.filteredApplications = this.applications.filter(app =>
      app.internshipOffer?.title?.toLowerCase().includes(filterValue) ||
      app.internshipOffer?.companyName?.toLowerCase().includes(filterValue) ||
      app.internshipOffer?.location?.toLowerCase().includes(filterValue)
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'OPEN': return 'status-open';
      case 'CLOSED': return 'status-closed';
      case 'ARCHIVED': return 'status-archived';
      default: return 'status-default';
    }
  }

  getApplicationStatusClass(status: string): string {
    switch (status) {
      case 'ACCEPTED': return 'badge bg-success';
      case 'DENIED': return 'badge bg-danger';
      case 'WAITING': return 'badge bg-warning text-dark';
      default: return 'badge bg-secondary';
    }
  }

  openImageModal(imageUrl: string): void {
    window.open(imageUrl, '_blank');
  }
}
