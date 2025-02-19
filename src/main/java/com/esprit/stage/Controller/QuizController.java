package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Quiz;
import com.esprit.stage.Service.IQuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final IQuizService quizService;

    @PostMapping("/create")
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizService.createQuiz(quiz);
    }

    @GetMapping("/all")
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @GetMapping("/get/{id}")
    public Quiz getQuizById(@PathVariable Long id) {
        return quizService.getQuizById(id);
    }
    @PutMapping("/update/{id}")
    public Quiz updateQuiz(@PathVariable Long id, @RequestBody Quiz updatedQuiz) {
        return quizService.updateQuiz(id, updatedQuiz);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
    }
}


