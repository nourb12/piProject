package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Evaluation;
import com.esprit.stage.Service.EvaluationService;
import com.esprit.stage.Service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/evaluations")
@CrossOrigin(origins = "http://localhost:4200")
public class EvaluationController {

    private final EvaluationService evaluationService;
    private final EmailService emailService;

    public EvaluationController(EvaluationService evaluationService, EmailService emailService) {
        this.evaluationService = evaluationService;
        this.emailService = emailService;
    }

    @GetMapping
    public List<Evaluation> getAllEvaluations() {
        return evaluationService.getAllEvaluations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evaluation> getEvaluationById(@PathVariable Integer id) {
        Optional<Evaluation> evaluation = evaluationService.getEvaluationById(id);
        return evaluation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Evaluation> searchEvaluationsByRating(@RequestParam Double rating) {
        return evaluationService.searchEvaluationsByRating(rating);
    }

    @PostMapping
    public Evaluation createEvaluation(@RequestBody Evaluation evaluation) {
        Evaluation createdEvaluation = evaluationService.createEvaluation(evaluation);

        // Construire le message de l'email avec tous les attributs de l'évaluation
        String to = "voltride6@gmail.com"; // Remplace par l'email du destinataire
        String subject = "Nouvelle Évaluation Ajoutée";

        // Construire le contenu HTML de l'email
        String body = "<html>" +
                "<body style='font-family: Arial, sans-serif;'>" +
                "<div style='max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;'>" +
                "<h2 style='color: #007bff;'>Nouvelle Évaluation</h2>" +
                "<p>Une nouvelle évaluation a été ajoutée avec les détails suivants :</p>" +
                "<table style='width: 100%; border-collapse: collapse;'>" +
                "  <tr><td><strong>Note Globale :</strong></td><td>" + createdEvaluation.getNoteGlobale() + "</td></tr>" +
                "  <tr><td><strong>Qualité Encadrement :</strong></td><td>" + createdEvaluation.getQualiteEncadrement() + "</td></tr>" +
                "  <tr><td><strong>Ambiance Travail :</strong></td><td>" + createdEvaluation.getAmbianceTravail() + "</td></tr>" +
                "  <tr><td><strong>Charge Travail :</strong></td><td>" + createdEvaluation.getChargeTravail() + "</td></tr>" +
                "  <tr><td><strong>Commentaire :</strong></td><td>" + createdEvaluation.getCommentaire() + "</td></tr>" +
                "  <tr><td><strong>Détail :</strong></td><td>" + createdEvaluation.getDetail() + "</td></tr>" +
                "</table>" +
                "<p style='margin-top: 20px;'>Merci pour votre retour !</p>" +
                "</div>" +
                "</body></html>";

        emailService.sendEmail(to, subject, body);

        return createdEvaluation;
    }


    @PutMapping("/{id}")
    public ResponseEntity<Evaluation> updateEvaluation(@PathVariable Integer id, @RequestBody Evaluation evaluationDetails) {
        try {
            Evaluation updatedEvaluation = evaluationService.updateEvaluation(id, evaluationDetails);

            // Construire l'email
            String to = "voltride6@gmail.com"; // Remplace par l'email du destinataire
            String subject = "Mise à Jour de Votre Évaluation";

            // Contenu HTML de l'email
            String body = "<html>" +
                    "<body style='font-family: Arial, sans-serif;'>" +
                    "<div style='max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;'>" +
                    "<h2 style='color: #007bff;'>Mise à Jour de l'Évaluation</h2>" +
                    "<p>Votre évaluation a été mise à jour avec les détails suivants :</p>" +
                    "<table style='width: 100%; border-collapse: collapse;'>" +
                    "  <tr><td><strong>Note Globale :</strong></td><td>" + updatedEvaluation.getNoteGlobale() + "</td></tr>" +
                    "  <tr><td><strong>Qualité Encadrement :</strong></td><td>" + updatedEvaluation.getQualiteEncadrement() + "</td></tr>" +
                    "  <tr><td><strong>Ambiance Travail :</strong></td><td>" + updatedEvaluation.getAmbianceTravail() + "</td></tr>" +
                    "  <tr><td><strong>Charge Travail :</strong></td><td>" + updatedEvaluation.getChargeTravail() + "</td></tr>" +
                    "  <tr><td><strong>Commentaire :</strong></td><td>" + updatedEvaluation.getCommentaire() + "</td></tr>" +
                    "  <tr><td><strong>Détail :</strong></td><td>" + updatedEvaluation.getDetail() + "</td></tr>" +
                    "</table>" +
                    "<p style='margin-top: 20px;'>Merci pour votre retour !</p>" +
                    "</div>" +
                    "</body></html>";

            emailService.sendEmail(to, subject, body);

            return ResponseEntity.ok(updatedEvaluation);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvaluation(@PathVariable Integer id) {
        evaluationService.deleteEvaluation(id);
        return ResponseEntity.noContent().build();
    }
}
