// LoginResponse.java

package com.quizuniverse.dto;


public class LoginResponse {
    private String token; // JWT hoặc access token tuỳ bạn
    private UserDTO user;

    public LoginResponse(String token, UserDTO user) {
        this.token = token;
        this.user = user;
    }

    // Getters và setters
}
