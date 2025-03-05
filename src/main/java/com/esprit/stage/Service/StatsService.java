package com.esprit.stage.Service;

import com.esprit.stage.Entities.StatsDTO;
import com.esprit.stage.Repository.ApplicationRepository;
import com.esprit.stage.Repository.InternshipOfferRepository;
import com.esprit.stage.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatsService {

    @Autowired
    private InternshipOfferRepository offerRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public StatsDTO getAllStats() {
        StatsDTO stats = new StatsDTO();

        // Internship Offers Stats
        stats.setTotalOffers(offerRepository.count());
        stats.setOpenOffers(offerRepository.countOpenOffers());
        stats.setClosedOffers(offerRepository.countClosedOffers());
        stats.setArchivedOffers(offerRepository.countArchivedOffers());
        stats.setPaidOffers(offerRepository.countPaidOffers());
        stats.setRemoteOffers(offerRepository.countRemoteOffers());
        Double avgDuration = offerRepository.findAverageDuration();
        stats.setAverageDuration(avgDuration != null ? avgDuration : 0.0);

        // Applications Stats
        stats.setTotalApplications(applicationRepository.count());
        Double avgApps = applicationRepository.findAvgApplicationsPerOffer();
        stats.setAvgApplicationsPerOffer(avgApps != null ? avgApps : 0.0);

        // Notifications Stats
        stats.setTotalNotifications(notificationRepository.count());

        return stats;
    }
}