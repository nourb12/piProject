package com.esprit.stage.Service;

import com.esprit.stage.Entities.Evaluation;
import com.esprit.stage.Repository.EvaluationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EvaluationService {
    private final EvaluationRepository evaluationRepository;

    public EvaluationService(EvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }

    public List<Evaluation> getAllEvaluations() {
        return evaluationRepository.findAll();
    }

    public Optional<Evaluation> getEvaluationById(Integer id) {
        return evaluationRepository.findById(id);
    }

    public Evaluation createEvaluation(Evaluation evaluation) {
        return evaluationRepository.save(evaluation);
    }

    public Evaluation updateEvaluation(Integer id, Evaluation evaluationDetails) {
        Evaluation evaluation = evaluationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evaluation not found"));

        evaluation.setNoteGlobale(evaluationDetails.getNoteGlobale());
        evaluation.setQualiteEncadrement(evaluationDetails.getQualiteEncadrement());
        evaluation.setAmbianceTravail(evaluationDetails.getAmbianceTravail());
        evaluation.setChargeTravail(evaluationDetails.getChargeTravail());
        evaluation.setCommentaire(evaluationDetails.getCommentaire());
        evaluation.setDetail(evaluationDetails.getDetail());

        return evaluationRepository.save(evaluation);
    }

    public void deleteEvaluation(Integer id) {
        evaluationRepository.deleteById(id);
    }
}
