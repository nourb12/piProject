package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByDescription(String description);
}
