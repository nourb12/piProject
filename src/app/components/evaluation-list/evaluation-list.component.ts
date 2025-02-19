import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../../services/evaluation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent implements OnInit {
  evaluations: any[] = [];  // Use 'any[]' type

  constructor(private evaluationService: EvaluationService, private router: Router) {}

  ngOnInit() {
    this.evaluationService.getEvaluations().subscribe((data: any[]) => {  // Cast to 'any[]'
      this.evaluations = data;
    });
  }

  onUpdate(id: number) {
    this.router.navigate(['/evaluation-update', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this evaluation?')) {
      this.evaluationService.deleteEvaluation(id).subscribe(() => {
        // Filter out the deleted evaluation from the list
        this.evaluations = this.evaluations.filter(evaluation => evaluation.id !== id);
        console.log('Evaluation deleted successfully');
      });
    }
  }
}
