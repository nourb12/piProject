import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from 'src/app/services/answer-service.service';

@Component({
  selector: 'app-update-answer',
  templateUrl: './update-answer.component.html',
  styleUrls: ['./update-answer.component.css']
})
export class UpdateAnswerComponent implements OnInit {
  answerId!: number;
  answer: any = { response: '', isCorrect: false };

  constructor(
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.answerId = Number(this.route.snapshot.paramMap.get('answerId'));
    this.getAnswer();
  }

  getAnswer() {
    this.answerService.getAnswerById(this.answerId).subscribe({
      next: (data) => {
        this.answer = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la réponse :', err);
      }
    });
  }

  updateAnswer() {
    this.answerService.updateAnswer(this.answerId, this.answer).subscribe({
      next: () => {
        alert('Réponse mise à jour avec succès !');
        this.router.navigate(['/answer-list', this.answer.question.id]); // Redirection vers la liste
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la réponse :', err);
      }
    });
  }
}
