import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  progress: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private apiUrl = 'http://localhost:8093/api/projects';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProject(project: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl, project);
  }

  updateProject(id: number, project: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateProjectStatus(projectId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${projectId}/status`, { status });
  }
  getDeadlineAlertsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/alerts/count`);
  }
  getActiveProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:8093/api/projects/active');
  }
  
  getArchivedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:8093/api/projects/archived');
  }
  
  archiveProject(id: number): Observable<void> {
    return this.http.put<void>(`http://localhost:8093/api/projects/${id}/archive`, {});
  }
  
  
}
