package com.esprit.stage.Service;

import com.esprit.stage.dto.MatchedOfferDTO;
import com.esprit.stage.Entities.Application;
import com.esprit.stage.Entities.InternshipOffer;
import com.esprit.stage.Repository.ApplicationRepository;
import com.esprit.stage.Repository.InternshipOfferRepository;
import org.apache.commons.text.similarity.JaccardSimilarity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MatchingService {

    private final InternshipOfferRepository internshipOfferRepository;
    private final ApplicationRepository applicationRepository;

    public MatchingService(InternshipOfferRepository internshipOfferRepository, ApplicationRepository applicationRepository) {
        this.internshipOfferRepository = internshipOfferRepository;
        this.applicationRepository = applicationRepository;
    }

    public List<MatchedOfferDTO> matchApplicationWithOffers(Integer applicationId) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found with ID: " + applicationId));

        System.out.println("🔍 Matching pour Application ID: " + applicationId);
        System.out.println("📍 City: " + app.getCity());
        System.out.println("📚 Technology: " + app.getTechnologyProfile());

        List<InternshipOffer> allOffers = internshipOfferRepository.findAll();

        String candidateText = (
                optional(app.getTechnologyProfile()) + " " +
                        optional(app.getSkills()) + " " +
                        optional(app.getExperiences()) + " " +
                        optional(app.getCareerObjective())
        ).toLowerCase();

        String appCity = optional(app.getCity()).toLowerCase();
        JaccardSimilarity similarity = new JaccardSimilarity();

        Map<InternshipOffer, Double> scoredOffers = new HashMap<>();

        for (InternshipOffer offer : allOffers) {
            String offerText = (
                    optional(offer.getJobDescription()) + " " +
                            optional(offer.getTitle())
            ).toLowerCase();

            String offerCity = optional(offer.getLocation()).toLowerCase();

            double textSim = similarity.apply(candidateText, offerText);
            double locationScore = offerCity.equals(appCity) ? 1.0 : 0.0;
            double finalScore = textSim * 0.6 + locationScore * 0.4;

            System.out.printf("✅ [%s] Score = %.2f (Text: %.2f, Location: %.1f)\n",
                    offer.getTitle(), finalScore, textSim, locationScore);

            scoredOffers.put(offer, finalScore);
        }

        return scoredOffers.entrySet().stream()
                .sorted(Map.Entry.<InternshipOffer, Double>comparingByValue().reversed())
                // .limit(3) // 🔁 Optionnel : désactive si tu veux toutes les offres
                .map(entry -> {
                    InternshipOffer offer = entry.getKey();
                    double score = entry.getValue();

                    return new MatchedOfferDTO(
                            offer.getId(),
                            offer.getTitle(),
                            offer.getCompanyName(),
                            offer.getLocation(),
                            offer.getOfferStatus().toString(),
                            offer.getPaid(),
                            offer.getStageType().toString(),
                            offer.getJobDescription(),
                            offer.getImageUrls(),
                            offer.getWeather(),
                            score
                    );
                })
                .collect(Collectors.toList());
    }

    private String optional(String value) {
        return value == null ? "" : value.trim();
    }
}
