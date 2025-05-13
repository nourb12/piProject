import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from 'src/app/services/answer-service.service';

@Component({
  selector: 'app-list-answer',
  templateUrl: './list-answer.component.html',
  styleUrls: ['./list-answer.component.css']
})
export class ListAnswerComponent implements OnInit {
  questionId!: number;
  answers: any[] = [];

  constructor(private route: ActivatedRoute, private answerService: AnswerService) {}

  ngOnInit(): void {
    this.questionId = Number(this.route.snapshot.paramMap.get('questionId'));
    this.getAnswers();
  }

  getAnswers() {
    this.answerService.getAnswersByQuestionId(this.questionId).subscribe({
      next: (data) => {
        this.answers = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réponses :', err);
      }
    });
  }

  deleteAnswer(answerId: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette réponse ?')) {
      this.answerService.deleteAnswer(answerId).subscribe({
        next: () => {
          this.answers = this.answers.filter(answer => answer.id !== answerId);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la réponse :', err);
        }
      });
    }
  }
}
