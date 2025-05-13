import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginfrontService {

  private apiUrl = "http://localhost:8093/user/api/auth"; // L'URL de ton API Gateway

  constructor(private http: HttpClient) { }

  // ➡️ Inscription
  register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      secretKey: user.secretKey, // 🔑 Ajout de la clé secrète
    };

    console.log("Registering user:", body); // Debugging

    // ➡️ Ajout de `/register` dans l'URL
    return this.http.post(`${this.apiUrl}/register`, body, { headers: headers });
  }

  // ➡️ Authentification
  authenticate(loginRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, loginRequest);
  }
}
