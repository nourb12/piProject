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
    this.complaintService.updateComplaint(this.complaintId, this.complaint).subscribe((updatedComplaint) => {
      console.log('Complaint updated successfully:', updatedComplaint);
    });
  }
}
