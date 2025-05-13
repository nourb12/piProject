package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Application;
import com.esprit.stage.Entities.ApplicationStatus;
import com.esprit.stage.Entities.InternshipOffer;
import com.esprit.stage.Repository.ApplicationRepository;
import com.esprit.stage.Service.ApplicationService;
import com.esprit.stage.Service.MatchingService;
import com.esprit.stage.dto.MatchedOfferDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/internship-offers/applications")
public class ApplicationController {

    private static final Logger logger = LoggerFactory.getLogger(ApplicationController.class);
    private final MatchingService matchingService;
    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private ApplicationRepository applicationRepository;


    public ApplicationController( MatchingService matchingService) {

        this.matchingService = matchingService;
    }

    // ✅ GET ALL
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

    @GetMapping("/has-applied")
    public ResponseEntity<Boolean> hasUserApplied(
            @RequestParam String email,
            @RequestParam Long offerId) {
        boolean hasApplied = applicationService.hasUserApplied(email, offerId);
        return ResponseEntity.ok(hasApplied);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<List<Application>> getApplicationsByUser(@PathVariable String email) {
        List<Application> applications = applicationRepository.findByEmail(email);
        return ResponseEntity.ok(applications);
    }

    // ✅ POST avec fichiers PDF en local
    @PostMapping(value = "/apply", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Application> applyToInternship(
            @RequestParam("fullName") String fullName,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("city") String city,
            @RequestParam("careerObjective") String careerObjective,
            @RequestParam("technologyProfile") String technologyProfile,
            @RequestParam("skills") String skills,
            @RequestParam("experiences") String experiences,
            @RequestParam("linkedinProfile") String linkedinProfile,
            @RequestParam("portfolio") String portfolio,
            @RequestParam("offerId") Long offerId,
            @RequestParam("userId") Long userId,
            @RequestParam(value = "photo", required = false) MultipartFile photo

    ) {
        Application application = new Application();
        application.setFullName(fullName);
        application.setEmail(email);
        application.setPhone(phone);
        application.setCity(city);
        application.setCareerObjective(careerObjective);
        application.setTechnologyProfile(technologyProfile);
        application.setSkills(skills);
        application.setExperiences(experiences);
        application.setLinkedinProfile(linkedinProfile);
        application.setPortfolio(portfolio);
        application.setUserId(userId);
        application.setStatus(ApplicationStatus.WAITING);
        if (experiences == null || experiences.trim().isEmpty()) {
            experiences = "N/A";
        }

        // ✅ Sauvegarde locale de l'image si présente
        if (photo != null && !photo.isEmpty()) {
            try {
                String uploadDir = System.getProperty("user.dir") + "/uploaded-files/";

                File dir = new File(uploadDir);
                if (!dir.exists()) dir.mkdirs();

                String originalFilename = photo.getOriginalFilename();
                String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String savedFileName = "photo-" + fullName.replace(" ", "_") + extension;

                String fullPath = uploadDir + savedFileName;
                photo.transferTo(new File(fullPath));

                // ✅ Enregistrer le chemin absolu dans photoUrl
                application.setPhotoUrl(fullPath);
            } catch (IOException e) {
                System.out.println("❌ Erreur lors de l'enregistrement de la photo : " + e.getMessage());
            }
        }

        // ✅ Sauvegarde finale de la candidature avec photoUrl si présente
        Application saved = applicationService.createApplication(application, offerId);

        return ResponseEntity.ok(saved);
    }


    // ✅ Modifier une candidature
    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable Integer id, @RequestBody Application application) {
        try {
            Application updatedApplication = applicationService.updateApplication(id, application);
            return ResponseEntity.ok(updatedApplication);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Modifier statut de la candidature
    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable Integer id,
            @RequestBody Map<String, String> requestBody) {

        String status = requestBody.get("status");

        try {
            ApplicationStatus newStatus = ApplicationStatus.valueOf(status.toUpperCase());
            Application updatedApplication = applicationService.updateApplicationStatus(id, newStatus);
            return ResponseEntity.ok(updatedApplication);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // ✅ Supprimer candidature
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Integer id) {
        try {
            logger.info("Received DELETE request for application ID: {}", id);
            applicationService.deleteApplication(id);
            logger.info("Application with ID: {} deleted successfully", id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            logger.error("Failed to delete application with ID: {}. Error: {}", id, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }




    @GetMapping("/{id}/match")
    public List<MatchedOfferDTO> matchOffersByApplicationId(@PathVariable Integer id) {
        return matchingService.matchApplicationWithOffers(id);
    }



}
