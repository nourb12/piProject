import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = 'http://localhost:8888/api/complaints';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les réclamations (avec ou sans réponse selon le back)
  getComplaints(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajouter une nouvelle réclamation
  addComplaint(complaint: any): Observable<any> {
    return this.http.post(this.apiUrl, complaint);
  }

  // Récupérer une réclamation par ID
  getComplaintById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une réclamation
  updateComplaint(id: number, complaint: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, complaint);
  }

  // Supprimer une réclamation
  deleteComplaint(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtenir le sentiment d'une réclamation par ID
  getSentimentByComplaintId(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/sentiment/${id}`, { responseType: 'text' });
  }

  // Récupérer les réclamations par statut
  getComplaintsByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/status/${status}`);
  }

  // ✅ Nouvelle méthode : récupérer une réclamation avec sa réponse
  getComplaintWithResponse(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/with-response`);
  }
}
