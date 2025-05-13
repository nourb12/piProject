import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../../services/evaluation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent implements OnInit {
  evaluations: any[] = [];
  searchRating: number = 0; // Variable pour stocker la note globale de recherche

  constructor(private evaluationService: EvaluationService, private router: Router) {}

  ngOnInit() {
    this.evaluationService.getEvaluations().subscribe((data: any[]) => {
      this.evaluations = data;
    });
  }



  // Méthode pour rechercher les évaluations par note globale
  searchEvaluations() {
    if (this.searchRating >= 0) {
      this.evaluationService.searchEvaluationsByRating(this.searchRating).subscribe((data: any[]) => {
        this.evaluations = data;
      });
    } else {
      alert('Please enter a valid rating');
    }
  }

  // ✅ Correction ici : On s'assure que `attribute` est bien un nom de propriété valide
  setRating(evaluation: any, attribute: 'noteGlobale' | 'qualiteEncadrement' | 'ambianceTravail', star: number) {
    if (evaluation[attribute] === star) {
      evaluation[attribute] = star - 0.5;
    } else {
      evaluation[attribute] = star;
    }

    this.evaluationService.updateEvaluation(evaluation.id, evaluation).subscribe(
      () => console.log('Evaluation updated successfully'),
      (error) => console.error('Error updating evaluation', error)
    );
  }

  // ✅ Ajout de la fonction `getStarIcon`
  getStarIcon(note: number, star: number): string {
    if (note >= star) {
      return 'star';
    } else if (note >= star - 0.5) {
      return 'star_half';
    } else {
      return 'star_border';
    }
  }

  onUpdate(id: number) {
    this.router.navigate(['/evaluation-update', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this evaluation?')) {
      this.evaluationService.deleteEvaluation(id).subscribe(() => {
        this.evaluations = this.evaluations.filter(evaluation => evaluation.id !== id);
        console.log('Evaluation deleted successfully');
      });
    }
  }
}
