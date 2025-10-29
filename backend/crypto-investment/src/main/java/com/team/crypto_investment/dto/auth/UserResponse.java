package com.team.crypto_investment.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {
    private Long id;
    @NotBlank(message = "the name is required")
    private String username;
    @Email(message = "please enter a valid email address")
    private String email;
}
