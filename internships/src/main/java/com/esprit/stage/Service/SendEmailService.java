package com.esprit.stage.Service;

import com.esprit.stage.Entities.Application;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class SendEmailService {

    @Autowired
    private JavaMailSender mailSender;

    /**
     * 🔹 Envoi d'un email lorsque la candidature est acceptée
     */
    public void sendApplicationAcceptedEmail(Application application) {
        String subject = "🎉 Congratulations! You Have Been Accepted!";
        String messageBody = "<h2 style='color: green; text-align: center;'>🎉 Congratulations! 🎉</h2>"
                + "<p>Dear <strong>" + application.getFullName() + "</strong>,</p>"
                + "<p>We are delighted to inform you that your internship application has been <strong style='color:green;'>ACCEPTED</strong>! 🎊</p>"
                + "<p>Below are the details of your application:</p>"
                + emailApplicationDetails(application)
                + "<p>✅ <strong>Next Steps:</strong> Our HR team will contact you shortly with further details regarding your onboarding process.</p>"
                + "<p>🚀 Welcome to the team! We are excited to have you on board.</p>";

        sendHtmlEmail(application.getEmail(), subject, messageBody);
    }
    public void sendApplicationSubmissionEmail(Application application) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(application.getEmail());
            helper.setSubject("Your Internship Application Has Been Submitted");
            helper.setFrom("eflexgym@gmail.com");

            String htmlContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "<style>" +
                    "body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                    ".container { max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }" +
                    "h1 { color: #2c3e50; text-align: center; }" +
                    "p { line-height: 1.6; }" +
                    ".application-details { background: #ecf0f1; padding: 15px; border-radius: 5px; }" +
                    ".footer { text-align: center; font-size: 12px; color: #7f8c8d; margin-top: 20px; }" +
                    ".highlight { color: #2980b9; font-weight: bold; }" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "<h1>Your Application Has Been Submitted</h1>" +
                    "<p>Dear " + application.getFullName() + ",</p>" +
                    "<p>Thank you for submitting your internship application. Below are the details of your submission:</p>" +
                    "<div class='application-details'>" +
                    "<p><strong>Application ID:</strong> <span class='highlight'>" + application.getId() + "</span></p>" +
                    "<p><strong>Full Name:</strong> " + application.getFullName() + "</p>" +
                    "<p><strong>Email:</strong> " + application.getEmail() + "</p>" +
                    "<p><strong>Phone:</strong> " + application.getPhone() + "</p>" +
                    "<p><strong>City:</strong> " + application.getCity() + "</p>" +
                    "<p><strong>Submission Date:</strong> " + application.getSubmissionDate().toString() + "</p>" +
                    "</div>" +
                    "<p>Your application will be reviewed soon. You can check the status of your application by logging into your account at <a href='http://localhost:4200/applications' style='color: #2980b9;'>Application Dashboard</a>.</p>" +
                    "<p>We appreciate your interest in our internship program!</p>" +
                    "<div class='footer'>" +
                    "© 2025 Internship Program Team | All rights reserved" +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println("✅ Email de soumission envoyé à " + application.getEmail());
        } catch (MessagingException e) {
            System.err.println("❌ Erreur d'envoi de l'email : " + e.getMessage());
            e.printStackTrace();
        }
    }


    /**
     * 🔹 Envoi d'un email lorsque la candidature est refusée
     */
    public void sendApplicationDeniedEmail(Application application) {
        String subject = "⚠️ Application Status Update";
        String messageBody = "<h2 style='color: red; text-align: center;'>Application Update</h2>"
                + "<p>Dear <strong>" + application.getFullName() + "</strong>,</p>"
                + "<p>Thank you for your interest in our internship program. After a careful review, we regret to inform you that your application has been <strong style='color:red;'>DENIED</strong>.</p>"
                + "<p>Below are the details of your application:</p>"
                + emailApplicationDetails(application)
                + "<p>❗ We encourage you to keep striving for your goals. Please do not hesitate to apply for future opportunities with us.</p>"
                + "<p>Best of luck in your journey ahead!</p>";

        sendHtmlEmail(application.getEmail(), subject, messageBody);
    }

    /**
     * 📩 Méthode pour envoyer un email HTML
     */
    private void sendHtmlEmail(String to, String subject, String bodyContent) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom("eflexgym@gmail.com");

            String htmlContent = "<!DOCTYPE html>"
                    + "<html><head>"
                    + "<style>"
                    + "body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }"
                    + ".container { max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }"
                    + "h1 { color: #2c3e50; text-align: center; }"
                    + "p { line-height: 1.6; }"
                    + ".application-details { background: #ecf0f1; padding: 15px; border-radius: 5px; }"
                    + ".footer { text-align: center; font-size: 12px; color: #7f8c8d; margin-top: 20px; }"
                    + ".highlight { color: #2980b9; font-weight: bold; }"
                    + "</style></head>"
                    + "<body>"
                    + "<div class='container'>"
                    + "<h1>" + subject + "</h1>"
                    + bodyContent
                    + "<div class='footer'>© 2025 Internship Program Team | All rights reserved</div>"
                    + "</div></body></html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to " + to);
        } catch (MessagingException e) {
            System.err.println("❌ Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * 🔹 Générer les détails de la candidature pour l'email
     */
    private String emailApplicationDetails(Application application) {
        return "<div class='application-details'>"
                + "<p><strong>Application ID:</strong> <span class='highlight'>" + application.getId() + "</span></p>"
                + "<p><strong>Full Name:</strong> " + application.getFullName() + "</p>"
                + "<p><strong>Email:</strong> " + application.getEmail() + "</p>"
                + "<p><strong>Phone:</strong> " + application.getPhone() + "</p>"
                + "<p><strong>City:</strong> " + application.getCity() + "</p>"
                + "<p><strong>Submission Date:</strong> " + application.getSubmissionDate().toString() + "</p>"
                + "</div>";
    }
}
