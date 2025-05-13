package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Interview;
import com.esprit.stage.Entities.StatusType;
import com.esprit.stage.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InterviewRepo extends JpaRepository<Interview, Long> {
  @Query("SELECT i FROM Interview i WHERE i.student = :user OR i.hr = :user")
  List<Interview> findByUser(@Param("user") User user);

  @Query("SELECT i FROM Interview i WHERE (i.student = :user OR i.hr = :user) AND i.status = :status")
  List<Interview> findCompletedByUser(@Param("user") User user, @Param("status") StatusType status);

  List<Interview> findByStatus(StatusType status);


}
