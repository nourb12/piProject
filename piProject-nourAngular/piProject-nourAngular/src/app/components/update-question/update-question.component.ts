import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // ✅ Import des modules pour les formulaires
import { QuestionServiceService } from 'src/app/services/question-service.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  questionId!: number;
  questionForm!: FormGroup; // ✅ Ajout du FormGroup

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionServiceService,
    private router: Router,
    private fb: FormBuilder // ✅ Injection du FormBuilder pour créer le formulaire
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID de la question
    this.questionId = Number(this.route.snapshot.paramMap.get('id'));

    // Initialisation du formulaire avec des valeurs vides
    this.questionForm = this.fb.group({
      content: ['', Validators.required], // ✅ Champ obligatoire
    });

    // Charger les détails de la question
    this.loadQuestion();
  }

  loadQuestion(): void {
    this.questionService.getQuestionById(this.questionId).subscribe({
      next: (data) => {
        if (data) {
          this.questionForm.patchValue(data); // ✅ Remplit le formulaire avec les données existantes
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la question:', err);
        this.router.navigate(['/questions-list']); // Redirection si erreur
      }
    });
  }

  updateQuestion(): void {
    if (this.questionForm.valid) {
      this.questionService.updateQuestion(this.questionId, this.questionForm.value).subscribe({
        next: () => {
          this.router.navigate(['/questions-list']); // ✅ Redirection après mise à jour
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la question:', err);
        }
      });
    }
  }
}
