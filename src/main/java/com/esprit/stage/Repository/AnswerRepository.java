package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Answer;
import com.esprit.stage.Entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
