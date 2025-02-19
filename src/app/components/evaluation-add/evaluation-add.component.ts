import { Component } from '@angular/core';
import { EvaluationService } from '../../services/evaluation.service';

@Component({
  selector: 'app-evaluation-add',
  templateUrl: './evaluation-add.component.html',
  styleUrls: ['./evaluation-add.component.css'],
})
export class EvaluationAddComponent {
  evaluation = {
    noteGlobale: null,
    qualiteEncadrement: null,
    ambianceTravail: null,
    chargeTravail: '',
    commentaire: '',
    detail: '',
  };

  constructor(private evaluationService: EvaluationService) {}

  addEvaluation(): void {
    this.evaluationService.addEvaluation(this.evaluation).subscribe(
      (response) => {
        alert('Evaluation added successfully!');
        console.log(response);
      },
      (error) => {
        alert('Error adding evaluation!');
        console.error(error);
      }
    );
  }
}
