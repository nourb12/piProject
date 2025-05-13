package com.esprit.stage.dto;

import com.esprit.stage.dto.WeatherResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MatchedOfferDTO {
    private Long id;
    private String title;
    private String companyName;
    private String location;
    private String offerStatus;
    private boolean paid;
    private String stageType;
    private String jobDescription;
    private List<String> imageUrls;
    private WeatherResponse weather;
    private double matchScore;
}
