package com.esprit.stage.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Float noteGlobale;
    private Float qualiteEncadrement;
    private Float ambianceTravail;
    private String chargeTravail;
    private String commentaire;
    private String detail;
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Float getNoteGlobale() {
        return noteGlobale;
    }

    public void setNoteGlobale(Float noteGlobale) {
        this.noteGlobale = noteGlobale;
    }

    public Float getQualiteEncadrement() {
        return qualiteEncadrement;
    }

    public void setQualiteEncadrement(Float qualiteEncadrement) {
        this.qualiteEncadrement = qualiteEncadrement;
    }

    public Float getAmbianceTravail() {
        return ambianceTravail;
    }

    public void setAmbianceTravail(Float ambianceTravail) {
        this.ambianceTravail = ambianceTravail;
    }

    public String getChargeTravail() {
        return chargeTravail;
    }

    public void setChargeTravail(String chargeTravail) {
        this.chargeTravail = chargeTravail;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

}