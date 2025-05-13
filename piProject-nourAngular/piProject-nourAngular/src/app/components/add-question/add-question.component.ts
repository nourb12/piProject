import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionServiceService } from 'src/app/services/question-service.service'; // Assurez-vous que le service est bien importé

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  questionForm!: FormGroup;
  quizId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private questionService: QuestionServiceService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du quiz passé en paramètre dans l'URL
    this.quizId = Number(this.route.snapshot.paramMap.get('quizId'));

    // Initialiser le formulaire
    this.questionForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  // Méthode pour ajouter une nouvelle question
  addQuestion(): void {
    if (this.questionForm.valid) {
      const newQuestion = {
        content: this.questionForm.value.content,
        quiz: { id: this.quizId } // Associer la question au quiz
      };

      // Appeler le service avec quizId + newQuestion
      this.questionService.createQuestion(this.quizId, newQuestion).subscribe({
        next: () => {
          console.log('Question ajoutée avec succès');
          this.router.navigate(['/quiz', this.quizId]); // Redirection vers la page du quiz
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de la question :', err);
        }
      });
    }
  }
}
