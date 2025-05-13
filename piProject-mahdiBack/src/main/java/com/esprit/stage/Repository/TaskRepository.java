package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Task;
import com.esprit.stage.Entities.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
    Optional<Task> findByProjectIdAndId(Long projectId, Long taskId);
    long countByProjectIdAndStatus(Long projectId, TaskStatus status); // Tâches terminées
    long countByProjectId(Long projectId); // Nombre total de tâches
}





