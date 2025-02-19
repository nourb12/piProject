package com.esprit.stage.Service;

import com.esprit.stage.Entities.Complaint;
import com.esprit.stage.Repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public Optional<Complaint> getComplaintById(Integer id) {
        return complaintRepository.findById(id);
    }

    public Complaint createComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    public Complaint updateComplaint(Integer id, Complaint complaintDetails) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setSubject(complaintDetails.getSubject());
        complaint.setDescription(complaintDetails.getDescription());
        complaint.setSubmissionDate(complaintDetails.getSubmissionDate());
        complaint.setStatus(complaintDetails.getStatus());

        return complaintRepository.save(complaint);
    }

    public void deleteComplaint(Integer id) {
        complaintRepository.deleteById(id);
    }
}
