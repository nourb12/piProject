package com.esprit.stage.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
  @Value("${emails.sender_email}")
  private String senderEmail;

  @Autowired
  private JavaMailSender mailSender;

  @Async // Exécuter cette méthode en arrière-plan
  public void sendInterviewEmail(String to, String subject, String body) {
    try {
      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

      helper.setTo(to);
      helper.setFrom(senderEmail);
      helper.setSubject(subject);
      helper.setText(body, true); // true = send as HTML

      mailSender.send(message);
      System.out.println("HTML Email sent correctly");
    } catch (MessagingException e) {
      System.out.println("Email not sent:");
      e.printStackTrace();
    }
  }
}

