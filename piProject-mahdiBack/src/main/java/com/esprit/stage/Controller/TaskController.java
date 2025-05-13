package com.esprit.stage.Controller;

import com.esprit.stage.Entities.Task;
import com.esprit.stage.Entities.TaskStatus;
import com.esprit.stage.Repository.TaskRepository;
import com.esprit.stage.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id)
                .map(task -> ResponseEntity.ok(task))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping("/project/{projectId}")
    public Task createTask(@PathVariable Long projectId, @RequestBody Task task) {
        return taskService.createTask(projectId, task);
    }

    @PutMapping("/project/{projectId}/tasks/{taskId}")
    public Task updateTask(@PathVariable Long projectId, @PathVariable Long taskId, @RequestBody Task updatedTask) {
        Task existingTask = taskRepository.findByProjectIdAndId(projectId, taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setStatus(updatedTask.getStatus()); // ✅ KEY LINE// if needed

        return taskService.updateTask(projectId,taskId,updatedTask); // ✅ Don't forget this
    }

    @DeleteMapping("/project/{projectId}/tasks/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long projectId, @PathVariable Long taskId) {
        boolean isDeleted = taskService.deleteTask(projectId, taskId);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Task>> getTasksByProject(@PathVariable Long projectId) {
        List<Task> tasks = taskService.getTasksByProject(projectId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/project/{projectId}/tasks/{taskId}")
    public ResponseEntity<Task> getTaskByProjectAndId(@PathVariable Long projectId, @PathVariable Long taskId) {
        return taskService.getTaskByProjectAndId(projectId, taskId)
                .map(task -> ResponseEntity.ok(task))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
    @PutMapping("/{taskId}/status")
    public ResponseEntity<Map<String, Object>> updateTaskStatus(@PathVariable Long taskId, @RequestParam TaskStatus status) {
        Task updatedTask = taskService.updateTaskStatus(taskId, status);

        long timeSpent = updatedTask.getTimeSpent();

        Map<String, Object> response = new HashMap<>();
        response.put("task", updatedTask);
        response.put("timeSpent", timeSpent);

        return ResponseEntity.ok(response);
    }

}
