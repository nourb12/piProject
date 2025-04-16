import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewserviceService {
  private apiUrl = 'http://localhost:8888/pi/pi/Interview'; //  Spring Boot API URL

  constructor(private http: HttpClient) { }

  getAllInterviews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getInterviewById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addInterview(interview: any, studentId: number, hrId: number , offreId:number): Observable<any> {
    return this.http.post<any>(
        `${this.apiUrl}?studentId=${studentId}&hrId=${hrId}&offreId=${offreId}`, // Append IDs as query params
        interview  // Send only the interview object in the body
    );
}

updateInterview(interviewId: number, interviewData: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/update/${interviewId}`, interviewData)
     .pipe(
         map(response => response),  
         catchError(error => {
             console.error('Error updating interview:', error);
             throw error;
         })
     );
}



  deleteInterview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
getCompletedInterviews() : Observable<any[]>{
  const url = `${this.apiUrl}/completed`;
 
  try {
    const response =  this.http.get<any>(url)
    return response;
  }
  catch (error) {
    throw error;
  }
}
getInCompletedInterviews() : Observable<any[]>{
  const url = `${this.apiUrl}/Scheduled`;

 
  try {
    const response =  this.http.get<any>(url)
    return response;
  }
  catch (error) {
    throw error;
  }
}
getInterviewsByUser(userId : number) : Observable<any[]>{
  const url = `${this.apiUrl}/by-user/${userId}`;
  try {
    const response =  this.http.get<any>(url)
    return response;
  }
  catch (error) {
    throw error;
  }

}
getCompletedInterviewsByUser(userId : number) : Observable<any[]>{
  const url = `${this.apiUrl}/by-user/${userId}/completed`;
  try {
    const response =  this.http.get<any>(url)
    return response;
  }
  catch (error) {
    throw error;
  }

}
getInCompletedInterviewsByUser(userId : number) : Observable<any[]>{
  const url = `${this.apiUrl}/by-user/${userId}/incompleted`;
  try {
    const response =  this.http.get<any>(url)
    return response;
  }
  catch (error) {
    throw error;
  }

}








  
}
