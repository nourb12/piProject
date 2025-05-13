import { Injectable } from '@angular/core';
import { Meeting } from '../Meeting ';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingServiceService {

  private apiUrl = 'http://localhost:8093/pi/pi/Meeting'; // Spring Boot API URL

  constructor(private http: HttpClient) { }

  getAllMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.apiUrl);
  }

  getMeetingById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.apiUrl}/${id}`);
  }

  addMeeting(meeting: Meeting, supervisorId: number, internIds: number[]): Observable<Meeting> {
    const internIdsQueryParam = internIds.join(','); // Convert array to comma-separated string
    return this.http.post<Meeting>(
      `${this.apiUrl}?supervisorId=${supervisorId}&internIds=${internIdsQueryParam}`, // Correct query format
      meeting // Send meeting object in the request body
    );
  }
    
  updateMeeting(meetingId: number, meetingData: Meeting, supervisorId: number, internIds: number[]): Observable<Meeting> {
    const internIdsQueryParam = internIds.join(','); // Convert array to comma-separated string
    return this.http.put<Meeting>(
      `${this.apiUrl}/update/${meetingId}?supervisorId=${supervisorId}&internIds=${internIdsQueryParam}`, // Pass supervisorId and internIds as query parameters
      meetingData // Send meeting data in the request body
    );
  }
  
  deleteMeeting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getMeetingsByCategory(category: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/category/${category}`);
  }
  getMeetingsSortedByStartDateTime(ascending: boolean): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/sorted-by-start?ascending=${ascending}`);
  }
  getMeetingsByCategoryAndSortedByDate(category: string, ascending: boolean): Observable<Meeting[]> {
  return this.http.get<Meeting[]>(`${this.apiUrl}/category/${category}/sorted-by-start?ascending=${ascending}`);
  }

}
