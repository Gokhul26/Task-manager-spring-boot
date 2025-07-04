package com.goks.taskmanager.Controller;

import com.goks.taskmanager.dto.LoginRequest;
import com.goks.taskmanager.dto.SignupRequest;
import com.goks.taskmanager.Service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // POST /auth/signup
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser( @RequestBody SignupRequest signupRequest) {
        authService.signup(signupRequest);
        return ResponseEntity.ok("Signup successful");
    }

    // POST /auth/login
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequest loginRequest) {
        String token = authService.login(loginRequest);
        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }
}

