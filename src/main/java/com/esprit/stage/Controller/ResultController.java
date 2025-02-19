package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Result;
import com.esprit.stage.Service.IResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/result")
@RequiredArgsConstructor
public class ResultController {

    private final IResultService resultService;

    @PostMapping("/create")
    public Result createResult(@RequestBody Result result) {
        return resultService.createResult(result);
    }

    @GetMapping("/all")
    public List<Result> getAllResults() {
        return resultService.getAllResults();
    }

    @GetMapping("/get/{id}")
    public Result getResultById(@PathVariable Long id) {
        return resultService.getResultById(id);
    }

    @PutMapping("/update/{id}")
    public Result updateResult(@PathVariable Long id, @RequestBody Result updatedResult) {
        return resultService.updateResult(id, updatedResult);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteResult(@PathVariable Long id) {
        resultService.deleteResult(id);
    }
}
