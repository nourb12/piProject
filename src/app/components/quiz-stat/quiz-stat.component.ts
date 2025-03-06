import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz-service.service';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-quiz-stat',
  templateUrl: './quiz-stat.component.html',
  styleUrls: ['./quiz-stat.component.css']
})
export class QuizStatComponent implements OnInit {
  chart: any;
  chartType: ChartType = 'bar';
  chartTypes: ChartType[] = ['bar', 'line', 'pie', 'doughnut']; // Types disponibles
  selectedStat: string = 'scores'; // Par défaut, afficher les scores

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    if (this.selectedStat === 'scores') {
      this.quizService.getResultsBySpecialty().subscribe(
        (data) => this.createChart(data.specialties, data.averageScores, 'Moyenne des scores par spécialité')
      );
    } else if (this.selectedStat === 'count') {
      this.quizService.getQuizCountBySpecialty().subscribe(
        (data) => this.createChart(data.specialties, data.quizCounts, 'Nombre de Quiz par spécialité')
      );
    } else if (this.selectedStat === 'levelScores') {
      this.quizService.getAverageScoresByLevel().subscribe(
        (data) => this.createChart(data.levels, data.averageScores, 'Score moyen par niveau')
      );
    } else if (this.selectedStat === 'successRate') {
      this.quizService.getSuccessRateByQuiz().subscribe(
        (data) => this.createChart(data.quizTitles, data.successRates, 'Taux de réussite par quiz')
      );
    } else if (this.selectedStat === 'correctPercentage') {
      this.quizService.getCorrectAnswerPercentageByQuestion().subscribe(
        (data) => this.createChart(data.questionIds.map(String), data.correctPercentages, 'Pourcentage de bonnes réponses par question')
      );
    }
  }
  

  createChart(labels: string[], data: number[], label: string): void {
    const ctx = document.getElementById('quizStatsChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chart) this.chart.destroy(); // Supprimer l'ancien graphique

    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
          borderColor: '#ddd',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }

  updateChartType(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.chartType = target.value as ChartType;
      this.loadStats();
    }
  }

  updateStatType(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.selectedStat = target.value;
      this.loadStats();
    }
  }
}
