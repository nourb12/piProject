package com.esprit.stage.Controller;



import com.esprit.stage.Entities.ComplaintResponse;
import com.esprit.stage.Service.ComplaintResponseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaint-responses")
public class ComplaintResponseController {

    private final ComplaintResponseService complaintResponseService;

    public ComplaintResponseController(ComplaintResponseService complaintResponseService) {
        this.complaintResponseService = complaintResponseService;
    }

    @PostMapping("/{complaintId}")
    public ComplaintResponse createResponse(@RequestBody ComplaintResponse response, @PathVariable Integer complaintId) {
        return complaintResponseService.createComplaintResponse(response, complaintId);
    }

    @GetMapping
    public List<ComplaintResponse> getAllResponses() {
        return complaintResponseService.getAllComplaintResponses();
    }

    @GetMapping("/{id}")
    public ComplaintResponse getResponseById(@PathVariable Integer id) {
        return complaintResponseService.getComplaintResponseById(id);
    }

    @PutMapping("/{id}")
    public ComplaintResponse updateResponse(@PathVariable Integer id, @RequestBody ComplaintResponse response) {
        return complaintResponseService.updateComplaintResponse(id, response);
    }

    @DeleteMapping("/{id}")
    public void deleteResponse(@PathVariable Integer id) {
        complaintResponseService.deleteComplaintResponse(id);
    }
}
