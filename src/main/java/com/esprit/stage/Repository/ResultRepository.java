package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Quiz;
import com.esprit.stage.Entities.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {
}
