package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Project;
import com.esprit.stage.Entities.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    long countByDeadlineAlertTrue();
    List<Project> findByStatusAndEndDateBefore(ProjectStatus status, LocalDate date);
    List<Project> findByArchivedFalse();
    List<Project> findByArchivedTrue();
    @Query("SELECT NEW map(p.title AS title, p.progress AS progress) FROM Project p")
    List<Map<String, Object>> getProjectProgressStats();
}
