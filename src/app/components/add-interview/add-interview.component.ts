import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { InterviewserviceService } from 'src/app/services/interviewservice.service';
import { OffreServiceService } from 'src/app/services/offre-service.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css']
})
export class AddInterviewComponent implements OnInit{
  users : any[] = [];
  offres : any[] = [];
  Interview: any;
  isEditMode = false;
  form: FormGroup;
  studentId !: number;
  offreId !: number;
  refresh = new Subject<void>();
  existingInterviews : any[] = [];
  isCompleted = false; 

  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddInterviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private UserService : UserserviceService,
    private InterviewService : InterviewserviceService,
    private offreService : OffreServiceService,
    private router: Router ,


  ){
    console.log("Dialog Data:", data);

        this.Interview = data.interview ? { ...data.interview } : this.initializeNewInterview();
        this.isEditMode = !!data.interview; // Ensures it's set to true if editing

        this.isCompleted = this.Interview.status === 'COMPLETED';

        this.form = this.fb.group({
          title: [{ value: this.Interview.title, disabled: this.isCompleted }, Validators.required],
          location: [{ value: this.Interview.location, disabled: this.isCompleted }],
          description: [{ value: this.Interview.description, disabled: this.isCompleted }],
          startDateTime: [{ value: this.Interview.startDateTime, disabled: this.isCompleted }, Validators.required],
          endDateTime: [{ value: this.Interview.endDateTime, disabled: this.isCompleted }, Validators.required],
          status: [{ value: this.Interview.status, disabled: this.isCompleted }, Validators.required],
          tuteur: [{ value: this.Interview.tuteur, disabled: this.isCompleted }, Validators.required],
          studentId: [{ value: this.Interview.studentId, disabled: this.isCompleted }, Validators.required],
          offreId: [{ value: this.Interview.offreId, disabled: this.isCompleted }, Validators.required],
          hrId: [{ value: this.Interview.hrId, disabled: this.isCompleted }]
        });
        
  }

  ngOnInit(): void {

    this.UserService.getAllUsers().subscribe((data: any[]) => {
      console.log("Fetched data:", data);  // Log the fetched data
      this.users = data;  // Assign the fetched data to the users array
  
      console.log("hiii", this.users);  // Log the users array after it's updated
      this.form.patchValue({ studentId: this.Interview.studentId });

      this.InterviewService.getAllInterviews().subscribe((interviews: any[]) => {
        this.existingInterviews = interviews;
      });
    });

    this.offreService.getAllOffres().subscribe((data: any[]) => {
      console.log("Fetched data:", data);  // Log the fetched data
      this.offres = data;  // Assign the fetched data to the offres array
  
      console.log("hiii", this.offres);  // Log the users array after it's updated
      this.form.patchValue({ offreId: this.Interview.offreId });

      this.InterviewService.getAllInterviews().subscribe((interviews: any[]) => {
        this.existingInterviews = interviews;
      });
    });
  }
  


    


  initializeNewInterview() {
    return {
      title: '',
      location:'',
      description: '',
      startDateTime: new Date().toISOString().substring(0, 16),
      endDateTime: new Date().toISOString().substring(0, 16),
      status:'',
      tuteur:'',
      studentId : 0,
      offreId : 0,
      hrId:3
    };
  }






  onSaveClick(): void {
    if (this.form.invalid || this.isInvalidDateOrder()) {
      return;
    }
  
    const datePipe = new DatePipe('en-US');
    const startDateTime = datePipe.transform(this.form.value.startDateTime, 'yyyy-MM-ddTHH:mm:ss') ?? this.form.value.startDateTime;
    const endDateTime = datePipe.transform(this.form.value.endDateTime, 'yyyy-MM-ddTHH:mm:ss') ?? this.form.value.endDateTime;
    const studentId = this.form.value.studentId ?? this.Interview.studentId;
    const offreId = this.form.value.offreId ?? this.Interview.offreId;

    
    const newInterview = {
      title: this.form.value.title,
      location: this.form.value.location,
      description: this.form.value.description,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      status: this.form.value.status,
      tuteur:this.form.value.tuteur,
      student: { userId: studentId },
      offre: { id: offreId },
    };
  
    // 🛑 Pass `this.Interview.interviewId` when updating to ignore it in conflict checking
    if (this.hasTimeConflict(startDateTime, endDateTime, this.isEditMode ? this.Interview.interviewId : undefined)) {
      if (!window.confirm("You have existing interviews at this time. Do you want to continue?")) {
        return;
      }
    }
  
    if (this.isEditMode && this.Interview.interviewId) {
      this.InterviewService.updateInterview(this.Interview.interviewId, newInterview).subscribe(res => {
        this.dialogRef.close({ interview: res, isEditMode: this.isEditMode });
      });
    } else {
      this.InterviewService.addInterview(newInterview, studentId, 3 , offreId).subscribe(res => {
        this.dialogRef.close({ interview: res, isEditMode: this.isEditMode });
        window.location.href = '/appoinments';
      });
    }
  }
  
  
  
  
  



 



  onCancelClick(): void {
    this.dialogRef.close();
  }
  onDeleteClick(): void {
    this.dialogRef.close({ delete: true, Interview: this.Interview });
  }
  isInvalidDateOrder(): boolean {
    const startDateTime = new Date(this.form.value.startDateTime);
    const endDateTime = new Date(this.form.value.endDateTime);
    return startDateTime >= endDateTime;
  }

hasTimeConflict(startDateTime: string, endDateTime: string, interviewId?: number): boolean {
  const newStart = new Date(startDateTime).getTime();
  const newEnd = new Date(endDateTime).getTime();

  return this.existingInterviews.some(interview => {
    //Ignore the same interview when updating
    if (interview.interviewId === interviewId) {
      return false;
    }

    const existingStart = new Date(interview.startDateTime).getTime();
    const existingEnd = new Date(interview.endDateTime).getTime();

    return newStart === existingStart || (newStart > existingStart && newStart < existingEnd);
  });
}





}
