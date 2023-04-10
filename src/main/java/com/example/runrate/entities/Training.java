package com.example.runrate.entities;

import jakarta.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "training")
public class Training {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_training", nullable = false)
    private Long idTraining;

    @OneToOne
    @JoinColumn(name = "id_detail", nullable = false)
    private ProfileDetail profileDetail;

    @Column(name = "training_date", nullable = false)
    private LocalDate trainingDate;

    @Column(name = "hours", nullable = false)
    private int hours;

    @Column(name = "minutes", nullable = false)
    private int minutes;

    @Column(name = "distance", nullable = false)
    private float distance;

    @Column(name = "elevation", nullable = false)
    private int elevation;

    @Column(name = "training_points", nullable = false)
    private double trainingPoints;

    public Training() {
    }

    public Training(ProfileDetail profileDetail, int hours, int minutes, float distance, int elevation, double trainingPoints) {
        this.profileDetail = profileDetail;
        this.trainingDate = LocalDate.now();
        this.hours = hours;
        this.minutes = minutes;
        this.distance = distance;
        this.elevation = elevation;
        this.trainingPoints = trainingPoints;
    }

    public Long getIdTraining() {
        return idTraining;
    }

    public void setIdTraining(Long idTraining) {
        this.idTraining = idTraining;
    }

    public ProfileDetail getProfileDetail() {
        return profileDetail;
    }

    public void setProfileDetail(ProfileDetail profileDetail) {
        this.profileDetail = profileDetail;
    }

    public LocalDate getTrainingDate() {
        return trainingDate;
    }

    public void setTrainingDate(LocalDate trainingDate) {
        this.trainingDate = trainingDate;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    public int getElevation() {
        return elevation;
    }

    public void setElevation(int elevation) {
        this.elevation = elevation;
    }

    public double getTrainingPoints() {
        return trainingPoints;
    }

    public void setTrainingPoints(double trainingPoints) {
        this.trainingPoints = trainingPoints;
    }
}
