package com.esprit.stage.Service;

import com.esprit.stage.Entities.Project;
import com.esprit.stage.Entities.ProjectStatus;
import com.esprit.stage.Entities.Task;
import com.esprit.stage.Entities.TaskStatus;
import com.esprit.stage.Error.ResourceNotFoundException;
import com.esprit.stage.Repository.ProjectRepository;
import com.esprit.stage.Repository.TaskRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TaskRepository taskRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project updatedProject) {
        return projectRepository.findById(id).map(project -> {
            project.setTitle(updatedProject.getTitle());
            project.setDescription(updatedProject.getDescription());
            project.setStartDate(updatedProject.getStartDate());
            project.setEndDate(updatedProject.getEndDate());
            project.setStatus(updatedProject.getStatus());
            return projectRepository.save(project);
        }).orElseThrow(() -> new RuntimeException("Project not found with id " + id));
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Transactional
    public float updateProjectProgress(Long projectId) {
        long totalTasks = taskRepository.countByProjectId(projectId);
        if (totalTasks == 0) return 0.0f;

        long completedTasks = taskRepository.countByProjectIdAndStatus(projectId, TaskStatus.COMPLETED);
        float progress = (completedTasks * 100.0f) / totalTasks;

        // Mise à jour du projet
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();
            project.setProgress(progress);
            projectRepository.save(project);
        }

        return progress;
    }

    @Transactional
    public Project updateProjectStatus(Long projectId, String status) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        project.setStatus(ProjectStatus.valueOf(status));
        return projectRepository.save(project);
    }

    @Transactional
    public void checkProjectDeadlines() {
        // Define the logger
        Logger logger = LoggerFactory.getLogger(this.getClass());

        LocalDate today = LocalDate.now();
        logger.info("Checking project deadlines for today: {}", today);

        List<Project> projects = projectRepository.findAll();
        for (Project project : projects) {
            if (project.getEndDate() != null) {
                long daysRemaining = ChronoUnit.DAYS.between(today, project.getEndDate());

                // Prevent negative days for overdue projects
                if (daysRemaining < 0) {
                    logger.info("project exceeded deadline"); // Or you can set to any value you find appropriate, e.g., -1 or a custom message
                }

                if (daysRemaining <= 3 && daysRemaining >= 0) {
                    project.setDeadlineAlert(true);
                    logger.info("Project '" + project.getTitle() + "' deadline approaching: " + daysRemaining + " days remaining");
                    projectRepository.save(project);
                }
            }
        }
    }

    // Schedule the deadline check to run every minute
    @Scheduled(cron = "*/10 * * * * ?")
    public void scheduleProjectDeadlineCheck () {
        checkProjectDeadlines();  // Call the method to check deadlines
    }

    public long countProjectsWithDeadlineAlert() {
        return projectRepository.countByDeadlineAlertTrue();
    }

}


