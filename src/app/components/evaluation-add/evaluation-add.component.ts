import { Component } from '@angular/core';
import { EvaluationService } from '../../services/evaluation.service';
import { BadWordsService } from '../../services/bad-words.service'; // Import du service de filtrage

@Component({
  selector: 'app-evaluation-add',
  templateUrl: './evaluation-add.component.html',
  styleUrls: ['./evaluation-add.component.css'],
})
export class EvaluationAddComponent {
  evaluation: {
    [key: string]: any;
    noteGlobale: number | null;
    qualiteEncadrement: number | null;
    ambianceTravail: number | null;
    chargeTravail: string;
    commentaire: string;
    detail: string;
  } = {
    noteGlobale: null,
    qualiteEncadrement: null,
    ambianceTravail: null,
    chargeTravail: '',
    commentaire: '',
    detail: '',
  };

  hasBadWords = false; // Indicateur de mots interdits

  constructor(
    private evaluationService: EvaluationService,
    private badWordsService: BadWordsService // Injection du service
  ) {}

  addEvaluation(): void {
    this.checkBadWords();

    if (this.hasBadWords) {
      alert('Votre commentaire contient des mots interdits. Veuillez le modifier.');
      return;
    }

    if (this.isFormValid()) {
      this.evaluationService.addEvaluation(this.evaluation).subscribe(
        (response) => {
          alert('Évaluation ajoutée avec succès !');
          console.log(response);
        },
        (error) => {
          alert('Erreur lors de l\'ajout de l\'évaluation !');
          console.error(error);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  isFormValid(): boolean {
    return (
      this.evaluation.noteGlobale !== null &&
      this.evaluation.qualiteEncadrement !== null &&
      this.evaluation.ambianceTravail !== null &&
      this.evaluation.chargeTravail.trim() !== '' &&
      this.evaluation.commentaire.trim() !== '' &&
      this.evaluation.detail.trim() !== ''
    );
  }

  checkBadWords(): void {
    this.hasBadWords = this.badWordsService.containsBadWords(this.evaluation.commentaire);
    if (this.hasBadWords) {
      this.evaluation.commentaire = this.badWordsService.cleanText(this.evaluation.commentaire);
    }
  }

  setRating(attribute: string, rating: number): void {
    if (this.evaluation[attribute] === rating) {
      this.evaluation[attribute] = rating - 0.5;
    } else {
      this.evaluation[attribute] = rating;
    }
  }

  getStarIcon(attribute: string, star: number): string {
    const note = this.evaluation[attribute] || 0;
    if (note >= star) {
      return 'star';
    } else if (note >= star - 0.5) {
      return 'star_half';
    } else {
      return 'star_border';
    }
  }
}
