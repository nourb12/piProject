import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz-service.service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {
  quizzes: any[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  // Charger la liste des quiz
  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
        console.log('Liste des quiz chargée :', this.quizzes);
      },
      error: (err) => {
        console.error('Erreur de chargement des quiz :', err);
      }
    });
  }

  // Supprimer un quiz
  deleteQuiz(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce quiz ?')) {
      this.quizService.deleteQuiz(id).subscribe({
        next: () => {
          console.log(`Quiz avec ID ${id} supprimé avec succès`);
          this.quizzes = this.quizzes.filter(quiz => quiz.id !== id);
        },
        error: (err) => {
          console.error(`Erreur lors de la suppression du quiz avec ID ${id} :`, err);
        }
      });
    }
  }
}
