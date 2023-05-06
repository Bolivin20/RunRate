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
public class ProfileDetail {
    @Id
    @GeneratedValue
    private Long id;
    private LocalDate updatedAt;
    private double points;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    private User user;

    public ProfileDetail(User user) {
        this.user = user;
        this.updatedAt = LocalDate.now();
        this.points = 0;
    }
}
