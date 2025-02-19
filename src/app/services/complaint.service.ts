import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = 'http://localhost:8888/api/complaints';

  constructor(private http: HttpClient) {}

  getComplaints(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addComplaint(complaint: any): Observable<any> {
    return this.http.post(this.apiUrl, complaint);
  }

  getComplaintById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateComplaint(id: number, complaint: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, complaint);
  }

  deleteComplaint(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
