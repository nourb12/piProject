import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private apiUrl = 'http://localhost:8888/pi/api/users'; //  Spring Boot API URL

  constructor(private http: HttpClient) { }
   
    getAllUsers(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
  
    getUserById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
  

}
