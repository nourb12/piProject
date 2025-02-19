package com.esprit.stage.Service;

import com.esprit.stage.Entities.Result;

import java.util.List;

public interface IResultService {
    Result createResult(Result result);
    List<Result> getAllResults();
    Result getResultById(Long id);
    Result updateResult(Long id, Result updatedResult);
    void deleteResult(Long id);
}
