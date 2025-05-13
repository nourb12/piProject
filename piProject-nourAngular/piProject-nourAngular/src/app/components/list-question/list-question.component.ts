import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {
  quizId!: number;
  questions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionServiceService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du quiz à partir des paramètres de l'URL
    this.quizId = Number(this.route.snapshot.paramMap.get('quizId'));
    
    // Charger les questions pour le quiz spécifique
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestionsByQuizId(this.quizId).subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des questions:', err);
      }
    });
  }

  // Méthode pour supprimer une question
  deleteQuestion(questionId: number): void {
    this.questionService.deleteQuestion(questionId).subscribe({
      next: () => {
        this.loadQuestions();  // Recharger la liste après suppression
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la question:', err);
      }
    });
  }
}
