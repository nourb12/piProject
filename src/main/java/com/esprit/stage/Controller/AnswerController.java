package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Answer;
import com.esprit.stage.Service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answer")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    // Créer une nouvelle réponse
    @PostMapping("/create")
    public Answer createAnswer(@RequestBody Answer answer) {
        return answerService.createAnswer(answer);
    }

    // Récupérer toutes les réponses
    @GetMapping("/all")
    public List<Answer> getAllAnswers() {
        return answerService.getAllAnswers();
    }

    // Récupérer une réponse par son ID
    @GetMapping("/get/{id}")
    public Answer getAnswerById(@PathVariable Long id) {
        return answerService.getAnswerById(id).orElse(null);
    }

    // Mettre à jour une réponse existante
    @PutMapping("/update/{id}")
    public Answer updateAnswer(@PathVariable Long id, @RequestBody Answer updatedAnswer) {
        return answerService.updateAnswer(id, updatedAnswer);
    }

    // Supprimer une réponse par son ID
    @DeleteMapping("/delete/{id}")
    public void deleteAnswer(@PathVariable Long id) {
        answerService.deleteAnswer(id);
    }
}
