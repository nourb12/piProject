package com.esprit.stage.Service;

import com.esprit.stage.Entities.Meeting;
import com.esprit.stage.Entities.MeetingCategory;
import com.esprit.stage.Entities.User;
import com.esprit.stage.Repository.MeetingRepository;
import com.esprit.stage.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@EnableAsync
public class MeetingService implements IMeetingService {
  @Autowired
  private MeetingRepository meetingRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private SimpMessagingTemplate messagingTemplate;


  @Override
  public List<Meeting> getAllMeetings() {
    return meetingRepository.findAll();
  }

  @Override
  public Meeting getMeetingById(long id) {
    return meetingRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Meeting not found with ID: " + id));
  }

  @Override
  public Meeting addMeeting(Meeting meeting, Long supervisorId, List<Long> internIds) {
    if (supervisorId == null || internIds == null || internIds.isEmpty()) {
      throw new IllegalArgumentException("Supervisor ID and at least one Intern ID must be provided");
    }

    // Récupérer le superviseur
    User supervisor = userRepository.findById(supervisorId)
      .orElseThrow(() -> new RuntimeException("Supervisor not found with ID: " + supervisorId));
    meeting.setSupervisor(supervisor);

    // Récupérer les stagiaires
    List<User> interns = userRepository.findAllById(internIds);
    if (interns.isEmpty()) {
      throw new RuntimeException("No interns found with the provided IDs");
    }
    meeting.setInterns(interns);
    // Ensure bidirectional relationship
    for (User intern : interns) {
      intern.getMeetings().add(meeting);
    }

    meeting.setCreatedAt(LocalDateTime.now());

    // Add meeting logic (already implemented in your code)

    Meeting savedMeeting = meetingRepository.save(meeting);

    // After saving the meeting, send a real-time notification via WebSocket
    messagingTemplate.convertAndSend("/topic/meetings", savedMeeting);

    return savedMeeting;
  }

  @Override
  public Meeting updateMeeting(Meeting meeting, long id, Long supervisorId, List<Long> internIds) {
    Meeting existingMeeting = meetingRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Meeting not found with id: " + id));

    // Update other fields if they are not null
    if (meeting.getTitle() != null) {
      existingMeeting.setTitle(meeting.getTitle());
    }
    if (meeting.getLocation() != null) {
      existingMeeting.setLocation(meeting.getLocation());
    }
    if (meeting.getDescription() != null) {
      existingMeeting.setDescription(meeting.getDescription());
    }
    if (meeting.getType() != null) {
      existingMeeting.setType(meeting.getType());
    }
    if (meeting.getCategory() != null) {
      existingMeeting.setCategory(meeting.getCategory());
    }
    if (meeting.getStartDateTime() != null) {
      existingMeeting.setStartDateTime(meeting.getStartDateTime());
    }
    if (meeting.getEndDateTime() != null) {
      existingMeeting.setEndDateTime(meeting.getEndDateTime());
    }

    // Update supervisor
    if (supervisorId != null) {
      User supervisor = userRepository.findById(supervisorId)
        .orElseThrow(() -> new RuntimeException("Supervisor not found with id: " + supervisorId));
      existingMeeting.setSupervisor(supervisor);
    }

    // Update interns
    if (internIds != null && !internIds.isEmpty()) {
      List<User> interns = userRepository.findAllById(internIds);
      if (interns.isEmpty()) {
        throw new RuntimeException("No interns found with the provided IDs");
      }
      existingMeeting.setInterns(interns);
      // Ensure bidirectional relationship
      for (User intern : interns) {
        intern.getMeetings().add(existingMeeting);
      }
    }

    Meeting updatedMeeting = meetingRepository.save(existingMeeting);

    // After updating the meeting, send a real-time notification via WebSocket
    messagingTemplate.convertAndSend("/topic/meetings", updatedMeeting);

    return updatedMeeting;
  }

  @Override
  public void deleteMeeting(long id) {
    meetingRepository.findById(id).ifPresentOrElse(
      meetingRepository::delete,
      () -> { throw new EntityNotFoundException("Meeting not found with ID: " + id); }
    );
  }

  @Override
  public List<Meeting> getMeetingsByCategory(MeetingCategory category) {
    return meetingRepository.findByCategory(category);
  }

  @Override
  public List<Meeting> getMeetingsSortedByStartDateTime(boolean ascending) {
    return ascending
      ? meetingRepository.findAllByOrderByStartDateTimeAsc()
      : meetingRepository.findAllByOrderByStartDateTimeDesc();

  }

  @Override
  public List<Meeting> getMeetingsByCategoryAndSortedByDate(MeetingCategory category, boolean ascending) {
    if (ascending) {
      return meetingRepository.findByCategoryOrderByStartDateTimeAsc(category);
    } else {
      return meetingRepository.findByCategoryOrderByStartDateTimeDesc(category);
    }
  }
}
