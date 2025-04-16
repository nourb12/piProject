package com.esprit.stage.Repository;

import com.esprit.stage.Entities.Meeting;
import com.esprit.stage.Entities.MeetingCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
  @Query("SELECT m FROM Meeting m WHERE m.category = :category")
  List<Meeting> findByCategory(@Param("category") MeetingCategory category);
  List<Meeting> findAllByOrderByStartDateTimeAsc();
  List<Meeting> findAllByOrderByStartDateTimeDesc();
  List<Meeting> findByCategoryOrderByStartDateTimeAsc(MeetingCategory category);
  List<Meeting> findByCategoryOrderByStartDateTimeDesc(MeetingCategory category);

}
