package com.esprit.stage.Repository;

import com.esprit.stage.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
