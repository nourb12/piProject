import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.css']
})
export class ProjectTimelineComponent implements OnInit {
  projects: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.http.get<Array<{ id: number, title: string, startDate: string, endDate: string, progress: number, status: string }>>('http://localhost:8888/api/projects')
      .subscribe(data => {
        this.projects = data;
      }, error => {
        console.error("❌ Erreur lors de la récupération des projets :", error);
      });
  }
}
