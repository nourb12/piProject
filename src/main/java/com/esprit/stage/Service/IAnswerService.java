package com.esprit.stage.Service;

import com.esprit.stage.Entities.Answer;

import java.util.List;
import java.util.Optional;

public interface IAnswerService {
    public Answer createAnswer(Answer answer);
    public List<Answer> getAllAnswers();
    public void deleteAnswer(Long id);
    public Answer updateAnswer(Long id, Answer updatedAnswer);
    public Optional<Answer> getAnswerById(Long id);
}
