package com.esprit.stage.Service;

import com.esprit.stage.Entities.*;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private EmailService emailService;

    private final Logger logger = LoggerFactory.getLogger(ProjectService.class);

    public List<Project> getAllProjects() {
        logger.info(" Récupération de tous les projets.");
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        logger.info(" Recherche du projet avec ID: {}", id);
        return projectRepository.findById(id);
    }

    public Project createProject(Project project) {
        logger.info("Création d'un nouveau projet: {}", project.getTitle());
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project updatedProject) {
        logger.info(" Mise à jour du projet avec ID: {}", id);
        return projectRepository.findById(id).map(project -> {
            project.setTitle(updatedProject.getTitle());
            project.setDescription(updatedProject.getDescription());
            project.setStartDate(updatedProject.getStartDate());
            project.setEndDate(updatedProject.getEndDate());
            project.setStatus(updatedProject.getStatus());
            logger.info(" Projet '{}' mis à jour avec succès.", project.getTitle());
            return projectRepository.save(project);
        }).orElseThrow(() -> {
            logger.error(" Échec de mise à jour : Projet avec ID {} introuvable.", id);
            return new RuntimeException("Project not found with id " + id);
        });
    }

    public void deleteProject(Long id) {
        logger.info(" Suppression du projet avec ID: {}", id);
        projectRepository.deleteById(id);
    }

    @Transactional
    public float updateProjectProgress(Long projectId) {
        logger.info(" Mise à jour de la progression du projet ID: {}", projectId);
        long totalTasks = taskRepository.countByProjectId(projectId);
        if (totalTasks == 0) {
            logger.warn(" Aucune tâche trouvée pour le projet ID: {}. Progression mise à 0%.", projectId);
            return 0.0f;
        }

        long completedTasks = taskRepository.countByProjectIdAndStatus(projectId, TaskStatus.COMPLETED);
        float progress = (completedTasks * 100.0f) / totalTasks;

        projectRepository.findById(projectId).ifPresent(project -> {
            project.setProgress(progress);
            projectRepository.save(project);
            logger.info(" Progression mise à jour à {}% pour le projet '{}'", progress, project.getTitle());
        });

        return progress;
    }

    @Transactional
    public Project updateProjectStatus(Long projectId, String status) {
        logger.info(" Changement de statut du projet ID: {} en {}", projectId, status);
        return projectRepository.findById(projectId)
                .map(project -> {
                    project.setStatus(ProjectStatus.valueOf(status));
                    logger.info(" Statut du projet '{}' mis à jour en {}", project.getTitle(), status);
                    return projectRepository.save(project);
                })
                .orElseThrow(() -> {
                    logger.error(" Impossible de changer le statut : Projet avec ID {} introuvable.", projectId);
                    return new ResourceNotFoundException("Project not found");
                });
    }

    @Transactional
    public void checkProjectDeadlines() {
        LocalDate today = LocalDate.now();
        logger.info(" Vérification des deadlines des projets pour aujourd'hui: {}", today);

        List<Project> projects = projectRepository.findAll();

        for (Project project : projects) {
            if (project.getEndDate() != null) {
                long daysRemaining = ChronoUnit.DAYS.between(today, project.getEndDate());

                if (daysRemaining < 0) {
                    logger.warn(" Projet '{}' a dépassé la deadline.", project.getTitle());
                }

                if (daysRemaining <= 3 && daysRemaining >= 0) {
                    project.setDeadlineAlert(true);
                    projectRepository.save(project);

                    logger.info("️ Projet '{}' arrive à échéance dans {} jours.", project.getTitle(), daysRemaining);

                    // Filtrer uniquement les utilisateurs avec le rôle INTERN
                    List<User> interns = project.getUsers().stream()
                            .filter(user -> user.getRole().equals( role.INTERN))
                            .collect(Collectors.toList());

                    if (interns.isEmpty()) {
                        logger.warn("️ Aucun stagiaire (INTERN) assigné au projet '{}'. Aucun email envoyé.", project.getTitle());
                        continue;
                    }

                    // Envoyer un email aux stagiaires
                    for (User intern : interns) {
                        if (intern.getEmail() != null && !intern.getEmail().isEmpty()) {
                            sendDeadlineEmail(intern, project, daysRemaining);
                        } else {
                            logger.warn(" L'utilisateur '{}' (INTERN) n'a pas d'email associé.", intern.getUsername());
                        }
                    }
                }
            }
        }
    }

    private void sendDeadlineEmail(User intern, Project project, long daysRemaining) {
        String subject = " Alerte Deadline - Projet " + project.getTitle();

        String htmlContent = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; }" +
                ".container { max-width: 600px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }" +
                "h2 { color: #d9534f; }" +
                "p { font-size: 16px; }" +
                ".btn { display: inline-block; padding: 10px 20px; color: white; background-color: #0275d8; text-decoration: none; border-radius: 5px; font-weight: bold; }" +
                ".footer { margin-top: 20px; font-size: 14px; color: #777; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<h2>🔔 Deadline Alert for project:  " + project.getTitle() + "</h2>" +
                "<p>Hello <b>" + intern.getUsername() + "</b>,</p>" +
                "<p>The project <b>\"" + project.getTitle() + "\"</b> comes to an end in <b>" + daysRemaining + " days</b>.</p>" +
                "<p>Please take necessary precaution to complete the project in time.</p>" +
                "<a class='btn' href='http://localhost:4200/list-project/'>see project</a>" +
                "<p class='footer'>Sincerly,<br>Team Futurelink.</p>" +
                "</div>" +
                "</body>" +
                "</html>";

        try {
            emailService.sendHtmlEmail(intern.getEmail(), subject, htmlContent);
            logger.info(" Email HTML envoyé à '{}' ({}) pour le projet '{}'", intern.getUsername(), intern.getEmail(), project.getTitle());
        } catch (Exception e) {
            logger.error(" Échec de l'envoi de l'email HTML à '{}' ({}) : {}", intern.getUsername(), intern.getEmail(), e.getMessage());
        }
    }


   @Scheduled(cron = "*/30 * * * * ?")
   // @Scheduled(cron = "0 0 9 * * ?")
    public void scheduleProjectDeadlineCheck() {
        logger.info(" Exécution du job de vérification des deadlines des projets...");
        checkProjectDeadlines();
    }

    public long countProjectsWithDeadlineAlert() {
        long count = projectRepository.countByDeadlineAlertTrue();
        logger.info(" Nombre de projets avec alerte de deadline: {}", count);
        return count;
    }

    public List<Map<String, Object>> getProjectProgressStats() {
        return projectRepository.getProjectProgressStats();
    }

    @Scheduled(cron = "*/30 * * * * ?") // Exécuter tous les jours à minuit
    public void archiveCompletedProjects() {
        LocalDate threeDaysAgo = LocalDate.now().minusDays(3);
        List<Project> projectsToArchive = projectRepository.findByStatusAndEndDateBefore(ProjectStatus.COMPLETED, threeDaysAgo);

        for (Project project : projectsToArchive) {
            project.setArchived(true);
            projectRepository.save(project);
        }
    }


}
