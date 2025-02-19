package com.esprit.stage.Service;

import com.esprit.stage.Entities.Question;
import com.esprit.stage.Repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionService implements IQuestionService {
    @Autowired
    private final QuestionRepository questionRepository;


    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }


    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }


    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElse(null);
    }


    public Question updateQuestion(Long id, Question updatedQuestion) {
        return questionRepository.findById(id).map(question -> {
            question.setContent(updatedQuestion.getContent());
            return questionRepository.save(question);
        }).orElse(null);
    }


    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}
