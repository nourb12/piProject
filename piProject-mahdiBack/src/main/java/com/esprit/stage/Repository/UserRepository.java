package com.esprit.stage.Repository;
import com.esprit.stage.Entities.User;
import com.esprit.stage.Entities.role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Fetch emails of users assigned to a specific project by role
    @Query("SELECT u.email FROM User u JOIN u.projects p WHERE p.id = :projectId AND u.Role = :role")
    List<String> findEmailsByProjectAndRole(Long projectId, role role);
}

