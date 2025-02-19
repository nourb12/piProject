package com.esprit.stage.Service;

import com.esprit.stage.Entities.Quiz;
import com.esprit.stage.Repository.QuizRepository;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuizService implements IQuizService {
    @Autowired

    private QuizRepository quizRepository;

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).orElse(null);
    }
    public Quiz updateQuiz(Long id, Quiz updatedQuiz) {
        return quizRepository.findById(id).map(quiz -> {
            quiz.setTitle(updatedQuiz.getTitle());
            quiz.setDescription(updatedQuiz.getDescription());
            quiz.setSpecialite(updatedQuiz.getSpecialite());
            quiz.setDateQuiz(updatedQuiz.getDateQuiz());
            return quizRepository.save(quiz);
        }).orElse(null);
    }

    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }
}

