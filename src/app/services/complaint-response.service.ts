import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintResponseService {
  private apiUrl = 'http://localhost:8888/api/complaint-responses';

  constructor(private http: HttpClient) {}
  getComplaintResponsesByComplaintId(complaintId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/complaints/${complaintId}`);
  }
  createComplaintResponse(complaintId: number, complaintResponse: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${complaintId}`, complaintResponse); // Adjust the URL to include complaintId
  }

  getAllComplaintResponses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getComplaintResponseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateComplaintResponse(id: number, response: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, response);
  }

  deleteComplaintResponse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
