import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-archived-projects',
  templateUrl: './archived-projects.component.html',
  styleUrls: ['./archived-projects.component.css']
})
export class ArchivedProjectsComponent implements OnInit {
  archivedProjects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadArchivedProjects();
  }

  loadArchivedProjects(): void {
    this.projectService.getArchivedProjects().subscribe({
      next: (data) => {
        this.archivedProjects = data;
      },
      error: (err) => {
        console.error('Error loading archived projects', err);
      }
    });
  }
}
