package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Application;
import com.esprit.stage.Entities.InternshipOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    List<Application> findByInternshipOffer(InternshipOffer internshipOffer);
    @Query("SELECT a FROM Application a JOIN FETCH a.internshipOffer WHERE a.email = :email")
    List<Application> findByEmail(@Param("email") String email);

    @Modifying
    @Query("DELETE FROM Application a WHERE a.id = :id")
    void deleteApplicationById(Integer id);
    boolean existsByEmailAndInternshipOffer_Id(String email, Long offerId);

    List<Application> findByUserId(Integer userId);

    @Query("SELECT CAST(COUNT(a) AS double) / (SELECT COUNT(o) FROM InternshipOffer o) FROM Application a")
    Double findAvgApplicationsPerOffer();
}