package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Project;
import com.esprit.stage.Entities.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    long countByDeadlineAlertTrue();
    List<Project> findByStatusAndEndDateBefore(ProjectStatus status, LocalDate date);
    List<Project> findByArchivedFalse();
    List<Project> findByArchivedTrue();
}
