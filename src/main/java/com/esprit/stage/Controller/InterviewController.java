package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Interview;
import com.esprit.stage.Entities.InterviewRequest;
import com.esprit.stage.Service.IInterviewService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("pi/Interview")
@CrossOrigin(origins = "http://localhost:4200")  // Allow Angular requests
public class InterviewController {
    @Autowired
    private  IInterviewService interviewService;
    // Get All Interviews
    @GetMapping
    public ResponseEntity<List<Interview>> getAllInterviews() {
        List<Interview> interviews = interviewService.getAllInterviews();
        return ResponseEntity.ok(interviews);
    }
    //  GET interview by ID
    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable long id) {
        try {
            Interview interview = interviewService.getInterviewById(id);
            return ResponseEntity.ok(interview);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    // ✅ POST (Create) a new interview
    @PostMapping
    public ResponseEntity<Interview> addInterview(
            @RequestBody Interview interview,
            @RequestParam Long studentId,
            @RequestParam Long hrId) {

        Interview createdInterview = interviewService.addInterview(interview, studentId, hrId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdInterview);
    }

    // ✅ PUT (Update) an interview
    @PutMapping("update/{id}")
    public ResponseEntity<Interview> updateInterview(@RequestBody Interview interview, @PathVariable long id) {
        try {
            Interview updatedInterview = interviewService.updateInterview(interview, id);
            return ResponseEntity.ok(updatedInterview);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // ✅ DELETE an interview
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable long id) {
        try {
            interviewService.deleteInterview(id);
            return ResponseEntity.noContent().build();  // 204 No Content (successful deletion)
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}



