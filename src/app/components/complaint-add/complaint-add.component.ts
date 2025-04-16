import { Component } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'app-complaint-add',
  templateUrl: './complaint-add.component.html',
  styleUrls: ['./complaint-add.component.css'],
})
export class ComplaintAddComponent {
  complaint = {
    subject: '',
    description: '',
    submissionDate: new Date(),
    status: 'in-progress',
    sentiment: '', // Attribut pour l'analyse de sentiment
  };

  containsProfanity: boolean = false;
  profaneWords: string[] = ['merde', 'con', 'idiot', 'foutu', 'bordel']; // mots interdits locaux

  constructor(private complaintService: ComplaintService) {}

  // Vérification des mots interdits
  checkProfanity(): void {
    const lowerDesc = this.complaint.description.toLowerCase();
    this.containsProfanity = this.profaneWords.some((word) =>
      lowerDesc.includes(word)
    );
  }

  // Ajout de la réclamation avec analyse de sentiment
  addComplaint(): void {
    if (this.containsProfanity) {
      alert(
        '🛑 Langage inapproprié détecté. Veuillez reformuler votre réclamation.'
      );
      return;
    }

    // Ici, vous pouvez appeler un service d'analyse de sentiment avant d'ajouter la réclamation
    this.analyzeSentiment().then((sentimentResult) => {
      this.complaint.sentiment = sentimentResult;

      // Ensuite, on ajoute la réclamation avec l'analyse de sentiment
      this.complaintService.addComplaint(this.complaint).subscribe(
        (response) => {
          alert('✅ Réclamation ajoutée avec succès !');
          console.log(response);
        },
        (error) => {
          if (
            error.status === 400 &&
            error.error.includes('Langage inapproprié')
          ) {
            alert('🧠 Le chatbot a détecté un mot interdit dans votre description.');
          } else {
            alert('❌ Erreur lors de l’envoi de la réclamation.');
          }
          console.error(error);
        }
      );
    });
  }

  // Simule l'analyse de sentiment, renverra un sentiment "positif", "négatif" ou "neutre"
  async analyzeSentiment(): Promise<string> {
    // Implémente une analyse de sentiment ici
    // Cela pourrait être une API appelant un service de NLP, ou un algorithme local
    if (this.complaint.description.includes("frustrant") || this.complaint.description.includes("terrible")) {
      return 'negatif';
    } else if (this.complaint.description.includes("bon") || this.complaint.description.includes("excellent")) {
      return 'positif';
    }
    return 'neutre';
  }
}
