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
        Optional<Complaint> complaintOptional = complaintRepository.findById(complaintId);

        if (complaintOptional.isPresent()) {
            Complaint complaint = complaintOptional.get();

            // Associer la réponse à la plainte
            response.setComplaint(complaint);

            // Sauvegarder la réponse
            ComplaintResponse savedResponse = complaintResponseRepository.save(response);

            // ✅ Mettre à jour le statut de la plainte
            complaint.setStatus("Treated");
            complaintRepository.save(complaint);

            return savedResponse;
        } else {
            throw new RuntimeException("Complaint not found with ID: " + complaintId);
        }
    }

    public List<ComplaintResponse> getAllComplaintResponses() {
        return complaintResponseRepository.findAll();
    }

    public ComplaintResponse getComplaintResponseById(Integer id) {
        return complaintResponseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ComplaintResponse not found with ID: " + id));
    }

    public ComplaintResponse updateComplaintResponse(Integer id, ComplaintResponse updatedResponse) {
        ComplaintResponse existingResponse = getComplaintResponseById(id);

        existingResponse.setMessage(updatedResponse.getMessage());
        existingResponse.setResponseDate(updatedResponse.getResponseDate());

        return complaintResponseRepository.save(existingResponse);
    }

    public void deleteComplaintResponse(Integer id) {
        // Vérifier si la réponse existe avant suppression
        if (!complaintResponseRepository.existsById(id)) {
            throw new RuntimeException("ComplaintResponse not found with ID: " + id);
        }

        complaintResponseRepository.deleteById(id);
    }
}
