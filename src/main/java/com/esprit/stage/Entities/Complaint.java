package com.esprit.stage.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_complaint;
    private String subject;
    private String description;
    private Date submissionDate;
    private String status;

    @OneToOne(mappedBy = "complaint", cascade = CascadeType.ALL)
    @JsonBackReference
    private ComplaintResponse complaintResponse;


    // Getters et Setters
    public Integer getId_complaint() { return id_complaint; }
    public void setId_complaint(Integer id_complaint) { this.id_complaint = id_complaint; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Date getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(Date submissionDate) { this.submissionDate = submissionDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }



    public ComplaintResponse getComplaintResponse() { return complaintResponse; }
    public void setComplaintResponse(ComplaintResponse complaintResponse) { this.complaintResponse = complaintResponse; }
}
