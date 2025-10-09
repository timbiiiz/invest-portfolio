package com.team.crypto_investment.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Map;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    @Column(nullable = false)
    private String role = "USER";
    private boolean enabled = true;
}
