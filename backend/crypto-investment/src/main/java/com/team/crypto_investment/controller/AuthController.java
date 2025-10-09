package com.team.crypto_investment.controller;

import com.team.crypto_investment.entity.User;
import com.team.crypto_investment.exception.ApiException;
import com.team.crypto_investment.security.JwtUtil;
import com.team.crypto_investment.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // 新規登録
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER"); // デフォルトrole
        }

        User registered = userService.register(user);
        return ResponseEntity.ok(registered);
    }

    // ログイン処理
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> payload) {
        String identifier = payload.get("identifier");
        String password = payload.get("password");

        if (identifier == null || password == null) {
            throw new ApiException("Username/Email and password are required");
        }

        // username または email で検索
        User user = userService.findByUsernameOrEmail(identifier)
                .orElseThrow(() -> new ApiException("User not found"));

        // パスワード照合
        if (!userService.checkPassword(password, user.getPassword())) {
            throw new ApiException("Password incorrect");
        }

        // JWT発行
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "token", token,
                "username", user.getUsername(),
                "role", user.getRole()
        ));
    }
}