import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreServiceService {
private apiUrl = 'http://localhost:8888/pi/api/offres'; //  Spring Boot API URL

  constructor(private http: HttpClient) { }
   
    getAllOffres(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
  
    getOffreById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
}
