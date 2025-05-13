import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from '../../services/statistique.service';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  moyenneNote: number = 0;
  moyenneQualiteEncadrement: number = 0;
  moyenneAmbianceTravail: number = 0;
  totalComplaints: number = 0;

  selectedChargeTravailType: ChartType = 'bar';
  selectedPlaintesType: ChartType = 'radar';
  selectedEvolutionNotesType: ChartType = 'line';

  chargeTravailChart: any;
  plaintesChart: any;
  commentairesChart: any;
  detailsChart: any;

  constructor(private statistiqueService: StatistiqueService) {}

  ngOnInit(): void {
    this.loadMoyenneNote();
    this.loadMoyenneQualiteEncadrement();
    this.loadMoyenneAmbianceTravail();
    this.loadChargeTravailChart();
    this.loadTotalComplaints();
    this.loadRepartitionPlaintesChart();
    this.loadRepartitionCommentairesChart();
    this.loadRepartitionDetailsChart();
  }

  loadMoyenneNote() {
    this.statistiqueService.getMoyenneNoteGlobale().subscribe(data => {
      this.moyenneNote = data;
    });
  }

  loadMoyenneQualiteEncadrement() {
    this.statistiqueService.getMoyenneQualiteEncadrement().subscribe(data => {
      this.moyenneQualiteEncadrement = data;
    });
  }

  loadMoyenneAmbianceTravail() {
    this.statistiqueService.getMoyenneAmbianceTravail().subscribe(data => {
      this.moyenneAmbianceTravail = data;
    });
  }

  loadChargeTravailChart() {
    this.statistiqueService.getRepartitionChargeTravail().subscribe(data => {
      const labels = data.map(d => d[0]);
      const values = data.map(d => d[1]);

      if (this.chargeTravailChart) {
        this.chargeTravailChart.destroy();
      }

      this.chargeTravailChart = new Chart('chargeTravailChart', {
        type: this.selectedChargeTravailType,
        data: {
          labels: labels,
          datasets: [{
            label: 'Workload Distribution',
            data: values,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        }
      });
    });
  }

  loadTotalComplaints() {
    this.statistiqueService.getTotalComplaints().subscribe(data => {
      this.totalComplaints = data;
    });
  }

  loadRepartitionPlaintesChart() {
    this.statistiqueService.getRepartitionPlaintes().subscribe(data => {
      const labels = data.map(d => d[0]);
      const values = data.map(d => d[1]);

      if (this.plaintesChart) {
        this.plaintesChart.destroy();
      }

      this.plaintesChart = new Chart('plaintesChart', {
        type: this.selectedPlaintesType,
        data: {
          labels: labels,
          datasets: [{
            label: 'Complaints Distribution',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2
          }]
        }
      });
    });
  }

  loadRepartitionCommentairesChart() {
    this.statistiqueService.getRepartitionCommentaires().subscribe(data => {
      const labels = data.map(d => d[0]);
      const values = data.map(d => d[1]);

      if (this.commentairesChart) {
        this.commentairesChart.destroy();
      }

      this.commentairesChart = new Chart('commentairesChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Comment Distribution',
            data: values,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        }
      });
    });
  }

  loadRepartitionDetailsChart() {
    this.statistiqueService.getRepartitionDetails().subscribe(data => {
      const labels = data.map(d => d[0]);
      const values = data.map(d => d[1]);

      if (this.detailsChart) {
        this.detailsChart.destroy();
      }

      this.detailsChart = new Chart('detailsChart', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Detail Distribution',
            data: values,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        }
      });
    });
  }
}
