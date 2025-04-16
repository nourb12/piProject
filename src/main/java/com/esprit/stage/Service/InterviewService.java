package com.esprit.stage.Service;

import com.esprit.stage.Entities.InternshipOffer;
import com.esprit.stage.Entities.Interview;
import com.esprit.stage.Entities.StatusType;
import com.esprit.stage.Entities.User;
import com.esprit.stage.Repository.InterviewRepo;
import com.esprit.stage.Repository.OffreRepo;
import com.esprit.stage.Repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static java.lang.System.in;

@Service
@AllArgsConstructor
@EnableAsync
public class InterviewService implements IInterviewService {

    @Autowired
    private InterviewRepo interviewRepo;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private OffreRepo offreRepo;


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
  public Interview addInterview(Interview interview, Long studentId, Long hrId , Long offreId) {
    if (studentId == null || hrId == null) {
      throw new IllegalArgumentException("Student ID and HR ID must be provided");
    }

    User student = userRepository.findById(studentId)
      .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
    interview.setStudent(student);

    InternshipOffer offre = offreRepo.findById(offreId)
      .orElseThrow(() -> new RuntimeException("offre not found with ID: " + studentId));
    interview.setOffre(offre);


    User hr = userRepository.findById(hrId)
      .orElseThrow(() -> new RuntimeException("HR not found with ID: " + hrId));
    interview.setHr(hr);

    interview.setCreatedAt(LocalDateTime.now());

    // Send email to student
    String subject = "🎉 Interview Invitation - Congratulations!";
    String body = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;'>"
      + "<h2 style='color: #2c3e50;'>Dear " + student.getUsername() + ",</h2>"
      + "<p style='font-size: 16px; color: #555;'>"
      + "We are pleased to inform you that you have been selected for an interview with "+offre.getCompanyName()+".Below are the details:</p>"
      + "<div style='background-color: #f8f9fa; padding: 15px; border-radius: 8px;'>"
      + "<p><strong>📌 Offer:</strong> " + offre.getTitle() + "</p>"
      + "<p><strong>📌 Title:</strong> " + interview.getTitle() + "</p>"
      + "<p><strong>📅 Date & Time:</strong> " + interview.getStartDateTime() + "</p>"
      + "<p><strong>📍 Location:</strong> " + interview.getLocation() + "</p>"
      + "<p><strong>📝 Description:</strong> " + interview.getDescription() + "</p>"
      + "</div>"
      + "<p style='font-size: 16px; color: #555;'>"
      + "Please confirm your attendance by replying to this email.</p>"
      + "<p style='text-align: center; margin-top: 20px;'>"
      + "<a href='#' style='background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Confirm Attendance</a>"
      + "</p>"
      + "<p style='font-size: 16px; color: #555;'>"
      + "Best regards,<br><strong>HR Team</strong></p>"
      + "</div>";

    emailService.sendInterviewEmail(student.getEmail(), subject, body);



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
      if (interview.getTuteur() != null) {
        existingInterview.setTuteur(interview.getTuteur());
      }
      if (interview.getOffre() != null) {
        existingInterview.setOffre(interview.getOffre());
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

  @Override
  public List<Interview> getInterviewsByUser(Long userId) {
    Optional<User> user = userRepository.findById(userId);
    return user.map(interviewRepo::findByUser).orElseThrow(() -> new RuntimeException("User not found"));
  }

  @Override
  public List<Interview> getCompletedInterviewsByUser(Long userId) {
    Optional<User> user = userRepository.findById(userId);
    return user.map(u -> interviewRepo.findCompletedByUser(u, StatusType.COMPLETED))
      .orElseThrow(() -> new RuntimeException("User not found"));
  }

  @Override
  public List<Interview> getInCompletedInterviewsByUser(Long userId) {
    Optional<User> user = userRepository.findById(userId);
    return user.map(u -> interviewRepo.findCompletedByUser(u, StatusType.SCHEDULED))
        .orElseThrow(() -> new RuntimeException("User not found"));
  }

  @Override
  public List<Interview> getCompletedInterviews() {
    return interviewRepo.findByStatus(StatusType.COMPLETED);
  }

  @Override
  public List<Interview> getInCompletedInterviews() {
    return interviewRepo.findByStatus(StatusType.SCHEDULED);
  }


}
