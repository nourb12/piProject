package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRepo extends JpaRepository<Interview, Long> {
}
