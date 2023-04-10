package com.example.runrate.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "profile_detail")
public class ProfileDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_detail", nullable = false)
    private Long idDetail;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;

    @Column(name = "id_training", nullable = false)
    private Long idTraining;

    @Column(name = "updated_at", nullable = false)
    private LocalDate updatedAt;

    @Column(name = "points", nullable = false)
    private double points;

    @OneToOne(mappedBy = "profileDetail", cascade = CascadeType.ALL)
    private Training training;

    public ProfileDetail() {
    }

    public ProfileDetail(User user, double points) {
        this.user = user;
        this.updatedAt = LocalDate.now();
        this.points = points;
    }

    public Long getIdDetail() {
        return idDetail;
    }

    public void setIdDetail(Long idDetail) {
        this.idDetail = idDetail;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getIdTraining() {
        return idTraining;
    }

    public void setIdTraining(Long idTraining) {
        this.idTraining = idTraining;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public double getPoints() {
        return points;
    }

    public void setPoints(double points) {
        this.points = points;
    }

    public Training getTraining() {
        return training;
    }

    public void setTraining(Training training) {
        this.training = training;
    }
}
