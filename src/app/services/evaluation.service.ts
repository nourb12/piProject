import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // This ensures the service is provided globally
})
export class EvaluationService {
  private apiUrl = 'http://localhost:8888/api/evaluations';

  constructor(private http: HttpClient) {}

  getEvaluations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEvaluation(evaluation: any): Observable<any> {
    return this.http.post(this.apiUrl, evaluation);
  }

  getEvaluationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateEvaluation(id: number, evaluation: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, evaluation);
  }

  deleteEvaluation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
