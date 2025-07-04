package com.goks.taskmanager.dto;

import javax.validation.constraints.NotBlank;

public class SignupRequest {

    @NotBlank(message = "Username is required")
    private String username;
    @javax.validation.constraints.NotBlank
    @NotBlank(message = "Password is required")
    private String password;

    // Constructors
    public SignupRequest() {}

    public SignupRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
