package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, Integer> {
    @Query("SELECT e FROM Evaluation e WHERE e.noteGlobale <= :rating")
    List<Evaluation> findByRatingLessThanEqual(@Param("rating") Double rating);
    // Get the average global rating
    @Query("SELECT AVG(e.noteGlobale) FROM Evaluation e")
    Double getMoyenneNoteGlobale();

    // Get the average quality of supervision
    @Query("SELECT AVG(e.qualiteEncadrement) FROM Evaluation e")
    Double getMoyenneQualiteEncadrement();

    // Get the average work atmosphere
    @Query("SELECT AVG(e.ambianceTravail) FROM Evaluation e")
    Double getMoyenneAmbianceTravail();

    // Get the workload distribution
    @Query("SELECT e.chargeTravail, COUNT(e) FROM Evaluation e GROUP BY e.chargeTravail")
    List<Object[]> getRepartitionChargeTravail();

    // Get the complaints distribution
    @Query("SELECT e.commentaire, COUNT(e) FROM Evaluation e GROUP BY e.commentaire")
    List<Object[]> getRepartitionPlaintes();

    // Get detail distribution (for example purposes, could be any attribute)
    @Query("SELECT e.detail, COUNT(e) FROM Evaluation e GROUP BY e.detail")
    List<Object[]> getRepartitionDetails();
    List<Evaluation> findByNoteGlobaleLessThanEqual(Double noteGlobale);

}
