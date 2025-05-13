import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'http://localhost:8093/quiz/api/answers';

  constructor(private http: HttpClient) {}

  addAnswer(questionId: number, answer: { response: string; isCorrect: boolean }): Observable<any> {
    const fullAnswer = { ...answer, question: { id: questionId } };
    return this.http.post(`${this.apiUrl}/add/${questionId}`, fullAnswer);
  }

  getAnswersByQuestionId(questionId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/question/${questionId}`);
  }  

  deleteAnswer(answerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${answerId}`);
  }

  getAnswerById(answerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${answerId}`);
  }

  updateAnswer(answerId: number, updatedAnswer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${answerId}`, updatedAnswer);
  }

  // Calculer le score du quiz
  /*calculateScore(selectedAnswers: number[]): Observable<{ correctAnswersCount: number; incorrectAnswersCount: number }> {
    return this.http.post<{ correctAnswersCount: number; incorrectAnswersCount: number }>(
      `${this.apiUrl}/calculate-score`, 
      selectedAnswers
    );
  }*/
    calculateScore(selectedAnswerIds: number[]): Observable<any> {
      return this.http.post(`${this.apiUrl}/calculate-score`, selectedAnswerIds);
    }
}
