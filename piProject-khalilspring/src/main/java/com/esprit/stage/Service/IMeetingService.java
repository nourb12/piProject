package com.esprit.stage.Service;

import com.esprit.stage.Entities.Interview;
import com.esprit.stage.Entities.Meeting;
import com.esprit.stage.Entities.MeetingCategory;

import java.util.List;

public interface IMeetingService {
  public List<Meeting> getAllMeetings();
  public Meeting getMeetingById(long id);
  public Meeting addMeeting(Meeting meeting,Long supervisorId, List<Long> internId);
  public Meeting updateMeeting(Meeting meeting, long id, Long supervisorId, List<Long> internIds);
  public void deleteMeeting(long id);
  public List<Meeting> getMeetingsByCategory(MeetingCategory category);
  List<Meeting> getMeetingsSortedByStartDateTime(boolean ascending);
  public List<Meeting> getMeetingsByCategoryAndSortedByDate(MeetingCategory category, boolean ascending);


}
