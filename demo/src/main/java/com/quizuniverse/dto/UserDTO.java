package com.quizuniverse.dto;

import com.quizuniverse.entity.User;

public class UserDTO {
    private String id;
    private String name;
    private String email;
    private String role;
    private String tenantId;

    public UserDTO(User user) {
        this.id = String.valueOf(user.getUserID());
        this.name = user.getFullName() != null ? user.getFullName() : user.getUsername();
        this.email = user.getEmail();
        this.role = "TEACHER"; // hoặc bạn lấy từ DB nếu có cột role
        this.tenantId = ""; // nếu chưa có tính năng tenant
    }

    // Getters và setters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getTenantId() { return tenantId; }

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

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    
}
