package com.example.runrate.controllers;

import com.example.runrate.entities.ProfileDetail;
import com.example.runrate.entities.Training;
import com.example.runrate.entities.User;
import com.example.runrate.repositories.ProfileDetailRepo;
import com.example.runrate.repositories.TrainingRepo;
import netscape.javascript.JSObject;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
@CrossOrigin
public class AdminController {

    private TrainingRepo trainingRepo;

    public AdminController(TrainingRepo trainingRepo) {
        this.trainingRepo = trainingRepo;
    }

    @GetMapping("/user/admin")
    public ResponseEntity<?> getRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        boolean isAdmin = authorities.contains(new SimpleGrantedAuthority("ADMIN"));
        JSONObject responseJson = new JSONObject();
        responseJson.put("admin", isAdmin);
        return ResponseEntity.ok(responseJson.toString());
    }

    @GetMapping("/user/admin/details")
    public ResponseEntity<?> getDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        List<Training> trainings = trainingRepo.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(trainings);
    }

}
