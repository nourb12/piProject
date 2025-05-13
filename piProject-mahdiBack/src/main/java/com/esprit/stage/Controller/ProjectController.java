package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Project;
import com.esprit.stage.Repository.ProjectRepository;
import com.esprit.stage.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public Optional<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project updatedProject) {
        return projectService.updateProject(id, updatedProject);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }
    @PutMapping("/{projectId}/status")
    public ResponseEntity<Project> updateProjectStatus(@PathVariable Long projectId, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        Project project = projectService.updateProjectStatus(projectId, status);
        return ResponseEntity.ok(project);
    }
    @PutMapping("/{projectId}/update-progress")
    public ResponseEntity<Float> updateProjectProgress(@PathVariable Long projectId) {
        float progress = projectService.updateProjectProgress(projectId);
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/alerts/count")
    public ResponseEntity<Long> getProjectDeadlineAlertsCount() {
        long count = projectService.countProjectsWithDeadlineAlert();
        return ResponseEntity.ok(count);
    }
    @GetMapping("/project-progress")
    public ResponseEntity<List<Map<String, Object>>> getProjectProgressStats() {
        return ResponseEntity.ok(projectService.getProjectProgressStats());
    }

    @GetMapping("/active")
    public List<Project> getActiveProjects() {
        return projectRepository.findByArchivedFalse();
    }

    @GetMapping("/archived")
    public List<Project> getArchivedProjects() {
        return projectRepository.findByArchivedTrue();
    }


}
