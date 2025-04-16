import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8888/api/tasks';
  private projectApiUrl = 'http://localhost:8888/api/projects';

  constructor(private http: HttpClient) {}

  // Récupérer la liste des projets pour la dropdown
  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.projectApiUrl);
  }

  // Créer une tâche et l'assigner à un projet via son ID
  createTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/project/${task.projectId}`, task);
  }
  getTasksByProject(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/project/${projectId}`);
  }
  deleteTask(projectId: number, taskId: number) {
    const url = `${this.apiUrl}/project/${projectId}/tasks/${taskId}`;
    return this.http.delete(url);
  }
  
  updateTask(projectId: number, taskId: number, updatedTask: any): Observable<any> {
    const url = `${this.apiUrl}/project/${projectId}/tasks/${taskId}`;
    return this.http.put(url, updatedTask);
  }
  
  updateTaskStatus(taskId: number, newStatus: string) {
    return this.http.put(`/api/tasks/${taskId}/status`, newStatus, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  
  getTaskByProjectAndId(projectId: number, taskId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/project/${projectId}/tasks/${taskId}`);
  }
  markTaskAsCompleted(taskId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}/status?status=COMPLETED`, {});
  }
  
  
}
