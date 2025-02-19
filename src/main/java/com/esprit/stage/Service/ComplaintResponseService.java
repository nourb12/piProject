package com.esprit.stage.Service;

import com.esprit.stage.Entities.ComplaintResponse;
import com.esprit.stage.Entities.Complaint;
import com.esprit.stage.Repository.ComplaintResponseRepository;
import com.esprit.stage.Repository.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintResponseService {

    private final ComplaintResponseRepository complaintResponseRepository;
    private final ComplaintRepository complaintRepository;

    public ComplaintResponseService(ComplaintResponseRepository complaintResponseRepository, ComplaintRepository complaintRepository) {
        this.complaintResponseRepository = complaintResponseRepository;
        this.complaintRepository = complaintRepository;
    }

    public ComplaintResponse createComplaintResponse(ComplaintResponse response, Integer complaintId) {
        Optional<Complaint> complaint = complaintRepository.findById(complaintId);
        if (complaint.isPresent()) {
            response.setComplaint(complaint.get());
            return complaintResponseRepository.save(response);
        } else {
            throw new RuntimeException("Complaint not found with ID: " + complaintId);
        }
    }

    public List<ComplaintResponse> getAllComplaintResponses() {
        return complaintResponseRepository.findAll();
    }

    public ComplaintResponse getComplaintResponseById(Integer id) {
        return complaintResponseRepository.findById(id).orElseThrow(() -> new RuntimeException("ComplaintResponse not found"));
    }

    public ComplaintResponse updateComplaintResponse(Integer id, ComplaintResponse updatedResponse) {
        ComplaintResponse existingResponse = getComplaintResponseById(id);
        existingResponse.setMessage(updatedResponse.getMessage());
        existingResponse.setResponseDate(updatedResponse.getResponseDate());
        return complaintResponseRepository.save(existingResponse);
    }

    public void deleteComplaintResponse(Integer id) {
        complaintResponseRepository.deleteById(id);
    }
}
