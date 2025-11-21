package com.quizuniverse.dto;

import com.quizuniverse.entity.Major;
import com.quizuniverse.entity.University;
import com.quizuniverse.entity.User;

public class UserDTO {
    private String id;
    private String name;
    private String username;
    private String email;
    private String phone;
    private String role;
    private University university;
    private Major major;

    public UserDTO(User user) {
        this.id = String.valueOf(user.getUserId());
        this.name = user.getFullName() != null ? user.getFullName() : user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole(); // hoặc bạn lấy từ DB nếu có cột role
        this.university = user.getUniversity(); // nếu chưa có tính năng tenant
        this.username = user.getUsername();
        this.phone = user.getPhone();
        this.major = user.getMajor();
    }

    // Getters và setters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getUsername() {
        return username;
    }

    public String getPhone() {
        return phone;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = major;
    }
    

}
