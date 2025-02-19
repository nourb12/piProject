package com.esprit.stage.Service;

import com.esprit.stage.Entities.Interview;
import com.esprit.stage.Entities.User;
import com.esprit.stage.Repository.InterviewRepo;
import com.esprit.stage.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class InterviewService implements IInterviewService {

    @Autowired
    private InterviewRepo interviewRepo;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Interview> getAllInterviews() {
        return interviewRepo.findAll();
    }

    @Override
    public Interview getInterviewById(long id) {
        return interviewRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview not found with ID: " + id));
    }


    @Override
    public Interview addInterview(Interview interview, Long studentId, Long hrId) {
        if (studentId == null || hrId == null) {
            throw new IllegalArgumentException("Student ID and HR ID must be provided");
        }

        // Fetch existing Student
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
        interview.setStudent(student);

        // Fetch existing HR
        User hr = userRepository.findById(hrId)
                .orElseThrow(() -> new RuntimeException("HR not found with ID: " + hrId));
        interview.setHr(hr);

        interview.setCreatedAt(LocalDateTime.now());
        return interviewRepo.save(interview);
    }

    @Override
    public Interview updateInterview(Interview interview, long id) {
        Interview existingInterview = interviewRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview not found with id: " + id));

        // Update only if the new value is not null
       if (interview.getLocation() != null) {
            existingInterview.setLocation(interview.getLocation());
        }
        if (interview.getTitle() != null) {
            existingInterview.setTitle(interview.getTitle());
        }
        if (interview.getDescription() != null) {
            existingInterview.setDescription(interview.getDescription());
        }
        if (interview.getStartDateTime() != null) {
            existingInterview.setStartDateTime(interview.getStartDateTime());
        }
        if (interview.getEndDateTime() != null) {
            existingInterview.setEndDateTime(interview.getEndDateTime());
        }
        if (interview.getStatus() != null) {
            existingInterview.setStatus(interview.getStatus());
        }

        // Update Student and HR only by ID
        if (interview.getStudent() != null && interview.getStudent().getUserId() != null) {
            User student = userRepository.findById(interview.getStudent().getUserId())
                    .orElseThrow(() -> new RuntimeException("Student not found with id: " + interview.getStudent().getUserId()));
            existingInterview.setStudent(student);
        }
        // Update Student and HR only by ID
        if (interview.getHr() != null && interview.getHr().getUserId() != null) {
            User hr = userRepository.findById(interview.getHr().getUserId())
                    .orElseThrow(() -> new RuntimeException("hr not found with id: " + interview.getHr().getUserId()));
            existingInterview.setHr(hr);
        }




        return interviewRepo.save(existingInterview);
    }


    @Override
    public void deleteInterview(long id) {
        interviewRepo.findById(id).ifPresentOrElse(
                interviewRepo::delete,
                () -> { throw new EntityNotFoundException("Interview not found with ID: " + id); }
        );
    }



}
