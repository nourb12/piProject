import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent implements OnInit {
  complaints: any[] = [];  // Use 'any[]' type

  constructor(private complaintService: ComplaintService, private router: Router) {}

  ngOnInit() {
    this.complaintService.getComplaints().subscribe((data: any[]) => {  // Cast to 'any[]'
      this.complaints = data;
    });
  }

  onUpdate(id: number) {
    this.router.navigate(['/complaint-update', id]);
  }
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this complaint?')) {
      this.complaintService.deleteComplaint(id).subscribe(() => {
        // Filter out the deleted complaint from the list
        this.complaints = this.complaints.filter(complaint => complaint.id_complaint !== id);
        console.log('Complaint deleted successfully');
      });
    }
  }
}
