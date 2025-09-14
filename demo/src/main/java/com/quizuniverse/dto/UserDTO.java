
package com.quizuniverse.dto;

import com.quizuniverse.entity.User;

// UserDTO.java
public class UserDTO {
    private String id;
    private String name;
    private String email;
    private String role;
    private String tenantId; // tạm thời trả về rỗng nếu chưa dùng

    public UserDTO(User user) {
        this.id = String.valueOf(user.getUserID());
        this.name = user.getFullName();
        this.email = user.getEmail();
        this.role = "TEACHER"; // Hoặc lấy từ 1 cột riêng nếu bạn có `Role`
        this.tenantId = "";    // Tuỳ bạn
    }

    // Getters và setters
}
