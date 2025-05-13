import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyApplicationsService {  // ✅ Nom du service corrigé ici
  private apiUrl = 'http://localhost:8093/api/internship-offers/applications/email';
  private baseUrl = 'http://127.0.0.1:5000'; // Flask API URL


  constructor(private http: HttpClient) {}

  getApplicationsByUser(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${email}`);
  }
  getPrediction(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/predict`, payload);
  }

}
