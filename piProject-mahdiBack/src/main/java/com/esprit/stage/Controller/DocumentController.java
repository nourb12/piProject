package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Document;
import com.esprit.stage.Service.DocumentService;
import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/projects/documents")
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

    @GetMapping("/download/end-of-internship-certificate")
    public ResponseEntity<byte[]> downloadEndOfInternshipCertificate(
            @RequestParam("internName") String internName,
            @RequestParam("supervisorName") String supervisorName,
            @RequestParam("companyName") String companyName,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) throws DocumentException, IOException {

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        com.itextpdf.text.Document pdfDocument = new com.itextpdf.text.Document();

        PdfWriter.getInstance(pdfDocument, byteArrayOutputStream);
        pdfDocument.open();

        // Set up fonts and styles
        Font normalFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);
        Font boldFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.BLACK);
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));

        // Title
        Paragraph title = new Paragraph("End of Internship Certificate", new Font(Font.FontFamily.HELVETICA, 24, Font.BOLD, BaseColor.BLUE));
        title.setAlignment(Element.ALIGN_CENTER);
        pdfDocument.add(title);
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
    // Add space below the title

        // Introductory paragraph with bold intern details
        Paragraph intro = new Paragraph("This is to certify that the intern ");
        intro.add(new Chunk(internName, boldFont));
        intro.add (" has successfully completed their internship at ");
        intro.add(new Chunk(companyName, boldFont));  // Company name in bold
        intro.add(" under the supervision of Mr/Mrs ");
        intro.add(new Chunk(supervisorName, boldFont));  // Supervisor name in bold
        intro.add(". The internship period commenced on ");
        intro.add(new Chunk(startDate, boldFont));  // Start date in bold
        intro.add(" and concluded on ");
        intro.add(new Chunk(endDate, boldFont));  // End date in bold
        intro.add(". During this time, the intern demonstrated outstanding performance and contributed significantly to the company. ");
        intro.add("We hereby acknowledge the hard work and dedication exhibited by the intern during their tenure.");
        intro.setLeading(30f);
        intro.setAlignment(Element.ALIGN_JUSTIFIED);
        pdfDocument.add(intro);

        // Add extra space
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));


        // Footer with additional information and more space
        pdfDocument.add(new Paragraph("This certificate is issued as recognition of the intern's successful completion of the internship.", normalFont));

        // Add extra space
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));
        pdfDocument.add(new Paragraph(" "));


        // Add signature (aligned right)
        Paragraph signature = new Paragraph("Signature: ____________________________", normalFont);
        signature.setAlignment(Element.ALIGN_RIGHT);
        pdfDocument.add(signature);

        // Close the document
        pdfDocument.close();

        byte[] pdfData = byteArrayOutputStream.toByteArray();

        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=\"EndOfInternshipCertificate.pdf\"")
                .body(pdfData);
    }
}
