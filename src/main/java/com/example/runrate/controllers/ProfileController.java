package com.example.runrate.controllers;

import com.example.runrate.entities.User;
import com.example.runrate.repositories.ProfileDetailRepo;
import com.example.runrate.repositories.UserRepo;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("user/profile")
@CrossOrigin
public class ProfileController {
    private ProfileDetailRepo profileDetailRepo;
    private UserRepo userRepo;

    public ProfileController(ProfileDetailRepo profileDetailRepo, UserRepo userRepo) {
        this.profileDetailRepo = profileDetailRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/points")
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
        JSONObject responseJson = new JSONObject();
        responseJson.put("points", points);

        return ResponseEntity.ok(responseJson.toString());
    }

    private double computeRateDetrained(Long idUser) {
        Date updatedAt = profileDetailRepo.findUpdatedAtByIdUser(idUser);
        Date currentDate = new Date();
        return Math.round(((currentDate.getTime() - updatedAt.getTime())/86400000) / 15);
    }

    @GetMapping("/name")
    public ResponseEntity<?> getName() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String name = userRepo.findNameById(user.getId());
        JSONObject responseJson = new JSONObject();
        responseJson.put("name", name);

        return ResponseEntity.ok(responseJson.toString());
    }

}
