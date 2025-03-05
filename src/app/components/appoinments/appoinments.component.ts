  import { Component, OnInit } from '@angular/core';
  import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
  import { isSameDay, isSameMonth } from 'date-fns';
  import { Subject } from 'rxjs';
  import { InterviewserviceService } from 'src/app/services/interviewservice.service';
  import { UserserviceService } from 'src/app/services/userservice.service';
  import { AddInterviewComponent } from '../add-interview/add-interview.component';
  import { MatDialog } from '@angular/material/dialog';
  import { customToSpe } from 'src/app/interview';
import { DatePipe } from '@angular/common';

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
    users : any[] = [];
    selectedUsers: number = 0;  // Add a property to store selected users
    completed : string ="all";




    constructor(public dialog: MatDialog,private interviewService: InterviewserviceService , private UserService : UserserviceService) {}

    ngOnInit(): void {

      this.loadInterviews();
      this.loadUsers();

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
    loadUsers():void{
      this.UserService.getAllUsers().subscribe((data: any[]) => {
        console.log("Fetched data:", data);  // Log the fetched data
        this.users = data;  // Assign the fetched data to the users array
    
        console.log("hiii", this.users);  // Log the users array after it's updated
    
      });

    }
    onUserChange() {

      if (this.selectedUsers === 0) {
        this.loadInterviews();
      } else {
        this.loadEventsByUserId(this.selectedUsers);
      }
      console.log(this.selectedUsers);
  
    }

    loadEventsByUserId(id: number) {
      if (id != 0) {
        this.interviewService.getInterviewsByUser(id).subscribe(interview => {
          this.Interviews = interview.map(interview => this.mapToCalendarEvent(interview));
          this.refresh.next();
        });
      
      } else {
        this.loadInterviews();
      }
    }
    loadCompletedEvents() {
      this.interviewService.getCompletedInterviews().subscribe(events => {
        this.Interviews = events.map(event => this.mapToCalendarEvent(event));
        this.refresh.next();
      });
    }
    
    loadNonCompletedEvents() {
      this.interviewService.getInCompletedInterviews().subscribe(events => {
        this.Interviews = events.map(event => this.mapToCalendarEvent(event));
        this.refresh.next();
      });
    }
    loadCompletedEventsByUser(id : number) {
      this.interviewService.getCompletedInterviewsByUser(id).subscribe(events => {
        this.Interviews = events.map(event => this.mapToCalendarEvent(event));
        this.refresh.next();
      });
    }
    loadNonCompletedEventsByUser(id : number) {
      this.interviewService.getInCompletedInterviewsByUser(id).subscribe(events => {
        this.Interviews = events.map(event => this.mapToCalendarEvent(event));
        this.refresh.next();
      });
    }

    onFilterChange() {
    
      if (this.completed === 'all') {
        this.onUserChange();
      } else if (this.completed === 'COMPLETED') {
        if (this.selectedUsers != 0) {
          this.loadCompletedEventsByUser(this.selectedUsers);
    
        } else {
          this.loadCompletedEvents();
    
        }
      } else if (this.completed === 'SCHEDULED') {
        if (this.selectedUsers != 0) {
          this.loadNonCompletedEventsByUser(this.selectedUsers);
    
        } else {
          this.loadNonCompletedEvents();
    
        }
      }
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

    eventTimesChanged({
      event,
      newStart,
      newEnd,
    }: CalendarEventTimesChangedEvent): void {
      event.start = newStart;
      event.end = newEnd;
    
      // Ensure event has an ID before updating
      if (event.interviewId) {
        const datePipe = new DatePipe('en-US');
        const updatedEvent = {
          interviewId: event.interviewId,
          title: event.title,
          description: event.description,
          startDateTime: datePipe.transform(event.start, 'yyyy-MM-ddTHH:mm:ss') ?? event.start.toISOString().substring(0, 19),
          endDateTime: datePipe.transform(event.end, 'yyyy-MM-ddTHH:mm:ss'),
          location: event.location,
          status: event.status,
          createdAt: event.createdAt,
          tuteur : event.tuteur,
          hrId: event.hrId,
          studentId: event.studentId,
        };
    
        // Call the backend to update the event
        this.interviewService.updateInterview(event.interviewId as number, updatedEvent).subscribe(
          () => {
            console.log('Event updated successfully');
            this.refresh.next(); // Refresh calendar
          },
          (error) => {
            console.error('Error updating event:', error);
          }
        );
      } else {
        console.warn('Event ID is missing, cannot update.');
      }
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
        tuteur: khlil.tuteur,
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
      const isCompleted = interview.status === 'COMPLETED';

      return {
        interviewId: interview.interviewId, //  Ensure ID is set correctly
        title: interview.title,
        start: new Date(interview.startDateTime),
        end: new Date(interview.endDateTime),
        description: interview.description,
        location: interview.location,
        status: interview.status,
        studentId: interview.student?.userId,
        hrId: interview.hr?.userId, //  Extract userId from the hr object
        createdAt: new Date(interview.createdAt),
        tuteur: interview.tuteur,
        color: this.getStatusColor(interview.status),
        draggable:!isCompleted,
        resizable: {
          beforeStart: !isCompleted,
          afterEnd: !isCompleted,
        },
  
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
