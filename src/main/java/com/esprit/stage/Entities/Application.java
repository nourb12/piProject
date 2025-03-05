package com.esprit.stage.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

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
    private Integer userId;
    @ManyToOne(fetch = FetchType.EAGER) // ✅ Charge toujours les offres avec les applications
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

    @Column(name = "skills")
    private String skills;

    @Column(name = "experience", nullable = true, length = 2000)
    private String experience;

    @Column(name = "submission_date", nullable = true)
    private LocalDateTime submissionDate;

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
                ", experience='" + experience + '\'' +
                ", submissionDate=" + submissionDate +
                '}';
    }
}