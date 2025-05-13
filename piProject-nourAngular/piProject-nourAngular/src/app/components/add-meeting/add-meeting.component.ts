import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MeetingServiceService } from 'src/app/services/meeting-service.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: [
    './add-meeting.component.css',
  ]
})
export class AddMeetingComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean = false;
  supervisors: any[] = [];
  interns: any[] = [];

  constructor(
    private fb: FormBuilder,
    private meetingService: MeetingServiceService,
    private userService: UserserviceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.form = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      location: ['', [Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required],
      supervisorId: [null, Validators.required],
      internIds: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.route.paramMap.subscribe(params => {
      const meetingId = params.get('id');
      if (meetingId) {
        this.isEditMode = true;
        this.loadMeeting(Number(meetingId));
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/listMeeting']);
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.supervisors = users.filter(user => user.role === 'SUPERVISOR');
      this.interns = users.filter(user => user.role === 'INTERN');
    });
  }

  loadMeeting(meetingId: number) {
    this.meetingService.getMeetingById(meetingId).subscribe((apiMeeting: any) => {
      const transformedMeeting = {
        id: apiMeeting.id,
        title: apiMeeting.title,
        location: apiMeeting.location,
        description: apiMeeting.description,
        startDateTime: apiMeeting.startDateTime,
        endDateTime: apiMeeting.endDateTime,
        category: apiMeeting.category,
        type: apiMeeting.type,
        supervisorId: apiMeeting.supervisor ? apiMeeting.supervisor.userId : null,
        internIds: apiMeeting.interns ? apiMeeting.interns.map((intern: any) => intern.userId) : []
      };
      this.form.patchValue(transformedMeeting);
    });
  }

  saveMeeting(): void {
    if (this.form.valid && !this.isInvalidDateOrder()) {
      const meetingData = { ...this.form.value };
      const supervisorId = this.form.value.supervisorId;
      const internIds = this.form.value.internIds;

      if (this.isEditMode) {
        this.meetingService.updateMeeting(meetingData.id, meetingData, supervisorId, internIds).subscribe(() => {
          this.toastr.success('Meeting updated successfully!');
          this.router.navigate(['/listMeeting']);
        });
      } else {
        this.meetingService.addMeeting(meetingData, supervisorId, internIds).subscribe(() => {
          this.toastr.success('Meeting added successfully!');
          this.router.navigate(['/listMeeting']);
        });
      }
    } else {
      this.toastr.error('Please correct the form errors.');
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  isInvalidDateOrder(): boolean {
    const startDateTime = new Date(this.form.value.startDateTime);
    const endDateTime = new Date(this.form.value.endDateTime);
    return startDateTime >= endDateTime;
  }

  get titleControl() { return this.form.controls['title']; }
  get locationControl() { return this.form.controls['location']; }
  get descriptionControl() { return this.form.controls['description']; }
  get startDateTimeControl() { return this.form.controls['startDateTime']; }
  get endDateTimeControl() { return this.form.controls['endDateTime']; }
  get categoryControl() { return this.form.controls['category']; }
  get typeControl() { return this.form.controls['type']; }
  get supervisorIdControl() { return this.form.controls['supervisorId']; }
  get internIdsControl() { return this.form.controls['internIds']; }
}