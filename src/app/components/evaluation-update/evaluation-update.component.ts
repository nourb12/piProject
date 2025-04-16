import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../../services/evaluation.service';

@Component({
  selector: 'app-evaluation-update',
  templateUrl: './evaluation-update.component.html',
  styleUrls: ['./evaluation-update.component.css'],
})
export class EvaluationUpdateComponent implements OnInit {
  evaluationId!: number; // ID de l'évaluation à mettre à jour

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

  errors: any = {}; // Stocke les erreurs de validation

  constructor(
    private route: ActivatedRoute,
    private evaluationService: EvaluationService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.evaluationId = +id;
      this.loadEvaluation(this.evaluationId);
    }
  }

  // Charger l'évaluation existante
  loadEvaluation(id: number) {
    this.evaluationService.getEvaluationById(id).subscribe(
      (data) => {
        this.evaluation = data;
      },
      (error) => {
        console.error('Erreur lors du chargement de l’évaluation', error);
      }
    );
  }

  // Valider les champs avant mise à jour
  validateForm(): boolean {
    this.errors = {}; // Réinitialiser les erreurs

    if (this.evaluation.noteGlobale === null) {
      this.errors.noteGlobale = 'La note globale est requise.';
    }
    if (this.evaluation.qualiteEncadrement === null) {
      this.errors.qualiteEncadrement = "La qualité d'encadrement est requise.";
    }
    if (this.evaluation.ambianceTravail === null) {
      this.errors.ambianceTravail = 'L’ambiance de travail est requise.';
    }
    if (!this.evaluation.chargeTravail) {
      this.errors.chargeTravail = 'Veuillez sélectionner une charge de travail.';
    }
    if (!this.evaluation.commentaire.trim()) {
      this.errors.commentaire = 'Le commentaire est obligatoire.';
    }
    if (!this.evaluation.detail.trim()) {
      this.errors.detail = 'Le champ détail est obligatoire.';
    }

    return Object.keys(this.errors).length === 0; // Retourne true si aucune erreur
  }

  // Mettre à jour l'évaluation si les validations passent
  updateEvaluation(): void {
    if (!this.validateForm()) {
      return; // Ne pas soumettre si le formulaire contient des erreurs
    }

    this.evaluationService.updateEvaluation(this.evaluationId, this.evaluation).subscribe(
      () => {
        alert('Évaluation mise à jour avec succès !');
        this.router.navigate(['/evaluation-list']);
      },
      (error) => {
        alert("Erreur lors de la mise à jour de l'évaluation !");
        console.error(error);
      }
    );
  }

  // Sélectionner la note (gère les demi-étoiles)
  setRating(attribute: string, rating: number): void {
    if (this.evaluation[attribute] === rating) {
      this.evaluation[attribute] = rating - 0.5;
    } else {
      this.evaluation[attribute] = rating;
    }
  }

  // Détermine l'affichage des étoiles (pleine, demi, vide)
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
