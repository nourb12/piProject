package com.esprit.stage.Service;

import com.esprit.stage.Entities.Quiz;

import java.util.List;

public interface IQuizService {
    public Quiz createQuiz(Quiz quiz);
    public List<Quiz> getAllQuizzes();
    public Quiz getQuizById(Long id);
    public void deleteQuiz(Long id);
    public Quiz updateQuiz(Long id, Quiz updatedQuiz);
}
