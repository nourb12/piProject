package com.esprit.stage.Service;

import com.esprit.stage.Repository.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatistiqueService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    // Get the average global rating
    public Double getMoyenneNoteGlobale() {
        return evaluationRepository.getMoyenneNoteGlobale();
    }

    // Get the average quality of supervision
    public Double getMoyenneQualiteEncadrement() {
        return evaluationRepository.getMoyenneQualiteEncadrement();
    }

    // Get the average work atmosphere
    public Double getMoyenneAmbianceTravail() {
        return evaluationRepository.getMoyenneAmbianceTravail();
    }

    // Get the total number of complaints
    public Long getTotalComplaints() {
        return evaluationRepository.count();
    }

    // Get the workload distribution
    public List<Object[]> getRepartitionChargeTravail() {
        return evaluationRepository.getRepartitionChargeTravail();
    }

    // Get the complaints distribution
    public List<Object[]> getRepartitionPlaintes() {
        return evaluationRepository.getRepartitionPlaintes();
    }

    // Get comment distribution


    // Get details distribution
    public List<Object[]> getRepartitionDetails() {
        return evaluationRepository.getRepartitionDetails();
    }
}
