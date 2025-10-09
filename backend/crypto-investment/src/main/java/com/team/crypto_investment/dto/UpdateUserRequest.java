package com.team.crypto_investment.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String email;
    private String role; // 管理者用のみ
}