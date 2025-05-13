import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintResponseService } from '../../services/complaint-response.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css'],
})
export class ComplaintListComponent implements OnInit {
  complaints: any[] = [];
  filteredComplaints: any[] = [];
  searchSentiment: string = '';
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private complaintService: ComplaintService,
    private complaintResponseService: ComplaintResponseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.complaintService.getComplaints().subscribe((data: any[]) => {
      this.complaints = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (!this.searchSentiment) {
      this.filteredComplaints = [...this.complaints];
    } else {
      this.filteredComplaints = this.complaints.filter((complaint) =>
        complaint.sentiment?.toLowerCase().includes(this.searchSentiment.toLowerCase())
      );
    }

    // Appliquer le tri après filtrage
    if (this.sortField) {
      this.sortBy(this.sortField);
    }
  }

  sortBy(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.filteredComplaints.sort((a, b) => {
      const valueA = a[field]?.toString().toLowerCase();
      const valueB = b[field]?.toString().toLowerCase();

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSentimentColor(sentiment: string): string {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return '#166534';
      case 'neutral':
        return '#854d0e';
      case 'negative':
        return '#991b1b';
      default:
        return '#374151';
    }
  }

  onUpdate(id: number): void {
    this.router.navigate(['/complaint-update', id]);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this complaint?')) {
      this.complaintService.deleteComplaint(id).subscribe(() => {
        this.complaints = this.complaints.filter((c) => c.id_complaint !== id);
        this.applyFilter();
      });
    }
  }

  onAddResponse(complaintId: number): void {
    this.router.navigate(['/complaint-response-add', complaintId]);
  }
}
