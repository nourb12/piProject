import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  private baseUrl: string = 'http://localhost:8888/api/statistics';

  constructor(private http: HttpClient) {}

  // Fetch average global ratings
  getMoyenneNoteGlobale(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/moyenne-note`);
  }

  // Fetch average supervision quality
  getMoyenneQualiteEncadrement(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/moyenne-qualite`);
  }

  // Fetch average work atmosphere
  getMoyenneAmbianceTravail(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/moyenne-ambiance`);
  }

  // Fetch total number of complaints
  getTotalComplaints(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-complaints`);
  }

  // Fetch workload distribution
  getRepartitionChargeTravail(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/charge-travail`);
  }

  // Fetch complaints distribution
  getRepartitionPlaintes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/repartition-plaintes`);
  }

  // Fetch comment distribution
  getRepartitionCommentaires(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/repartition-commentaires`);
  }

  // Fetch detail distribution
  getRepartitionDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/repartition-details`);
  }
}
