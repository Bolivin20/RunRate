package com.example.runrate.entities;

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

    @OneToOne
    @JoinColumn(name = "id_detail")
    private ProfileDetail profileDetail;

}
