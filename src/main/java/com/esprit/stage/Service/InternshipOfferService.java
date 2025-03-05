package com.esprit.stage.Service;

import com.esprit.stage.Entities.InternshipOffer;
import com.esprit.stage.Entities.OfferStatus;
import com.esprit.stage.Repository.InternshipOfferRepository;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class InternshipOfferService {

    private final InternshipOfferRepository internshipOfferRepository;
    private final CloudinaryService cloudinaryService;
    private final NotificationService notificationService;

    public InternshipOfferService(InternshipOfferRepository internshipOfferRepository,
                                  CloudinaryService cloudinaryService,
                                  NotificationService notificationService) {
        this.internshipOfferRepository = internshipOfferRepository;
        this.cloudinaryService = cloudinaryService;
        this.notificationService = notificationService;
    }

    public InternshipOffer addInternshipOffer(InternshipOffer offer, MultipartFile[] files) throws IOException {
        if (files != null && files.length > 0) {
            List<String> imageUrls = cloudinaryService.uploadImages(files);
            offer.setImageUrls(imageUrls);
        }
        // Set the creation date to the current date
        offer.setCreationDate(LocalDate.now());

        // Save Internship Offer
        InternshipOffer savedOffer = internshipOfferRepository.save(offer);

        // Send notification to users
        notificationService.sendNotification("New internship offer: " + savedOffer.getTitle(), "allUsers");

        return savedOffer;
    }
    @Scheduled(cron = "0 0 0 * * MON")
    public void archiveOldOffers() {
        List<InternshipOffer> offers = internshipOfferRepository.findAll();
        LocalDate currentDate = LocalDate.now();

        for (InternshipOffer offer : offers) {
            if (offer.getCreationDate() != null && offer.getCreationDate().isBefore(currentDate.minusDays(7))) {
                offer.setOfferStatus(OfferStatus.ARCHIVED);
                internshipOfferRepository.save(offer);
            }
        }
    }


    @Transactional
    public List<InternshipOffer> getAllInternshipOffers() {
        System.out.println(internshipOfferRepository.findAll());
        return internshipOfferRepository.findAll();
    }


    public InternshipOffer getInternshipOfferById(Long id) {
        return internshipOfferRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship Offer not found with ID: " + id));
    }


    public InternshipOffer updateInternshipOffer(Long id, InternshipOffer updatedOffer, MultipartFile[] files) throws IOException {
        InternshipOffer existingOffer = internshipOfferRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship Offer not found with ID: " + id));

        existingOffer.setTitle(updatedOffer.getTitle());
        existingOffer.setCompanyName(updatedOffer.getCompanyName());
        existingOffer.setLocation(updatedOffer.getLocation());
        existingOffer.setDuration(updatedOffer.getDuration());
        existingOffer.setStageType(updatedOffer.getStageType());
        existingOffer.setOfferStatus(updatedOffer.getOfferStatus());
        existingOffer.setRemote(updatedOffer.getRemote());
        existingOffer.setPaid(updatedOffer.getPaid());
        existingOffer.setStartDate(updatedOffer.getStartDate());
        existingOffer.setJobDescription(updatedOffer.getJobDescription());

        if (files != null && files.length > 0) {
            cloudinaryService.deleteImages(existingOffer.getImageUrls());
            List<String> newImageUrls = cloudinaryService.uploadImages(files);
            existingOffer.setImageUrls(newImageUrls);
        }


        InternshipOffer savedOffer = internshipOfferRepository.save(existingOffer);


        notificationService.sendNotification("Internship offer updated: " + savedOffer.getTitle(), "allUsers");

        return savedOffer;
    }

   /* // ✅ Supprimer une offre
    public void deleteInternshipOffer(Long id) throws IOException {
        InternshipOffer offer = internshipOfferRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship Offer not found with ID: " + id));

        cloudinaryService.deleteImages(offer.getImageUrls());
        internshipOfferRepository.deleteById(id);
    }*/
   @Transactional
   public void deleteInternshipOffer(Long id) throws IOException {
       InternshipOffer offer = internshipOfferRepository.findById(id)
               .orElseThrow(() -> new RuntimeException("Internship Offer not found with ID: " + id));


       List<String> images = offer.getImageUrls();
       if (images != null && !images.isEmpty()) {
           cloudinaryService.deleteImages(images);
       }


       internshipOfferRepository.deleteImagesByOfferId(id);

       internshipOfferRepository.deleteById(id);
   }




    public List<InternshipOffer> searchByTitle(String title) {
        return internshipOfferRepository.findByTitleContainingIgnoreCase(title);
    }


    public List<InternshipOffer> searchByStatus(String status) {
        try {
            OfferStatus offerStatus = OfferStatus.valueOf(status.toUpperCase());
            return internshipOfferRepository.findByOfferStatus(offerStatus);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status + ". Allowed values: OPEN, CLOSED, ARCHIVED.");
        }
    }

}
