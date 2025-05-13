import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-statistics',
  templateUrl: './project-statistics.component.html',
  styleUrls: ['./project-statistics.component.css']
})
export class ProjectStatisticsComponent implements OnInit {
  chart: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.http.get<Array<{ title: string, progress: number }>>('http://localhost:8093/api/projects/project-progress')
      .subscribe(data => {
        if (data && data.length > 0) {
          const formattedData: { [key: string]: number } = {};
          data.forEach(project => {
            formattedData[project.title] = project.progress;
          });

          this.createChart(formattedData);
        }
      }, error => {
        console.error(" Erreur lors de la récupération des statistiques :", error);
      });
  }

  createChart(data: { [key: string]: number }) {
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy(); // Éviter la superposition de graphiques
    }

    const projectNames = Object.keys(data);
    const progressValues = Object.values(data);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: projectNames,
        datasets: [{
          label: 'Progression (%)',
          data: progressValues,
          backgroundColor: '#ff6384', 
          borderColor: '#333',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: { display: true, text: "Projects" },
            ticks: { autoSkip: false }
          },
          y: { 
            beginAtZero: true, 
            max: 100, 
            title: { display: true, text: "Progression (%)" } 
          }
        },
        plugins: {
          legend: { display: true }
        }
      }
    });
  }
}
