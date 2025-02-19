import { Component } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'app-complaint-add',
  templateUrl: './complaint-add.component.html',
  styleUrls: ['./complaint-add.component.css'],
})
export class ComplaintAddComponent {
  complaint = {
    subject: '',
    description: '',
    submissionDate: new Date(),
    status: '',
  };

  constructor(private complaintService: ComplaintService) {}

  addComplaint(): void {
    this.complaintService.addComplaint(this.complaint).subscribe(
      (response) => {
        alert('Complaint added successfully!');
        console.log(response);
      },
      (error) => {
        alert('Error adding complaint!');
        console.error(error);
      }
    );
  }
}
