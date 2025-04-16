package com.esprit.stage.Repository;

import com.esprit.stage.Entities.InternshipOffer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OffreRepo extends JpaRepository<InternshipOffer,Long> {
}
