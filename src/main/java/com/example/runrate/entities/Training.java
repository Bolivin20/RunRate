package com.example.runrate.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Training {
    @Id
    @GeneratedValue
    private Long id;
    private LocalDate trainingDate;
    private int hours;
    private int minutes;
    private double distance;
    private int elevation;
    private double trainingPoints;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    private User user;

    public Training(User user, int hours, int minutes, double distance, int elevation, double trainingPoints) {
        this.user = user;
        this.trainingDate = LocalDate.now();
        this.hours = hours;
        this.minutes = minutes;
        this.distance = distance;
        this.elevation = elevation;
        this.trainingPoints = trainingPoints;
    }

}
