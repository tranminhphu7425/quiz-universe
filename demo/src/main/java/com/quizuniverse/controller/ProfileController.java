package com.quizuniverse.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizuniverse.dto.ProfileSetupRequest;
import com.quizuniverse.entity.Major;
import com.quizuniverse.entity.University;
import com.quizuniverse.entity.User;
import com.quizuniverse.security.JwtUtil;
import com.quizuniverse.service.MajorService;
import com.quizuniverse.service.ProfileService;
import com.quizuniverse.service.UniversityService;




@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://127.0.0.1:5173", allowCredentials = "true")
public class ProfileController {
    private final UniversityService universityService;
    private final MajorService majorService;
    private final ProfileService profileService;

    public ProfileController(UniversityService universityService, MajorService majorService, ProfileService profileService) {
        this.universityService = universityService;
        this.majorService = majorService;
        this.profileService = profileService;
    }

    @GetMapping("/universities")
    public List<University> getUniversities() {
        return universityService.getAll();
    }

    @GetMapping("/majors")
    public List<Major> getMajors() {
        return majorService.getAll();
    }

     @PostMapping("/profile/setup")
    public User setupProfile(@RequestBody ProfileSetupRequest req,
                             @RequestHeader("Authorization") String authHeader) {
        // Lấy userId từ token (ở đây mình giả sử bạn đã có JWT Filter gán userId vào SecurityContext)
        Long userId = JwtUtil.getUserIdFromHeader(authHeader); // bạn viết JwtUtil riêng
        System.out.println(">>> userId from token = " + userId);
        return profileService.updateProfile(userId, req);
    }


    @PostMapping("/profile/update")
    public String updateProfile(@RequestBody ProfileSetupRequest req,
                             @RequestHeader("Authorization") String authHeader) {
        


                                return "A";
    }
    



}
