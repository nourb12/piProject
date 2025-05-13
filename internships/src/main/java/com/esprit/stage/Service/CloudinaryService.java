package com.esprit.stage.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    // ✅ Pour upload d'images (multipart depuis Angular)
    public List<String> uploadImages(MultipartFile[] files) throws IOException {
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            Map<String, String> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String imageUrl = uploadResult.get("url");
            imageUrls.add(imageUrl);
        }
        return imageUrls;
    }

    public String uploadFile(File file) {
        try {
            Map uploadResult = cloudinary.uploader().upload(file, ObjectUtils.asMap(
                    "resource_type", "raw", // 📂 pour les fichiers (PDF, ZIP, etc.)
                    "public_id", "pdfs/" + UUID.randomUUID(), // facultatif : chemin personnalisé
                    "overwrite", true
            ));
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            throw new RuntimeException("❌ Erreur lors de l’upload du fichier PDF", e);
        }
    }


    // ✅ Pour supprimer des fichiers (PDF ou image)
    public void deleteImages(List<String> imageUrls) throws IOException {
        for (String imageUrl : imageUrls) {
            String publicId = extractPublicId(imageUrl);
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        }
    }

    private String extractPublicId(String imageUrl) {
        String[] urlParts = imageUrl.split("/");
        String publicIdWithVersion = urlParts[urlParts.length - 2] + "/" + urlParts[urlParts.length - 1].split("\\.")[0];
        return publicIdWithVersion;
    }
}
