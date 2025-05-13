import { Component, OnInit } from '@angular/core';
import { MyApplicationsService } from 'src/app/services/myapplications.service';  
import { Application } from 'src/app/models/application.model';
import { Router } from '@angular/router';

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
    'motivationPdfUrl'   ,
    'quizButton',
    'prediction'    // ✅ Colonne ajoutée
  ];
  loading: boolean = true;
  predictionResults: any[] = []; // To store predictions


  constructor(private myApplicationsService: MyApplicationsService,private router: Router) {}

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
        this.loadPredictions(this.applications);  // Fetch predictions after loading applications

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


goToQuiz(title: string): void {
  if (title) {
    this.router.navigate([`/quizFront/${title}`]);
  } else {
    console.warn("⚠️ Spécialité non définie pour cette candidature.");
  }
}
loadPredictions(applications: Application[]): void {
  applications.forEach(application => {
    if (application.internshipOffer) {
      const { jobDescription, title, paid } = application.internshipOffer;

      const payload = {
        IDCandidate: application.id,
        NomCandidate: application.fullName,
        Competences: application.skills.split(",")[0],
        Langage_Dev: application.technologyProfile, 
        Langues_Parlees: "French, English",
        Domaine: title ,
        competences_offres: jobDescription.split(",")[0],
        salaire: 950// Assuming 1 for paid, 0 for unpaid
      };

      this.myApplicationsService.getPrediction(payload).subscribe({
        next: (response) => {
          console.log("🧠 Prediction Result: ", response);
          application.prediction = {
            result: response.prediction,
            probability: response.probability
          };
        },
        error: (err) => {
          console.error('❌ Error during prediction:', err);
        }
      });
    } else {
      console.warn(`⚠️ No internship offer found for application ID: ${application.id}`);
    }
  });
}



}
