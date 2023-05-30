package com.example.runrate.controllers;


import com.example.runrate.entities.Training;
import com.example.runrate.entities.User;
import com.example.runrate.repositories.ProfileDetailRepo;
import com.example.runrate.repositories.TrainingRepo;
import com.example.runrate.security.JwtAuthenticationFilter;
import com.example.runrate.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/user/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class TrainingController {

    private ProfileDetailRepo profileDetailRepo;
    private TrainingRepo trainingRepo;

    public TrainingController(ProfileDetailRepo profileDetailRepo, TrainingRepo trainingRepo) {
        this.profileDetailRepo = profileDetailRepo;
        this.trainingRepo = trainingRepo;
    }

    @GetMapping()
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getTrainings() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = (User) authentication.getPrincipal();
        List<Training> trainings = trainingRepo.findAllTrainingsByIdUser(user.getId());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(trainings);
    }


    @PostMapping("/add")
    public ResponseEntity<?> addTraining(@RequestBody TrainingRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = (User) authentication.getPrincipal();
        try {
            double points = computePoints(request.hours, request.minutes, request.distance, request.elevation);
            trainingRepo.save(new Training(user, request.hours, request.minutes, request.distance, request.elevation, points));
            profileDetailRepo.addPoints(user.getId(), points);
            profileDetailRepo.updateUpdatedAt(user.getId(), new Date());
            return ResponseEntity.ok().build();
        } catch (DataAccessException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTraining(@PathVariable("id") Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            trainingRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (DataAccessException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public record TrainingRequest(int hours, int minutes, double distance, int elevation) {
    }

    private double computePoints(int hours, int minutes, double distance, int up) {
        double pace = (double) (hours * 60 + minutes) / distance;
        double paceRate = 1.0;
        if(pace < 4.0)
            paceRate=4.0;
        else if(pace >= 4.0 && pace < 5.0)
            paceRate=3.0;
        else if(pace >= 5.0 && pace < 6.0)
            paceRate=2.0;
        else if(pace >= 6.0 && pace < 7.0)
            paceRate=1.5;
        else if(pace >= 7.0 && pace < 8.0)
            paceRate=1;
        else if(pace >= 8.0 && pace < 9.0)
            paceRate=0.8;
        else if(pace >= 9.0 && pace < 10.0)
            paceRate=0.6;
        else if(pace >= 10.0 && pace < 11.0)
            paceRate=0.4;
        else if(pace >= 11.0 && pace < 12.0)
            paceRate=0.2;
        else if(pace >= 12.0)
            paceRate=0.1;

        double points = (double) (paceRate * distance + up * 0.01);
        return points;
    }
}



