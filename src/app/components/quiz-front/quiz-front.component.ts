import { Component, HostListener, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz-service.service';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { AnswerService } from 'src/app/service/answer-service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-quiz-front',
  templateUrl: './quiz-front.component.html',
  styleUrls: ['./quiz-front.component.css']
})
export class QuizFrontComponent implements OnInit {
  quizzes: any[] = []; // Liste des quiz
  selectedQuizId: number | null = null; // ID du quiz sélectionné
  questions: any[] = [];
  answers: { [questionId: number]: any[] } = {};
  selectedAnswers: { [questionId: number]: number } = {};
  correctAnswersCount: number = 0;
  incorrectAnswersCount: number = 0;
  isQuizTerminated = false;
  selectedLevel: string = ''; 
  searchTerm: string = '';
  badge: any = {};  // Évite les erreurs de null/undefined


  // ⏳ Gestion du temps : UN SEUL TIMER POUR LE QUIZ
  quizTimeLimit: number = 60; // 10 minutes en secondes
  remainingQuizTime: number = this.quizTimeLimit;
  quizTimer: any;

  constructor(
    private quizService: QuizService,
    private questionService: QuestionServiceService,
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data) => { this.quizzes = data; },
      (error) => { console.error('Erreur lors du chargement des quiz', error); }
    );
  }

  selectQuiz(quizId: number): void {
    this.selectedQuizId = quizId;
    this.loadQuestions();
    this.startQuizTimer(); // 🔥 Lancer le timer pour tout le quiz
  }

  loadQuestions(): void {
    if (!this.selectedQuizId) return;

    this.questionService.getQuestionsByQuizId(this.selectedQuizId).subscribe(
      (data) => {
        this.questions = data;
        this.questions.forEach(question => {
          this.loadAnswers(question.id);
        });
      },
      (error) => { console.error('Erreur lors du chargement des questions', error); }
    );
  }

  loadAnswers(questionId: number): void {
    this.answerService.getAnswersByQuestionId(questionId).subscribe(
      (data) => { this.answers[questionId] = data; },
      (error) => { console.error(`Erreur lors du chargement des réponses pour la question ${questionId}`, error); }
    );
  }

  selectAnswer(questionId: number, answerId: number): void {
    this.selectedAnswers[questionId] = answerId;
  }
  submitQuiz(): void {
    if (!this.selectedQuizId) {
      console.warn("⚠️ Aucun quiz sélectionné !");
      return;
    }

    clearInterval(this.quizTimer); // ⏹️ Stopper le timer

    const selectedAnswerIds = Object.values(this.selectedAnswers);

    this.answerService.calculateScore(selectedAnswerIds).subscribe(
      (data) => {
        this.correctAnswersCount = data.correct;
        this.incorrectAnswersCount = data.incorrect;

        const resultData = {
          quizId: this.selectedQuizId,
          correctAnswers: this.correctAnswersCount,
          incorrectAnswers: this.incorrectAnswersCount
        };

        this.quizService.saveResult(resultData, this.selectedQuizId!).subscribe(
          () => { console.log("✅ Résultat du quiz enregistré avec succès !"); },
          (error) => { console.error('❌ Erreur lors de la sauvegarde du résultat', error); }
        );

        // Génération du badge après soumission
        this.generateBadge();
      },
      (error) => { console.error('❌ Erreur lors du calcul du score', error); }
    );
  }
  generateBadge(): void {
    let badgeRemark: string = '';
    const date = new Date().toLocaleDateString();

    if (this.correctAnswersCount > 5) {
      badgeRemark = '🎉 Excellent job';
    } else if (this.correctAnswersCount > 3) {
      badgeRemark = '👍 good job';
    } else {
      badgeRemark = '👀 try again';
    }

    this.badge = {
      score: `${this.correctAnswersCount} / ${this.correctAnswersCount + this.incorrectAnswersCount}`,
      date: date,
      remark: badgeRemark,
      speciality: this.quizzes.find(q => q.id === this.selectedQuizId)?.specialite || 'Non spécifiée',
      quizTitle: this.quizzes.find(q => q.id === this.selectedQuizId)?.title || 'Inconnu'
    };
  }
  generatePDF(): void {
    const badgeElement = document.getElementById('badgeElement');
    if (!badgeElement) {
      console.error('⚠️ Élément du badge non trouvé.');
      return;
    }

    // Utiliser html2canvas pour capturer l'élément en image
    html2canvas(badgeElement!).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      // Créer un document PDF avec jsPDF
      const doc = new jsPDF();
      doc.addImage(imgData, 'PNG', 10, 10, 180, 160);

      // Enregistrer le PDF
      doc.save('badge-quiz.pdf');
    }).catch(err => {
      console.error('Erreur lors de la génération de l\'image du badge :', err);
    });
  }
  startQuizTimer(): void {
    this.remainingQuizTime = this.quizTimeLimit;
    clearInterval(this.quizTimer);

    this.quizTimer = setInterval(() => {
      if (this.remainingQuizTime > 0) {
        this.remainingQuizTime--;
      } else {
        console.warn("⏳ time is up . quiz sent automatically.");
        this.submitQuiz();
      }
    }, 1000);
  }

  filterQuizzesByLevel(): void {
    if (this.selectedLevel) {
      this.quizService.getQuizzesByLevel(this.selectedLevel).subscribe(
        (data) => { this.quizzes = data; },
        (error) => { console.error('Erreur lors du filtrage des quiz', error); }
      );
    } else {
      this.loadQuizzes();
    }
  }

  searchQuizzes() {
    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      this.quizzes = this.quizzes.filter(quiz =>
        quiz.specialite.toLowerCase().includes(term)
      );
    } else {
      this.loadQuizzes();
    }
  }

  @HostListener('window:blur', ['$event'])
  onWindowBlur(event: any): void {
    console.log("🚨 Triche détectée ! Le quiz est terminé.");
    this.isQuizTerminated = true;
    this.quizService.terminateAllQuizzes();
    this.selectedQuizId = null;
  }
}
