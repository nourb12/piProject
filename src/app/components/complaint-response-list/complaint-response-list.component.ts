import { Component, OnInit } from '@angular/core';
import { ComplaintResponseService } from 'src/app/services/complaint-response.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-response-list',
  templateUrl: './complaint-response-list.component.html',
  styleUrls: ['./complaint-response-list.component.css']
})
export class ComplaintResponseListComponent implements OnInit {
  complaintResponses: any[] = [];

  constructor(
    private complaintResponseService: ComplaintResponseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getComplaintResponses();
  }

  getComplaintResponses(): void {
    this.complaintResponseService.getAllComplaintResponses().subscribe(
      (responses) => {
        this.complaintResponses = responses;
      },
      (error) => {
        console.error('Error fetching complaint responses:', error);
      }
    );
  }

  viewResponse(id: number): void {
    this.router.navigate([`/complaint-response/${id}`]); // Navigate to the view response page
  }

  deleteResponse(id: number): void {
    if (confirm('Are you sure you want to delete this response?')) {
      this.complaintResponseService.deleteComplaintResponse(id).subscribe(
        () => {
          this.complaintResponses = this.complaintResponses.filter(response => response.id !== id); // Remove deleted response from the list
          console.log('Response deleted successfully');
        },
        (error) => {
          console.error('Error deleting response:', error);
        }
      );
    }
  }
}
