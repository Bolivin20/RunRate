package com.example.runrate.controllers;

import com.example.runrate.entities.User;
import com.example.runrate.repositories.ProfileDetailRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("user/profile")
public class ProfileController {
    private ProfileDetailRepo profileDetailRepo;

    public ProfileController(ProfileDetailRepo profileDetailRepo) {
        this.profileDetailRepo = profileDetailRepo;
    }

    @GetMapping("/lvl")
    public ResponseEntity<?> checkIfDetrained() {
         User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
         double rate = computeRateDetrained(user.getId());
        if(rate>0) {
            if(rate > 9)
                rate = 9.9f;
            rate = 1 - (rate * 0.1f);
            profileDetailRepo.updatePoints(user.getId(), rate);

        }
        double points = profileDetailRepo.findPointsByIdUser(user.getId());
        points = Math.round(points * 100.0) / 100.0;
        return ResponseEntity.ok(points);
    }

    private double computeRateDetrained(Long idUser) {
        Date updatedAt = profileDetailRepo.findUpdatedAtByIdUser(idUser);
        Date currentDate = new Date();
        return Math.round(((currentDate.getTime() - updatedAt.getTime())/86400000) / 15);
    }

}
