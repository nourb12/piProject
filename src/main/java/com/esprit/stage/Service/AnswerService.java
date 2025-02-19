package com.esprit.stage.Service;

import com.esprit.stage.Entities.Answer;
import com.esprit.stage.Repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService implements IAnswerService{

    @Autowired
    private AnswerRepository answerRepository;

    // CRUD operations

    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    public Optional<Answer> getAnswerById(Long id) {
        return answerRepository.findById(id);
    }

    public Answer updateAnswer(Long id, Answer updatedAnswer) {
        if (answerRepository.existsById(id)) {
            updatedAnswer.setId(id); // Set the ID to update the entity
            return answerRepository.save(updatedAnswer);
        } else {
            return null; // Or throw an exception
        }
    }

    public void deleteAnswer(Long id) {
        answerRepository.deleteById(id);
    }
}