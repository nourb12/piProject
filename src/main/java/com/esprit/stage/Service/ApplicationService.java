package com.esprit.stage.Service;

import com.esprit.stage.Entities.Application;
import com.esprit.stage.Entities.InternshipOffer;
import com.esprit.stage.Repository.ApplicationRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        // Check if user has already applied
        boolean alreadyApplied = applicationRepository.existsByEmailAndInternshipOffer_Id(application.getEmail(), offerId);
        if (alreadyApplied) {
            throw new IllegalArgumentException("Vous avez déjà postulé à cette offre.");
        }

        // Set submission date
        application.setSubmissionDate(LocalDateTime.now());

        // Set InternshipOffer (assuming you have a way to fetch it properly)
        InternshipOffer offer = new InternshipOffer();
        offer.setId(offerId);
        application.setInternshipOffer(offer);

        Application savedApplication = applicationRepository.save(application);

        notificationService.sendNotification(
                "New application submitted for internship offer ID: " + offerId,
                "admin"
        );
        sendEmailService.sendApplicationSubmissionEmail(savedApplication);

        return savedApplication;
    }

    @Transactional
    public Application updateApplication(Integer id, Application application) {
        // Verify the application exists
        if (!applicationRepository.existsById(id)) {
            throw new RuntimeException("Application with ID " + id + " not found");
        }

        application.setId(id);
        Application updatedApplication = applicationRepository.save(application);

        notificationService.sendNotification(
                "Application has been updated for internship offer: " +
                        (application.getInternshipOffer() != null ? application.getInternshipOffer().getTitle() : "Unknown"),
                "admin"
        );

        return updatedApplication;
    }

    @Transactional
    public void deleteApplication(Integer id) {
        logger.info("Starting deletion of application with ID: {}", id);

        // Fetch the application without modifying it
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Application with ID: {} not found", id);
                    return new RuntimeException("Application with ID " + id + " not found");
                });

        logger.info("Application found: {}", application);

        // Send notification
        notificationService.sendNotification(
                "Application has been deleted with ID: " + id,
                "admin"
        );

        try {
            applicationRepository.deleteApplicationById(id);
            applicationRepository.flush();
            logger.info("Custom delete command executed and flushed for application ID: {}", id);
        } catch (Exception e) {
            logger.error("Failed to delete application with ID: {}. Error: {}", id, e.getMessage(), e);
            throw new RuntimeException("Failed to delete application with ID " + id, e);
        }

        logger.info("Application with ID: {} successfully deleted and verified", id);
    }

    private static final Logger logger = LoggerFactory.getLogger(ApplicationService.class);

    @Transactional
    public List<Application> getApplicationsByOffer(InternshipOffer offer) {
        return applicationRepository.findByInternshipOffer(offer);
    }

    @Transactional
    public List<Application> getApplicationsByUserId(Integer userId) {
        return applicationRepository.findByUserId(userId);
    }
}