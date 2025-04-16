import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintResponseService } from 'src/app/services/complaint-response.service';

@Component({
  selector: 'app-complaint-response-add',
  templateUrl: './complaint-response-add.component.html',
  styleUrls: ['./complaint-response-add.component.css']
})
export class ComplaintResponseAddComponent implements OnInit {
  complaintId!: number; // Ensure it's initialized properly
  message: string = '';
  responseDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private complaintResponseService: ComplaintResponseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const complaintIdFromUrl = this.route.snapshot.paramMap.get('complaintId');
    if (complaintIdFromUrl) {
      this.complaintId = +complaintIdFromUrl; // Convert string to number
    } else {
      console.error('Complaint ID not found');
    }
  }

  addResponse(): void {
    if (this.complaintId && this.message && this.responseDate) {
      const newResponse = {
        message: this.message,
        responseDate: this.responseDate
      };

      // Pass both complaintId and the new response object to the service
      this.complaintResponseService.createComplaintResponse(this.complaintId, newResponse).subscribe(
        (response) => {
          console.log('Response created:', response);
          this.router.navigate(['/complaints']); // Navigate back after success
        },
        (error) => {
          console.error('Error creating response:', error);
        }
      );
    } else {
      console.error('Missing fields');
    }
  }
}
