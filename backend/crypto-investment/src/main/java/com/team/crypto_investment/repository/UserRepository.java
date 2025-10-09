package com.team.crypto_investment.repository;

import com.team.crypto_investment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // ユーザまたはメールでログインできる用
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
