package com.esprit.stage.Entities;

public class InterviewRequest {
    private Interview interview;
    private Long studentId;
    private Long hrId;

    // Getters and Setters
    public Interview getInterview() {
        return interview;
    }

    public void setInterview(Interview interview) {
        this.interview = interview;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getHrId() {
        return hrId;
    }

    public void setHrId(Long hrId) {
        this.hrId = hrId;
    }
}
