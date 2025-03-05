import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintResponseService } from '../../services/complaint-response.service';  // Importing the response service
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent implements OnInit {
  complaints: any[] = [];  

  constructor(
    private complaintService: ComplaintService, 
    private complaintResponseService: ComplaintResponseService,  // Injecting the response service
    private router: Router
  ) {}

  ngOnInit() {
    this.complaintService.getComplaints().subscribe((data: any[]) => {
      this.complaints = data;
      // Load responses for each complaint after fetching the complaints
      this.loadResponses();
    });
  }

  loadResponses(): void {
    this.complaints.forEach(complaint => {
      this.complaintResponseService.getComplaintResponsesByComplaintId(complaint.id).subscribe(responses => {
        complaint.responses = responses;
      });
    });
  }

  onAddResponse(complaintId: number): void {
    this.router.navigate(['/complaint-response-add', complaintId]);
  }

  getStatus(complaint: any): string {
    return complaint.responses && complaint.responses.length > 0 ? 'Solved' : 'Pending';
  }

  onUpdate(id: number) {
    this.router.navigate(['/complaint-update', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this complaint?')) {
      this.complaintService.deleteComplaint(id).subscribe(() => {
        this.complaints = this.complaints.filter(complaint => complaint.id !== id);
        console.log('Complaint deleted successfully');
      });
    }
  }
}
