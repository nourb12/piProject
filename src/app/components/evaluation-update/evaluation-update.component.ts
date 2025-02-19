import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from '../../services/evaluation.service';

@Component({
  selector: 'app-evaluation-update',
  templateUrl: './evaluation-update.component.html',
  styleUrls: ['./evaluation-update.component.css']
})
export class EvaluationUpdateComponent implements OnInit {
  evaluationId!: number;  // Use '!' to assert it will be initialized
  evaluation: any;  // Store the fetched evaluation data

  constructor(private route: ActivatedRoute, private evaluationService: EvaluationService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.evaluationId = +id;  // Convert the string to number
      this.evaluationService.getEvaluationById(this.evaluationId).subscribe((data) => {
        this.evaluation = data;
      });
    }
  }

  updateEvaluation() {
    this.evaluationService.updateEvaluation(this.evaluationId, this.evaluation).subscribe((updatedEvaluation) => {
      console.log('Evaluation updated successfully:', updatedEvaluation);
    });
  }
}
