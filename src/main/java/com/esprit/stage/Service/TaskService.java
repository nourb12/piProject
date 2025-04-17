package com.esprit.stage.Service;

import com.esprit.stage.Entities.Task;
import com.esprit.stage.Entities.TaskStatus;
import com.esprit.stage.Error.ResourceNotFoundException;
import com.esprit.stage.Repository.ProjectRepository;
import com.esprit.stage.Repository.TaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectService projectService;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Long projectId, Task task) {
        return projectRepository.findById(projectId).map(project -> {
            task.setProject(project);
            if (task.getStatus() == null) {
                task.setStatus(TaskStatus.PLANNED);
            }

            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Project not found with id " + projectId));
    }



    public Task updateTask(Long projectId, Long taskId, Task updatedTask) {
        Optional<Task> existingTaskOptional = taskRepository.findByProjectIdAndId(projectId, taskId);

        if (existingTaskOptional.isPresent()) {
            Task existingTask = existingTaskOptional.get();
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            return taskRepository.save(existingTask);
        } else {
            throw new RuntimeException("Task not found with id " + taskId + " for project " + projectId);
        }
    }

    public boolean deleteTask(Long projectId, Long taskId) {
        Optional<Task> task = taskRepository.findByProjectIdAndId(projectId, taskId);
        if (task.isPresent()) {
            taskRepository.delete(task.get());
            return true;
        }
        return false;
    }

    public List<Task> getTasksByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    public Optional<Task> getTaskByProjectAndId(Long projectId, Long taskId) {
        return taskRepository.findByProjectIdAndId(projectId, taskId);
    }

    @Transactional
    public Task updateTaskStatus(Long taskId, TaskStatus status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (status == TaskStatus.COMPLETED) {
            task.setCompletedTime(LocalDateTime.now()); // Set completion time
        } else if (task.getStartTime() == null) {
            task.setStartTime(LocalDateTime.now()); // If first move, set start time
        }

        task.setStatus(status);
        taskRepository.save(task);
        return task;
    }



}
