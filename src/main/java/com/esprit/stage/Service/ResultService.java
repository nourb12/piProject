package com.esprit.stage.Service;

import com.esprit.stage.Entities.Result;
import com.esprit.stage.Repository.ResultRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ResultService implements IResultService {

    @Autowired
    private final ResultRepository resultRepository;

    public Result createResult(Result result) {
        return resultRepository.save(result);
    }

    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    public Result getResultById(Long id) {
        return resultRepository.findById(id).orElse(null);
    }

    public Result updateResult(Long id, Result updatedResult) {
        return resultRepository.findById(id).map(result -> {
            result.setScore(updatedResult.getScore());
            result.setQuiz(updatedResult.getQuiz());
            result.setDateTaken(updatedResult.getDateTaken());  // Mise à jour du champ dateTaken
            return resultRepository.save(result);
        }).orElse(null);
    }

    public void deleteResult(Long id) {
        resultRepository.deleteById(id);
    }
}

