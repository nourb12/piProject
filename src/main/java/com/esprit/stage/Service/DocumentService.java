package com.esprit.stage.Service;

import com.esprit.stage.Entities.Document;
import com.esprit.stage.Repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    public Document uploadDocument(MultipartFile file, String description, boolean isEndOfInternshipCertificate) throws IOException {
        Document document = new Document();
        document.setName(file.getOriginalFilename());
        document.setType(file.getContentType());
        document.setData(file.getBytes());
        document.setDescription(description);
        document.setUploadTime(LocalDateTime.now());
        document.setEndOfInternshipCertificate(isEndOfInternshipCertificate);

        return documentRepository.save(document);
    }

    public Document downloadDocument(Long documentId) {
        return documentRepository.findById(documentId).orElseThrow(() -> new RuntimeException("Document not found"));
    }
}
