import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';
import { MatchedOffer } from '../models/matched-offer.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8909/api/applications'; 
  private notificationsUrl = 'http://localhost:8909/api/notifications'; 

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  updateApplicationStatus(applicationId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${applicationId}/status`, { status }, { headers: this.headers });
  }

  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

  createApplication(application: Application, id: number): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/${id}`, application, { headers: this.headers });
  }

  updateApplication(id: number, application: Application): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${id}`, application, { headers: this.headers });
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getApplicationsByOfferId(offerId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/offer/${offerId}`);
  }

  getApplicationsByUserId(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/user/${userId}`);
  }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.notificationsUrl);
  }

  hasApplied(email: string, offerId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/has-applied?email=${email}&offerId=${offerId}`);
  }




  submitApplication(formData: FormData): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/apply`, formData);
  }
  

  getMatchedOffers(applicationId: number): Observable<MatchedOffer[]> {
    return this.http.get<MatchedOffer[]>(`${this.apiUrl}/${applicationId}/match`);
  }
  

  // (autres méthodes si existantes : getAll, getById, delete, etc.)
}


