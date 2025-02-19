  import { Component, OnInit } from '@angular/core';
  import { CalendarEvent, CalendarView } from 'angular-calendar';
  import { isSameDay, isSameMonth } from 'date-fns';
  import { Subject } from 'rxjs';
  import { InterviewserviceService } from 'src/app/services/interviewservice.service';
  import { UserserviceService } from 'src/app/services/userservice.service';
  import { AddInterviewComponent } from '../add-interview/add-interview.component';
  import { MatDialog } from '@angular/material/dialog';
  import { customToSpe } from 'src/app/interview';

  @Component({
    selector: 'app-appoinments',
    templateUrl: './appoinments.component.html',
    styleUrls: ['./appoinments.component.css']
  })
  export class AppoinmentsComponent implements OnInit {
    title = 'calendar-test';
    viewDate: Date = new Date();
    view: CalendarView = CalendarView.Week;
    Calendarview = CalendarView;

    Interviews: CalendarEvent[] = [];  // This will store formatted interview events
    activeDayIsOpen = false;
    refresh = new Subject<void>();

    constructor(public dialog: MatDialog,private interviewService: InterviewserviceService , private UserService : UserserviceService) {}

    ngOnInit(): void {
      this.loadInterviews();
    }

    loadInterviews(): void {
      this.interviewService.getAllInterviews().subscribe(interviews => {
        console.log('Fetched Interviews:', interviews); // Log raw response from backend
        this.Interviews = interviews.map(interview => this.mapToCalendarEvent(interview));
        console.log('Formatted Calendar Events:', this.Interviews); // Log formatted events
        this.refresh.next(); // Refresh the calendar view if needed
      }, error => {
        console.error('Error fetching interviews:', error);
      });
    }
    

    setView(view: CalendarView): void {
      this.view = view;
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        this.activeDayIsOpen = !(isSameDay(this.viewDate, date) && this.activeDayIsOpen) && events.length > 0;
        this.viewDate = date;
      }
    }

    eventTimesChanged(event: any): void {
      event.event.start = event.newStart;
      event.event.end = event.newEnd;
    }


    eventClicked({ event }: { event: CalendarEvent }): void {
      console.log(event);
      let khlil = customToSpe(event);
      let res = {
        interviewId: khlil.interviewId,
        title: khlil.title,
        description: khlil.description,
        startDateTime: khlil.start,  
        endDateTime: khlil.end,
        location: khlil.location,
        status: khlil.status,
        createdAt: khlil.createdAt,
        hrId: khlil.hrId,
        studentId: khlil.studentId,
      };
    
      console.log("khalil : " + khlil.start);
    
      const dialogRef = this.dialog.open(AddInterviewComponent, {
        width: '400px',
        data: { interview: res }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.delete) {
            // Handle event deletion
            this.interviewService.deleteInterview(event.interviewId as number).subscribe(() => {
              this.Interviews = this.Interviews.filter(e => e.interviewId !== event.interviewId);
              this.refresh.next();
            });
          } else if (result.interview) {
            if (result.isEditMode) {
              // Update existing event in the backend
              this.interviewService.updateInterview(event.interviewId as number, result.interview).subscribe(updatedEvent => {
                // Replace the old event with the updated event
                const index = this.Interviews.findIndex(e => e.interviewId === updatedEvent.interviewId);
                if (index > -1) {
                  this.Interviews[index] = this.mapToCalendarEvent(updatedEvent);
                  console.log("updated bien");
                  this.refresh.next();
                }
              });
            } else {
              // This is a new event, so add it
              this.interviewService.addInterview(result.interview, result.interview.studentId, result.interview.hrId).subscribe(newEvent => {
                this.Interviews.push(this.mapToCalendarEvent(newEvent));
                this.refresh.next();
                // Add new event if it's not edit mode
              console.log("added bien");
              });
            }
          }
        
        }
      });
    }
    
    
    



    mapToCalendarEvent(interview: any): CalendarEvent {
      return {
        interviewId: interview.interviewId, // ✅ Ensure ID is set correctly
        title: interview.title,
        start: new Date(interview.startDateTime),
        end: new Date(interview.endDateTime),
        description: interview.description,
        location: interview.location,
        status: interview.status,
        studentId: interview.student?.userId,
        hrId: interview.hr?.userId, // ✅ Extract userId from the hr object
        createdAt: new Date(interview.createdAt),
        color: this.getStatusColor(interview.status),
      };
    }
      getStatusColor(status: string): any {
      switch (status) {
        case 'SCHEDULED':
          return { primary: '#1e90ff', secondary: '#D1E8FF' };
        case 'COMPLETED':
          return { primary: '#32CD32', secondary: '#C3FDB8' };
        default:
          return { primary: '#1e90ff', secondary: '#D1E8FF' };
      }
    }
    openModal(): void {
      const dialogRef = this.dialog.open(AddInterviewComponent, {
        width: '400px',
        data: { event: null }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const { interview, studentId, hrId } = result;
    
          if (interview && studentId && hrId) {
            this.interviewService.addInterview(interview, studentId, hrId).subscribe(newEvent => {
              this.Interviews.push(this.mapToCalendarEvent(newEvent));
              this.refresh.next(); 
            });
          } else {
            console.error('Missing required data for adding an interview:', result);
          }
        }
      });
    }
    

  }
