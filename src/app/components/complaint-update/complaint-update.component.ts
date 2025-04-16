import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'app-complaint-update',
  templateUrl: './complaint-update.component.html',
  styleUrls: ['./complaint-update.component.css']
})
export class ComplaintUpdateComponent implements OnInit {
  complaintId!: number;  // Use '!' to assert it will be initialized
  complaint: any;  // Store the fetched complaint data

  constructor(private route: ActivatedRoute, private complaintService: ComplaintService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.complaintId = +id;  // Convert the string to number
      this.complaintService.getComplaintById(this.complaintId).subscribe((data) => {
        this.complaint = data;
      });
    }
  }

  updateComplaint() {
    // Check if the current status is 'Treated'
    if (this.complaint.status === 'Treated') {
      this.complaint.status = 'In Progress';  // Change status to 'In Progress'
    }

    this.complaintService.updateComplaint(this.complaintId, this.complaint).subscribe((updatedComplaint) => {
      console.log('Complaint updated successfully:', updatedComplaint);
      // Optionally, you could navigate back to the complaint list or show a success message
    });
  }
}
