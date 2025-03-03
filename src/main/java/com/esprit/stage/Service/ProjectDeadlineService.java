package com.esprit.stage.Service;

import com.esprit.stage.Entities.Project;
import com.esprit.stage.Repository.ProjectRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@Service
public class ProjectDeadlineService {

    private final ProjectRepository projectRepository;

    public ProjectDeadlineService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }
}

    // Method that checks project deadlines and sets the alert flag


