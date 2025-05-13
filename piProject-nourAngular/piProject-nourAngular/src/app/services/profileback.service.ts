import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8093/user/api/auth/profile';

  constructor(private http: HttpClient) {}

  // ➡️ Récupérer le profil de l'utilisateur connecté
  getProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<any>(this.apiUrl, { headers: headers });
  }
}
