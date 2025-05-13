package com.esprit.stage.Service;

import com.esprit.stage.Entities.Application;
import com.esprit.stage.Entities.ApplicationStatus;
import com.esprit.stage.Entities.InternshipOffer;
import com.esprit.stage.Repository.ApplicationRepository;
import com.esprit.stage.Repository.InternshipOfferRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private SendEmailService sendEmailService;

    @Autowired
    private SmsService smsService;

    @Autowired
    private InternshipOfferRepository internshipOfferRepository;

    @Autowired
    private PdfGeneratorService pdfGeneratorService;

    private static final Logger logger = LoggerFactory.getLogger(ApplicationService.class);
    private static final String PDF_OUTPUT_DIRECTORY = System.getProperty("user.dir") + "/uploaded-files/";

    @Transactional
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Optional<Application> getApplicationById(Integer id) {
        return applicationRepository.findById(id);
    }

    public boolean hasUserApplied(String email, Long offerId) {
        return applicationRepository.existsByEmailAndInternshipOffer_Id(email, offerId);
    }

    @Transactional
    public Application createApplication(Application application, Long offerId) {
        boolean alreadyApplied = applicationRepository.existsByEmailAndInternshipOffer_Id(application.getEmail(), offerId);
        if (alreadyApplied) {
            throw new IllegalArgumentException("You have already applied for this internship offer.");
        }

        application.setSubmissionDate(LocalDateTime.now());
        application.setStatus(ApplicationStatus.WAITING);

        InternshipOffer offer = internshipOfferRepository.findById(offerId)
                .orElseThrow(() -> new IllegalArgumentException("The offer with ID " + offerId + " does not exist."));

        application.setInternshipOffer(offer);

        Application savedApp = applicationRepository.save(application);

        try {
            // Generate local PDFs
            String cvPath = pdfGeneratorService.generateCvPdf(savedApp, PDF_OUTPUT_DIRECTORY);
            String motivationPath = pdfGeneratorService.generateMotivationLetterPdf(savedApp, offer, PDF_OUTPUT_DIRECTORY);

            // Save relative paths for Angular frontend
            String cvUrl = "/files/" + new File(cvPath).getName();
            String motivationUrl = "/files/" + new File(motivationPath).getName();

            savedApp.setCvPdfUrl(cvUrl);
            savedApp.setMotivationPdfUrl(motivationUrl);
            savedApp = applicationRepository.save(savedApp);

        } catch (Exception e) {
            logger.error("Error while generating local PDF files: {}", e.getMessage());
        }

        notificationService.sendNotification(
                "📩 A new application has been submitted for internship offer ID: " + offerId,
                "admin"
        );

        sendEmailService.sendApplicationSubmissionEmail(savedApp);

        return savedApp;
    }

    @Transactional
    public Application updateApplication(Integer id, Application application) {
        if (!applicationRepository.existsById(id)) {
            throw new RuntimeException("Application with ID " + id + " was not found.");
        }

        application.setId(id);
        Application updatedApplication = applicationRepository.save(application);

        notificationService.sendNotification(
                "✏️ Application has been updated for internship offer: " +
                        (application.getInternshipOffer() != null ? application.getInternshipOffer().getTitle() : "Unknown"),
                "admin"
        );

        return updatedApplication;
    }

    @Transactional
    public void deleteApplication(Integer id) {
        logger.info("Initiating deletion of application with ID: {}", id);

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Application with ID: {} was not found", id);
                    return new RuntimeException("Application with ID " + id + " was not found.");
                });

        notificationService.sendNotification(
                "🗑️ Application has been deleted with ID: " + id,
                "admin"
        );

        try {
            applicationRepository.deleteApplicationById(id);
            applicationRepository.flush();
            logger.info("Application with ID: {} has been successfully deleted and verified.", id);
        } catch (Exception e) {
            logger.error("An error occurred while deleting application with ID: {}. Reason: {}", id, e.getMessage(), e);
            throw new RuntimeException("Unable to delete application with ID " + id, e);
        }
    }

    @Transactional
    public List<Application> getApplicationsByOffer(InternshipOffer offer) {
        return applicationRepository.findByInternshipOffer(offer);
    }

    @Transactional
    public List<Application> getApplicationsByUserId(Integer userId) {
        return applicationRepository.findByUserId(userId);
    }

    @Transactional
    public Application updateApplicationStatus(Integer id, ApplicationStatus newStatus) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with ID: " + id));

        application.setStatus(newStatus);
        Application updatedApplication = applicationRepository.save(application);

        notificationService.sendNotification(
                "🚦 Application status updated to " + newStatus + " for offer ID: " + application.getInternshipOffer().getId(),
                "admin"
        );

        String fullName = updatedApplication.getFullName();
        String phoneNumber = updatedApplication.getPhone();
        String offerTitle = updatedApplication.getInternshipOffer().getTitle();
        String companyName = updatedApplication.getInternshipOffer().getCompanyName();

        if (newStatus == ApplicationStatus.ACCEPTED) {
            sendEmailService.sendApplicationAcceptedEmail(updatedApplication);
            String message = "🎉 Congratulations " + fullName + "!\n\n"
                    + "📌 Internship Offer: " + offerTitle + "\n"
                    + "🏢 Company: " + companyName + "\n"
                    + "✅ Status: Accepted\n\n"
                    + "Welcome to the team! We’re excited to have you onboard.";
            smsService.sendSms(phoneNumber, message);

        } else if (newStatus == ApplicationStatus.DENIED) {
            sendEmailService.sendApplicationDeniedEmail(updatedApplication);
            String message = "⏳ Hello " + fullName + ",\n\n"
                    + "📌 Internship Offer: " + offerTitle + "\n"
                    + "🏢 Company: " + companyName + "\n"
                    + "❌ Status: Rejected\n\n"
                    + "Thank you for your application. We wish you all the best, and hope to see you apply again soon.";
            smsService.sendSms(phoneNumber, message);
        }

        return updatedApplication;
    }
}
