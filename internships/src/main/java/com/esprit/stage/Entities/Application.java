package com.esprit.stage.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = true)
    private Long userId;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "offer_id", nullable = true)
    private InternshipOffer internshipOffer;

    @Column(name = "full_name", nullable = true)
    private String fullName;

    @Column(name = "email", nullable = true)
    private String email;

    @Column(name = "phone", nullable = true)
    private String phone;

    @Column(name = "city", nullable = true)
    private String city;

    @Column(name = "career_objective", nullable = true, length = 1000)
    private String careerObjective;

    @Column(name = "technology_profile", nullable = true, length = 1000)
    private String technologyProfile;

    @Column(name = "skills", columnDefinition = "TEXT")
    private String skills;

    @Column(name = "experiences", nullable = true, length = 2000)
    private String experiences;


    @Column(name = "submission_date", nullable = true)
    private LocalDateTime submissionDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ApplicationStatus status;

    // 📸 Photo du candidat (Cloudinary)
    @Column(name = "photo_url")
    private String photoUrl;

    // 🔗 Lien LinkedIn du candidat
    @Column(name = "linkedin_profile")
    private String linkedinProfile;

    // 🔗 Lien vers le portfolio ou GitHub
    @Column(name = "portfolio")
    private String portfolio;
    @Column(name = "cv_pdf_url")
    private String cvPdfUrl;

    @Column(name = "motivation_pdf_url")
    private String motivationPdfUrl;


    @Override
    public String toString() {
        return "Application{" +
                "id=" + id +
                ", userId=" + userId +
                ", internshipOffer=" + internshipOffer +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", city='" + city + '\'' +
                ", careerObjective='" + careerObjective + '\'' +
                ", technologyProfile='" + technologyProfile + '\'' +
                ", skills='" + skills + '\'' +
                ", experience='" + experiences + '\'' +
                ", submissionDate=" + submissionDate +
                ", status=" + status +
                ", photoUrl='" + photoUrl + '\'' +
                ", motivationPdfUrl='" + motivationPdfUrl + '\'' +
                ", linkedinProfile='" + linkedinProfile + '\'' +
                ", portfolio='" + portfolio + '\'' +
                ", cvPdfUrl='" + cvPdfUrl + '\'' +
                '}';
    }
}
