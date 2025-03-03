package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Document;
import com.esprit.stage.Service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(@RequestParam("file") MultipartFile file,
                                                   @RequestParam("description") String description,
                                                   @RequestParam("isEndOfInternshipCertificate") boolean isEndOfInternshipCertificate) {
        try {
            Document document = documentService.uploadDocument(file, description, isEndOfInternshipCertificate);
            return ResponseEntity.ok(document);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/download/{documentId}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Long documentId) {
        Document document = documentService.downloadDocument(documentId);
        return ResponseEntity.ok()
                .header("Content-Type", document.getType())
                .header("Content-Disposition", "attachment; filename=\"" + document.getName() + "\"")
                .body(document.getData());
    }
}
