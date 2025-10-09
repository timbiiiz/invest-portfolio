package com.team.crypto_investment.controller;

import com.team.crypto_investment.dto.UpdateUserRequest;
import com.team.crypto_investment.dto.UserResponse;
import com.team.crypto_investment.entity.User;
import com.team.crypto_investment.exception.ApiException;
import com.team.crypto_investment.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public UserResponse getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException("User not found"));
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }

    @PutMapping("/me")
    public UserResponse updateCurrentUser(@RequestBody UpdateUserRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException("User not found"));

        if (request.getEmail() != null) user.setEmail(request.getEmail());
        userRepository.save(user);

        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }

    @DeleteMapping("/me")
    public void deleteCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException("User not found"));
        userRepository.delete(user);
    }
}