package com.esprit.stage.Service;

import com.esprit.stage.Entities.Application;
import com.esprit.stage.Entities.InternshipOffer;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.pdf.draw.LineSeparator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;

@Service
@RequiredArgsConstructor
public class PdfGeneratorService {

    public String generateCvPdf(Application application, String outputDirectory) {
        try {
            File dir = new File(outputDirectory);
            if (!dir.exists() && !dir.mkdirs()) {
                throw new RuntimeException("Failed to create output directory.");
            }

            String fileName = "cv-" + application.getFullName().replace(" ", "_") + ".pdf";
            String filePath = outputDirectory + fileName;

            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, new FileOutputStream(filePath));
            document.open();

            Font cvTitleFont = new Font(Font.HELVETICA, 16, Font.BOLD, new Color(0, 102, 204));
            Paragraph cvTitle = new Paragraph("Curriculum Vitae for Internship Candidate", cvTitleFont);
            cvTitle.setAlignment(Element.ALIGN_CENTER);
            cvTitle.setSpacingAfter(20);
            document.add(cvTitle);

            PdfPTable layout = new PdfPTable(2);
            layout.setWidthPercentage(100);
            layout.setWidths(new float[]{2, 5});

            PdfPCell sidebar = new PdfPCell();
            sidebar.setBackgroundColor(new Color(33, 37, 41));
            sidebar.setPadding(10);
            sidebar.setBorder(Rectangle.NO_BORDER);

            Font whiteBold = new Font(Font.HELVETICA, 10, Font.BOLD, Color.WHITE);
            Font whiteNormal = new Font(Font.HELVETICA, 9, Font.NORMAL, Color.WHITE);

            if (application.getPhotoUrl() != null) {
                try {
                    Image photo = Image.getInstance(application.getPhotoUrl());
                    photo.scaleAbsolute(100, 100);
                    photo.setAlignment(Image.ALIGN_CENTER);
                    sidebar.addElement(photo);
                } catch (Exception ignored) {}
            }

            sidebar.addElement(new Paragraph("\n" + application.getFullName(), whiteBold));
            sidebar.addElement(new Paragraph("Email: " + application.getEmail(), whiteNormal));
            sidebar.addElement(new Paragraph("Phone: " + application.getPhone(), whiteNormal));
            sidebar.addElement(new Paragraph("Location: " + application.getCity(), whiteNormal));
            sidebar.addElement(new Paragraph(" ", whiteNormal));

            sidebar.addElement(new Paragraph("LinkedIn:", whiteBold));
            sidebar.addElement(new Paragraph(application.getLinkedinProfile(), whiteNormal));
            sidebar.addElement(new Paragraph(" ", whiteNormal));
            sidebar.addElement(new Paragraph("Portfolio:", whiteBold));
            sidebar.addElement(new Paragraph(application.getPortfolio(), whiteNormal));

            if (application.getLinkedinProfile() != null) {
                Image qrCode = generateQrCodeImage(application.getLinkedinProfile(), 100, 100);
                if (qrCode != null) {
                    qrCode.setAlignment(Image.ALIGN_CENTER);
                    sidebar.addElement(new Paragraph(" "));
                    sidebar.addElement(qrCode);
                }
            }

            layout.addCell(sidebar);

            PdfPCell content = new PdfPCell();
            content.setBorder(Rectangle.NO_BORDER);
            content.setPadding(10);

            Font sectionTitle = new Font(Font.HELVETICA, 13, Font.BOLD, new Color(0, 102, 204));
            Font normalFont = new Font(Font.HELVETICA, 11);

            content.addElement(new Paragraph("Career Objective:", sectionTitle));
            content.addElement(new Paragraph(application.getCareerObjective(), normalFont));
            LineSeparator sep1 = new LineSeparator();
            sep1.setLineColor(new Color(0, 102, 204));
            content.addElement(new Chunk(sep1));
            content.addElement(new Paragraph(" "));

            content.addElement(new Paragraph("Technical Profile:", sectionTitle));
            content.addElement(new Paragraph(application.getTechnologyProfile(), normalFont));
            LineSeparator sep2 = new LineSeparator();
            sep2.setLineColor(new Color(0, 102, 204));
            content.addElement(new Chunk(sep2));
            content.addElement(new Paragraph(" "));

            content.addElement(new Paragraph("Skills:", sectionTitle));
            content.addElement(new Paragraph(application.getSkills(), normalFont));
            LineSeparator sep3 = new LineSeparator();
            sep3.setLineColor(new Color(0, 102, 204));
            content.addElement(new Chunk(sep3));
            content.addElement(new Paragraph(" "));

            content.addElement(new Paragraph("Experience:", sectionTitle));
            content.addElement(new Paragraph(application.getExperiences(), normalFont));
            LineSeparator sep4 = new LineSeparator();
            sep4.setLineColor(new Color(0, 102, 204));
            content.addElement(new Chunk(sep4));
            content.addElement(new Paragraph(" "));

            Font dateFont = new Font(Font.HELVETICA, 10, Font.ITALIC, new Color(90, 90, 90));
            content.addElement(new Paragraph("📅 Applied on: " + application.getSubmissionDate().toLocalDate(), dateFont));

            layout.addCell(content);

            document.add(layout);
            document.close();

            return filePath;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String generateMotivationLetterPdf(Application application, InternshipOffer offer, String outputDirectory) {
        try {
            File dir = new File(outputDirectory);
            if (!dir.exists() && !dir.mkdirs()) {
                throw new RuntimeException("Failed to create output directory.");
            }

            String fileName = "motivation-" + application.getFullName().replace(" ", "_") + ".pdf";
            String filePath = outputDirectory + fileName;

            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, new FileOutputStream(filePath));
            document.open();

            Font headerFont = new Font(Font.HELVETICA, 16, Font.BOLD, new Color(0, 102, 204));
            Paragraph header = new Paragraph("📄 Cover Letter", headerFont);
            header.setAlignment(Element.ALIGN_CENTER);
            document.add(header);

            LineSeparator separator = new LineSeparator();
            separator.setLineColor(new Color(0, 102, 204));
            document.add(new Chunk(separator));
            document.add(new Paragraph(" "));

            Font contentFont = new Font(Font.HELVETICA, 12);

            String content = String.format(
                    "Dear Hiring Team,\n\n" +
                            "I am writing to express my interest in the %s internship position at %s.\n\n" +
                            "I am highly motivated and eager to apply the skills I have developed during my academic and personal projects. " +
                            "I believe that this opportunity will allow me to grow professionally while contributing meaningfully to your company.\n\n" +
                            "I am confident that my technical background and passion for learning make me a strong candidate for this role.\n\n" +
                            "I would welcome the opportunity to discuss how I can be an asset to your team.\n\n" +
                            "Thank you for considering my application.\n\n" +
                            "Sincerely,\n\n" +
                            "%s",
                    offer.getStageType().name().toLowerCase(),
                    offer.getCompanyName(),
                    application.getFullName()
            );

            document.add(new Paragraph(content, contentFont));
            document.close();

            return filePath;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Image generateQrCodeImage(String data, int width, int height) {
        try {
            BitMatrix bitMatrix = new MultiFormatWriter().encode(data, BarcodeFormat.QR_CODE, width, height);
            BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "png", baos);
            baos.flush();
            byte[] imageInByte = baos.toByteArray();
            baos.close();

            return Image.getInstance(imageInByte);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
