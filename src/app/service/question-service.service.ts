import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  // URL de base de l'API Spring Boot pour gérer les questions
  private baseUrl = 'http://localhost:8088/quiz/api/question'; // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient) { }

  // Obtenir toutes les questions d'un quiz spécifique
  getQuestionsByQuizId(quizId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/quiz/${quizId}`);
  }
  getAllQuestions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }
  

  // Obtenir une question par son ID
  getQuestionById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }

  // Créer une nouvelle question pour un quiz
  createQuestion(quizId: number, question: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${quizId}`, question);
  }

  // Mettre à jour une question existante
  updateQuestion(id: number, question: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, question);
  }

  // Supprimer une question par son ID
  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
