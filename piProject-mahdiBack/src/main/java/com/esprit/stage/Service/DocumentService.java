package com.esprit.stage.Service;

import com.esprit.stage.Entities.Document;
import com.esprit.stage.Repository.DocumentRepository;
import com.itextpdf.text.Element;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;

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
