package com.quizuniverse.dto;

public class RegisterResponse  {
     private String token;
    private Long id;
    private String name;
    private String email;
    public RegisterResponse(String token, Long id, String name, String email) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }
    public Long getId() {
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
    public void setId(Long id) {
        this.id = id;
    }
    

    

     
}
