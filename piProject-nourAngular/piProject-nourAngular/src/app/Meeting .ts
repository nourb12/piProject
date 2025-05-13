import { DatePipe } from "@angular/common";

const datePipe = new DatePipe('en-US');

export interface Meeting {
    id?: number;
    title: string;
    location: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    category: string;
    type: string;
    supervisorId: number;
    internIds: number[];
  }
    