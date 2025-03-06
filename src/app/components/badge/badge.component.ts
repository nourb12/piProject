import { Component, Input } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent {
  @Input() quizTitle: string = 'Quiz Angular';
  @Input() dateObtained: string = new Date().toLocaleDateString();
  @Input() remark: string = 'Excellent travail !';
  @Input() score: number = 90;
  @Input() level: string = 'Or';
  @Input() correctAnswersCount: number = 85;  // Exemple de score
  @Input() selectedLevel: string = 'Or';

  generatePDF(): void {
    const doc = new jsPDF();
    
    // Titre de la badge
    doc.setFontSize(18);
    doc.setTextColor(255, 223, 0); // Or pour le titre
    doc.text("Badge de Réussite", 20, 20);

    // Design du badge
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Noir pour le texte
    doc.text(`🏅 Quiz: ${this.quizTitle}`, 20, 40);
    doc.text(`⭐ Score: ${this.correctAnswersCount} / 100`, 20, 50);
    doc.text(`🔹 Niveau: ${this.selectedLevel}`, 20, 60);
    doc.text(`📅 Obtenu le: ${this.dateObtained}`, 20, 70);
    doc.text(`💬 Commentaire: ${this.remark}`, 20, 80); // Remarque personnalisée

    // Design supplémentaire (ligne horizontale sous les informations)
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, 85, 200, 85);

    // Ajouter un rectangle en bas pour l'effet badge
    doc.setDrawColor(255, 223, 0); // Or pour la bordure
    doc.setFillColor(255, 223, 0); // Remplir en or
    doc.rect(10, 90, 180, 10, 'F'); // Rectangle en bas de la page

    // Ajouter une forme arrondie pour rendre cela plus joli
    doc.setFillColor(255, 215, 0); // Plus foncé pour le rectangle
    doc.ellipse(100, 100, 80, 30, 'F'); // Cercle arrondi au centre

    // Sauvegarder le fichier PDF
    doc.save("Badge_Quiz.pdf");
  }
}
