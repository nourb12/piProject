import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from 'src/app/services/answer-service.service'; // 🔥 Vérifie bien l'import !

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnInit {
  questionId!: number;
  answerText: string = '';
  isCorrect: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private answerService: AnswerService, // 🔥 Injection correcte du service
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('questionId');
    if (id) {
      this.questionId = Number(id);
      console.log("✅ ID de la question récupéré :", this.questionId);
    } else {
      this.errorMessage = "Erreur : ID de la question non trouvé.";
    }
  }

  addAnswer(): void {
    if (!this.answerText.trim()) {
      this.errorMessage = "Le texte de la réponse ne peut pas être vide.";
      return;
    }

    const newAnswer = {
      response: this.answerText,
      isCorrect: this.isCorrect
    };

    this.answerService.addAnswer(this.questionId, newAnswer).subscribe({
      next: () => {
        this.successMessage = 'Réponse ajoutée avec succès !';
        this.errorMessage = '';
        
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de l'ajout de la réponse.";
        console.error('Erreur:', err);
      }
    });
  }
  toggleCorrect(event: Event) {
    this.isCorrect = (event.target as HTMLInputElement).checked;
    console.log("✅ isCorrect mis à jour :", this.isCorrect);
  }
  
}
