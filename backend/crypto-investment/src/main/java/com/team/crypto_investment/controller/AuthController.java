package com.team.crypto_investment.controller;

import com.team.crypto_investment.dto.UserResponse;
import com.team.crypto_investment.entity.User;
import com.team.crypto_investment.security.JwtUtil;
import com.team.crypto_investment.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    // サインアップ
    @PostMapping("/register")
    public UserResponse register(@RequestBody User user) {
        User savedUser = userService.register(user);
        return new UserResponse(savedUser.getId(), savedUser.getUsername(), savedUser.getEmail());
    }

    // ログイン
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String identifier = request.get("usernameOrEmail");
        String password = request.get("password");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(identifier, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtil.generateToken(authentication.getName());

        return Map.of("token", token);
    }

}
