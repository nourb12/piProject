package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
}


