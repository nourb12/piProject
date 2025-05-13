import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // URL de base de l'API Spring Boot
  private baseUrl = 'http://localhost:8093/quiz/api/user';  // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  // Obtenir tous les utilisateurs
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  // Autres méthodes pour gérer les utilisateurs
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }



}
