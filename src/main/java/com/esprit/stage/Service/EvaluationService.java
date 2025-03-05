package com.esprit.stage.Service;

import com.esprit.stage.Entities.Evaluation;
import com.esprit.stage.Repository.EvaluationRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final BadWordsFilterService badWordsFilterService;

    public EvaluationService(EvaluationRepository evaluationRepository, BadWordsFilterService badWordsFilterService) {
        this.evaluationRepository = evaluationRepository;
        this.badWordsFilterService = badWordsFilterService;
    }

    public List<Evaluation> getAllEvaluations() {
        return evaluationRepository.findAll();
    }

    public Optional<Evaluation> getEvaluationById(Integer id) {
        return evaluationRepository.findById(id);
    }

    public List<Evaluation> searchEvaluationsByRating(Double rating) {
        return evaluationRepository.findByNoteGlobaleLessThanEqual(rating);
    }

    public Evaluation createEvaluation(Evaluation evaluation) {
        // Filtrage des bad words pour commentaire et detail
        evaluation.setCommentaire(filterBadWords(evaluation.getCommentaire()));
        evaluation.setDetail(filterBadWords(evaluation.getDetail()));

        return evaluationRepository.save(evaluation);
    }

    public Evaluation updateEvaluation(Integer id, Evaluation evaluationDetails) {
        Evaluation evaluation = evaluationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evaluation not found"));

        evaluation.setNoteGlobale(evaluationDetails.getNoteGlobale());
        evaluation.setQualiteEncadrement(evaluationDetails.getQualiteEncadrement());
        evaluation.setAmbianceTravail(evaluationDetails.getAmbianceTravail());
        evaluation.setChargeTravail(evaluationDetails.getChargeTravail());

        // Filtrage des bad words pour commentaire et detail
        evaluation.setCommentaire(filterBadWords(evaluationDetails.getCommentaire()));
        evaluation.setDetail(filterBadWords(evaluationDetails.getDetail()));

        return evaluationRepository.save(evaluation);
    }

    public void deleteEvaluation(Integer id) {
        evaluationRepository.deleteById(id);
    }

    // Méthode pour filtrer les bad words
    private String filterBadWords(String text) {
        return badWordsFilterService.filterBadWords(text);
    }
}
