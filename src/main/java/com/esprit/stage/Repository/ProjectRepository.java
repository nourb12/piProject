package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    long countByDeadlineAlertTrue();

}
