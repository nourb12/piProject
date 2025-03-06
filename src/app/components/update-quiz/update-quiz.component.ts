import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from 'src/app/service/quiz-service.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  quizForm!: FormGroup;
  quizId!: number;
  levels: string[] = ['BEGINNER', 'INTERMEDIATE', 'EXPERT']; // Niveaux définis en dur

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du quiz depuis l'URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.quizId = +idParam; // Convertir en nombre
    }

    // Initialiser le formulaire
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      specialite: ['', [Validators.required, Validators.minLength(3)]],
      dateQuiz: ['', Validators.required],
      level: ['', Validators.required]
    });

    // Charger le quiz et remplir le formulaire
    this.quizService.getQuizById(this.quizId).subscribe({
      next: (quiz) => {
        console.log('Quiz chargé :', quiz);

        if (quiz.dateQuiz) {
          quiz.dateQuiz = new Date(quiz.dateQuiz).toISOString().split('T')[0];
        }

        this.quizForm.patchValue(quiz);
      },
      error: (err) => console.error('Erreur lors du chargement du quiz :', err)
    });
  }

  updateQuiz(): void {
    if (this.quizForm.valid) {
      const updatedQuiz = this.quizForm.value;

      console.log('Données envoyées pour mise à jour :', updatedQuiz);

      this.quizService.updateQuiz(this.quizId, updatedQuiz).subscribe({
        next: () => {
          console.log('Quiz mis à jour avec succès !');
          this.router.navigate(['/list-quiz']);
        },
        error: (err) => console.error('Erreur lors de la mise à jour du quiz :', err)
      });
    } else {
      console.error('Formulaire invalide');
    }
  }
}
