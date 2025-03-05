package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Application;
import com.esprit.stage.Entities.InternshipOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StatisticsRepository extends JpaRepository<InternshipOffer, Long> {

    // 📊 Nombre d’offres par entreprise (global)
    @Query("SELECT i.companyName, COUNT(i) FROM InternshipOffer i GROUP BY i.companyName")
    List<Object[]> countOffersByCompany();

    // 📈 Nombre d’offres créées par jour (global)
    @Query("SELECT DATE(i.creationDate), COUNT(i) FROM InternshipOffer i GROUP BY DATE(i.creationDate)")
    List<Object[]> countOffersByDay();

    // 📊 Nombre d’offres publiées par une entreprise spécifique (RH)
    @Query("SELECT COUNT(i) FROM InternshipOffer i WHERE i.companyName = :companyName")
    Long countOffersByCompanyRH(@Param("companyName") String companyName);

    @Query(value = "SELECT COALESCE((SELECT COUNT(a.id) FROM applications a INNER JOIN internship_offer i ON a.offer_id = i.id) * 1.0 / NULLIF((SELECT COUNT(i.id) FROM internship_offer i), 0), 0)", nativeQuery = true)
    Double getSubmissionToOfferRatio();

    @Query("SELECT i.location, COUNT(i) FROM InternshipOffer i GROUP BY i.location")
    List<Object[]> countOffersByLocation();


    // 📈 Nombre d’offres créées par jour pour une entreprise spécifique (RH)
    @Query("SELECT DATE(i.creationDate), COUNT(i) FROM InternshipOffer i WHERE i.companyName = :companyName GROUP BY DATE(i.creationDate)")
    List<Object[]> countOffersByCompanyPerDay(@Param("companyName") String companyName);

    // 📊 Nombre de candidatures par offre (global)
    @Query("SELECT i.title, COUNT(a) FROM Application a JOIN a.internshipOffer i GROUP BY i.title")
    List<Object[]> countApplicationsByOffer();

    // 📊 Nombre de candidatures par entreprise (global)
    @Query("SELECT i.companyName, COUNT(a) FROM Application a JOIN a.internshipOffer i GROUP BY i.companyName")
    List<Object[]> countApplicationsByCompany();

    // 📊 Nombre de candidatures reçues par une entreprise spécifique (RH)
    @Query("SELECT COUNT(a) FROM Application a JOIN a.internshipOffer i WHERE i.companyName = :companyName")
    Long countApplicationsByCompanyRH(@Param("companyName") String companyName);

    // 🔢 Ratio candidatures/offres pour une entreprise spécifique (RH)
    @Query(value = "SELECT COALESCE((SELECT COUNT(a.id) FROM applications a INNER JOIN internship_offer i ON a.offer_id = i.id WHERE i.company_name = :companyName) * 1.0 / NULLIF((SELECT COUNT(i.id) FROM internship_offer i WHERE i.company_name = :companyName), 0), 0)", nativeQuery = true)
    Double getSubmissionToOfferRatioByCompany(@Param("companyName") String companyName);
}
