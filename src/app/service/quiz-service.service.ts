import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // URL de base de l'API Spring Boot
  private baseUrl = 'http://localhost:8088/quiz/api/quiz'; // Assurez-vous que cette URL est correcte
  private storageKey = 'quizTerminated';

  constructor(private http: HttpClient) {}

  // Obtenir tous les quiz
  getAllQuizzes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  // Obtenir un quiz par son ID
  getQuizById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }

  // Créer un nouveau quiz
  createQuiz(quiz: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/create`, quiz, { headers });
  }

  // Mettre à jour un quiz existant
  updateQuiz(id: number, quiz: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, quiz);
  }

  // Supprimer un quiz par son ID
  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // Vérifier si un quiz est bloqué (triche détectée)
  isQuizBlocked(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  // Bloquer tous les quiz (après triche)
  terminateAllQuizzes(): void {
    localStorage.setItem(this.storageKey, 'true'); // Sauvegarde dans localStorage
    console.log("🚨 Tous les quiz sont maintenant bloqués !");
  }

  // Sauvegarder les résultats du quiz
  saveResult(result: any, quizId: number): Observable<any> {
    return this.http.post(`http://localhost:8088/quiz/api/result/create/${quizId}`, result);
  }
  
  getQuizzesByLevel(level: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/level/${level}`);
  }
  getQuizzesBySpecialite(specialite: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/specialite/${specialite}`);
  }
  getResultsBySpecialty(): Observable<any> {
    return this.http.get<any>('http://localhost:8088/quiz/api/quiz/stats/results-by-specialty');
  }
  getQuizCountBySpecialty(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stats/count-by-specialty`);
  }
  getAverageScoresByLevel(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats/average-score-by-level`);
  }
  
  getSuccessRateByQuiz(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats/success-rate-by-quiz`);
  }
  
  getCorrectAnswerPercentageByQuestion(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats/correct-answer-percentage-by-question`);
  }
  
}
