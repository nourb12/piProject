import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
  projects: Project[] = [];
  archivedProjects: Project[] = []; // Store archived projects separately

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getActiveProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets actifs', err);
      }
    });
  }

  loadArchivedProjects(): void {
    this.projectService.getArchivedProjects().subscribe({
      next: (data) => {
        this.archivedProjects = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets archivés', err);
      }
    });
  }

  deleteProject(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.projects = this.projects.filter(project => project.id !== id);
      });
    }
  }

  viewTasks(projectId: number): void {
    console.log(projectId);  
    this.router.navigate([`/list-task/${projectId}`]);
  }  

  updateProjectStatus(project: any): void {
    if (project.progress === 100 && project.status !== 'COMPLETED') {
      project.status = 'COMPLETED';
      this.projectService.updateProjectStatus(project.id, 'COMPLETED').subscribe({
        next: () => {
          console.log(`Project ${project.id} marked as COMPLETED`);
          this.checkAndArchiveProject(project); // Archive if needed
        },
        error: (err) => console.error('Error updating project status:', err)
      });
    }
  }

  checkAndArchiveProject(project: Project): void {
    const endDate = new Date(project.endDate);
    const today = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);

    if (project.status === 'COMPLETED' && endDate < threeDaysAgo) {
      this.projectService.archiveProject(project.id).subscribe({
        next: () => {
          console.log(`Project ${project.id} archived`);
          this.loadProjects(); // Refresh list
        },
        error: (err) => console.error('Error archiving project:', err)
      });
    }
  }
  
}
