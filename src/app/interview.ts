import { DatePipe } from "@angular/common";
import { CalendarEvent } from "angular-calendar";


const datePipe = new DatePipe('en-US');


export function customToSpe(CustomCalendarInterview: any): CalendarEvent {
    console.log('CustomCalendarEvent:', CustomCalendarInterview);
    return {
        interviewId: CustomCalendarInterview.interviewId,
        title: CustomCalendarInterview.title,
        start: datePipe.transform(CustomCalendarInterview.start, 'yyyy-MM-ddTHH:mm:ss') ?? CustomCalendarInterview.start.toISOString().substring(0, 19),
        end: datePipe.transform(CustomCalendarInterview.end, 'yyyy-MM-ddTHH:mm:ss') ?? CustomCalendarInterview.end.toISOString().substring(0, 19),
        color: CustomCalendarInterview.color,
        description: CustomCalendarInterview.description,
        location:CustomCalendarInterview.location,
        status: CustomCalendarInterview.status,
        createdAt: datePipe.transform(CustomCalendarInterview.createdAt, 'yyyy-MM-ddTHH:mm:ss') ?? CustomCalendarInterview.createdAt.toISOString().substring(0, 19),
        hrId : CustomCalendarInterview.hrId,
        studentId : CustomCalendarInterview.studentId,
        

    };
}




