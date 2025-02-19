import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { InterviewserviceService } from 'src/app/services/interviewservice.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css']
})
export class AddInterviewComponent implements OnInit{
  users : any[] = [];
  Interview: any;
  isEditMode = false;
  form: FormGroup;
  studentId !: number;
  refresh = new Subject<void>();
  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddInterviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private UserService : UserserviceService,
    private InterviewService : InterviewserviceService
  ){
    console.log("Dialog Data:", data);
    this.Interview = data.interview ? { ...data.interview } : this.initializeNewInterview();
        this.isEditMode = !!data.interview; // Ensures it's set to true if editing
    this.form = this.fb.group({
      title: [this.Interview.title, Validators.required],
      location: [this.Interview.location],
      description: [this.Interview.description],
      startDateTime: [this.Interview.startDateTime, Validators.required],
      endDateTime: [this.Interview.endDateTime, Validators.required],
      status: [this.Interview.status, Validators.required],
      studentId : [this.Interview.studentId],
      hrId :[this.Interview.hrId]
      
    });
  }

  ngOnInit(): void {
    this.UserService.getAllUsers().subscribe((data: any[]) => {
      console.log("Fetched data:", data);  // Log the fetched data
      this.users = data;  // Assign the fetched data to the users array
  
      console.log("hiii", this.users);  // Log the users array after it's updated
      this.form.patchValue({ studentId: this.Interview.studentId });
  
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
      studentId : 0,
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
    const studentId = this.form.value.studentId ?? this.Interview.studentId;  // Ensure the correct Student ID
    const hrId = 3; // Set HR ID
  
    this.Interview.studentId = studentId; // Ensure local object is updated
  
    const newInterview = {
      title: this.form.value.title,
      location: this.form.value.location,
      description: this.form.value.description,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      status: this.form.value.status,
      student: { userId: studentId },  // ✅ Send full student object
    
    };
  
    console.log("Sending interview:", newInterview);
    console.log('Student ID:', studentId);
    console.log('HR ID:', hrId);
    console.log('Interview ID:', this.Interview.interviewId);
  
    if (this.isEditMode && this.Interview.interviewId) {
      console.log("Updating interview with new student ID:", studentId);
      this.InterviewService.updateInterview(this.Interview.interviewId, newInterview).subscribe(res => {
        console.log("Updated interview:", res);
        this.dialogRef.close({ interview: res, isEditMode: this.isEditMode });
      });
    } else {
      this.InterviewService.addInterview(newInterview, studentId, hrId).subscribe(res => {
        console.log("Added interview:", res);
        this.dialogRef.close({ interview: res, isEditMode: this.isEditMode });
        this.refresh.next();
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





}
