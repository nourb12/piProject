package com.esprit.stage.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate; // Assurez-vous d'importer LocalDate

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Result  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateTaken;

    private int score;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    // Getters, Setters et Constructeurs
}
