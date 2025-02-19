package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Question;
import com.esprit.stage.Entities.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
