package com.quizuniverse.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quizuniverse.dto.ProfileSetupRequest;
import com.quizuniverse.entity.Major;
import com.quizuniverse.entity.University;
import com.quizuniverse.entity.User;
import com.quizuniverse.repository.MajorRepository;
import com.quizuniverse.repository.UniversityRepository;
import com.quizuniverse.repository.UserRepository;

@Service
public class ProfileService {
    private final UserRepository userRepo;
    private final UniversityRepository uniRepo;
    private final MajorRepository majorRepo;

    public ProfileService(UserRepository userRepo, UniversityRepository uniRepo, MajorRepository majorRepo) {
        this.userRepo = userRepo;
        this.uniRepo = uniRepo;
        this.majorRepo = majorRepo;
    }

    @Transactional
    public User updateProfile(UUID userId, ProfileSetupRequest req) {
        User user = userRepo.findByUserId(userId.toString())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // University
        if (req.getUniversity() != null) {
            University uni = uniRepo.findById(req.getUniversity())
                    .orElseThrow(() -> new RuntimeException("University not found"));
            user.setUniversity(uni);
        }

        // Major: ở đây mình giả sử frontend gửi majorId thay vì tên
        if (req.getMajor() != null) {
            try {
                Long majorId = Long.valueOf(req.getMajor());
                Major major = majorRepo.findById(majorId)
                        .orElseThrow(() -> new RuntimeException("Major not found"));
                user.setMajor(major);
            } catch (NumberFormatException e) {
                throw new RuntimeException("Invalid major id");
            }
        }

        user.setIntakeYear(req.getIntakeYear());
        return userRepo.save(user);
    }
}
