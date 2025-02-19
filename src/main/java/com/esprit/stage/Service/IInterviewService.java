package com.esprit.stage.Service;

import com.esprit.stage.Entities.Interview;

import java.util.List;

public interface IInterviewService {
    public List<Interview> getAllInterviews();
    public Interview getInterviewById(long id);
    public Interview addInterview(Interview interview,Long studentId, Long hrId);
    public Interview updateInterview(Interview interview, long id);
    public void deleteInterview(long id);
}
