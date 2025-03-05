package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Application;
import com.esprit.stage.Entities.InternshipOffer;
import com.esprit.stage.Repository.ApplicationRepository;
import com.esprit.stage.Service.ApplicationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private static final Logger logger = LoggerFactory.getLogger(ApplicationController.class);

    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private ApplicationRepository applicationRepository;

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Integer id) {
        return applicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{offerId}")
    public ResponseEntity<Application> createApplication(@RequestBody Application application, @PathVariable Long offerId) {
        try {
            Application created = applicationService.createApplication(application, offerId);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable Integer id, @RequestBody Application application) {
        try {
            Application updatedApplication = applicationService.updateApplication(id, application);
            return ResponseEntity.ok(updatedApplication);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Integer id) {
        try {
            logger.info("Received DELETE request for application ID: {}", id);
            applicationService.deleteApplication(id);
            logger.info("Application with ID: {} deleted successfully", id);
            return ResponseEntity.noContent().build(); // HTTP 204 No Content
        } catch (RuntimeException e) {
            logger.error("Failed to delete application with ID: {}. Error: {}", id, e.getMessage());
            return ResponseEntity.notFound().build(); // HTTP 404 if not found
        }
    }

    @GetMapping("/has-applied")
    public ResponseEntity<Boolean> hasUserApplied(
            @RequestParam String email,
            @RequestParam Long offerId) {
        boolean hasApplied = applicationService.hasUserApplied(email, offerId);
        return ResponseEntity.ok(hasApplied);
    }

    @GetMapping("/offer/{offerId}")
    public List<Application> getApplicationsByOfferId(@PathVariable Long offerId) {
        InternshipOffer offer = new InternshipOffer();
        offer.setId(offerId);
        return applicationService.getApplicationsByOffer(offer);
    }

    @GetMapping("/user/{userId}")
    public List<Application> getApplicationsByUserId(@PathVariable Integer userId) {
        return applicationService.getApplicationsByUserId(userId);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<List<Application>> getApplicationsByUser(@PathVariable String email) {
        List<Application> applications = applicationRepository.findByEmail(email);
        return ResponseEntity.ok(applications);
    }
}