package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Meeting;
import com.esprit.stage.Service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MeetingWebSocketController {
  @Autowired
  private SimpMessagingTemplate messagingTemplate;

  @Autowired
  private MeetingService meetingService;

  // Send a notification to all subscribers whenever a meeting is added
  @MessageMapping("/meeting/add")
  public void notifyNewMeeting(Meeting meeting) {
    // Send a message to the topic where clients are subscribed
    messagingTemplate.convertAndSend("/topic/meetings", meeting);
  }

  // Send a notification when a meeting is updated
  @MessageMapping("/meeting/update")
  public void notifyUpdatedMeeting(Meeting meeting) {
    // Send the updated meeting details to all clients subscribed to /topic/meetings
    messagingTemplate.convertAndSend("/topic/meetings", meeting);
  }

}
