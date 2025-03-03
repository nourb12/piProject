package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Project;
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
    @GetMapping("/alerts/count")
    public ResponseEntity<Long> getProjectDeadlineAlertsCount() {
        long count = projectService.countProjectsWithDeadlineAlert();
        return ResponseEntity.ok(count);
    }


}
