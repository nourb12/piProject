package com.esprit.stage.Service;

import com.esprit.stage.Entities.Question;

import java.util.List;

public interface IQuestionService {
    Question createQuestion(Question question);
    List<Question> getAllQuestions();
    Question getQuestionById(Long id);
    Question updateQuestion(Long id, Question updatedQuestion);
    void deleteQuestion(Long id);
}
