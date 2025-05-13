package com.esprit.stage.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InternshipOffer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private String companyName;
  private String location;
  private int duration;

  @Enumerated(EnumType.STRING)
  private StageType stageType;

  @Enumerated(EnumType.STRING)
  private OfferStatus offerStatus;

  @Column(columnDefinition = "TINYINT(1)")
  private Boolean remote;

  @Column(columnDefinition = "TINYINT(1)")
  private Boolean paid;

  private String startDate;
  private String jobDescription;
  private LocalDate creationDate;  // Add creationDate

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "internship_offer_image_urls", joinColumns = @JoinColumn(name = "internship_offer_id"))
  @Column
  private List<String> imageUrls;


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getCompanyName() {
    return companyName;
  }

  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }

  public String getLocation() {
    return location;
  }

  public int getDuration() {
    return duration;
  }

  public void setDuration(int duration) {
    this.duration = duration;
  }

  public StageType getStageType() {
    return stageType;
  }

  public void setStageType(StageType stageType) {
    this.stageType = stageType;
  }

  public OfferStatus getOfferStatus() {
    return offerStatus;
  }

  public void setOfferStatus(OfferStatus offerStatus) {
    this.offerStatus = offerStatus;
  }

  public Boolean getRemote() {
    return remote;
  }

  public void setRemote(Boolean remote) {
    this.remote = remote;
  }

  public Boolean getPaid() {
    return paid;
  }

  public void setPaid(Boolean paid) {
    this.paid = paid;
  }

  public String getStartDate() {
    return startDate;
  }

  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }

  public String getJobDescription() {
    return jobDescription;
  }

  public void setJobDescription(String jobDescription) {
    this.jobDescription = jobDescription;
  }

  public LocalDate getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(LocalDate creationDate) {
    this.creationDate = creationDate;
  }

  public List<String> getImageUrls() {
    return imageUrls;
  }

  public void setImageUrls(List<String> imageUrls) {
    this.imageUrls = imageUrls;
  }

  public void setLocation(String location) {
    this.location = location;
  }
}

