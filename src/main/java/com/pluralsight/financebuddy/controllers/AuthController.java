package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.AuthResponse;
import com.pluralsight.financebuddy.dto.LoginRequest;
import com.pluralsight.financebuddy.dto.RegisterRequest;
import com.pluralsight.financebuddy.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}