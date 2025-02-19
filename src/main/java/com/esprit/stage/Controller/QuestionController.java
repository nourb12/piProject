package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Question;
import com.esprit.stage.Service.IQuestionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question")
@AllArgsConstructor
public class QuestionController {

    private final IQuestionService questionService;

    @PostMapping("/create")
    public Question createQuestion(@RequestBody Question question) {
        return questionService.createQuestion(question);
    }

    @GetMapping("/")
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id);
    }

    @PutMapping("/update/{id}")
    public Question updateQuestion(@PathVariable Long id, @RequestBody Question updatedQuestion) {
        return questionService.updateQuestion(id, updatedQuestion);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
    }
}
