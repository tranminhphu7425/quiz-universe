package com.quizuniverse.dto;

import java.util.UUID;

public class RegisterResponse  {
     private String token;
    private UUID id;
    private String name;
    private String email;
    public RegisterResponse(String token, UUID id, String name, String email) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }
    public UUID getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getEmail() {
        return email;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    

    

     
}
