import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeetingServiceService } from 'src/app/services/meeting-service.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.css']
})
export class ListMeetingComponent implements OnInit, OnDestroy {
  meetings: any[] = [];
  showModal: boolean = false;
  selectedMeeting: any = null;
  private meetingSubscription!: Subscription;
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  sortDirectionAsc: boolean = true;
  categories: string[] = ['FOLLOW_UP', 'VALIDATION']; // Match your backend enum values
  selectedCategory: string = '';

  constructor(
    private meetingService: MeetingServiceService,
    private router: Router,
    private webSocketService: WebSocketService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMeetings(); // Fetch existing meetings
    this.webSocketService.connect(); // Connect to WebSocket for real-time updates

    this.meetingSubscription = this.webSocketService.getMeetings().subscribe((meeting: any) => {
      if (meeting && meeting.id) {
        const existingIndex = this.meetings.findIndex(m => m.id === meeting.id);

        if (existingIndex !== -1) {
          this.meetings[existingIndex] = meeting; // Update existing meeting
          this.toastr.info(`Meeting updated: ${meeting.title}`, 'Real-time Update');
        } else {
          this.meetings.push(meeting); // Add new meeting
          this.toastr.info(`Meeting added: ${meeting.title}`, 'Real-time Update');
        }
      }
    });
  }


  ngOnDestroy(): void {
    this.webSocketService.disconnect();
    if (this.meetingSubscription) {
      this.meetingSubscription.unsubscribe();
    }
  }

  getMeetings() {
    this.meetingService.getAllMeetings().subscribe((data) => {
      this.meetings = data;
    });
  }

  editMeeting(meeting: any) {
    this.router.navigate(['/addMeeting', meeting.id]);
  }

  deleteMeeting(id: number) {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.meetingService.deleteMeeting(id).subscribe(() => {
        this.meetings = this.meetings.filter(m => m.id !== id);
      });
    }
  }

  viewMeeting(meeting: any) {
    this.selectedMeeting = meeting;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }


  sortMeetingsByStartDate() {
    this.sortDirectionAsc = !this.sortDirectionAsc;

    if (this.selectedCategory === '') {
      // No category filter applied, sort all meetings
      this.meetingService.getMeetingsSortedByStartDateTime(this.sortDirectionAsc).subscribe(data => {
        this.meetings = data;
      });
    } else {
      // A category is selected, sort meetings within that category
      this.meetingService.getMeetingsByCategoryAndSortedByDate(this.selectedCategory, this.sortDirectionAsc)
        .subscribe(data => {
          this.meetings = data;
        });
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;

    if (category === '') {
      this.getMeetings(); // fallback to full list
    } else {
      this.meetingService.getMeetingsByCategory(category).subscribe(data => {
        this.meetings = data;
      });
    }
  }
  startVideoCall(meeting: any) {
    this.router.navigate(['/video-call'], { queryParams: { roomID: meeting.id } });
  }

}