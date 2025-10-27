package com.team.crypto_investment.service;

import com.team.crypto_investment.dto.UpdateUserRequest;
import com.team.crypto_investment.entity.User;
import com.team.crypto_investment.exception.ApiException;
import com.team.crypto_investment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // 新規登録
    public User register(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()
                || userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ApiException("Username or email already exists");
        }

        // パスワードのハッシュ化
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    // ユーザ情報更新処理
    public User updateUser(String principalUsername, UpdateUserRequest dto) {
        User user = userRepository.findByUsername(principalUsername)
                .orElseThrow(() -> new ApiException("User not found"));

        if (dto.getUsername() != null && !dto.getUsername().isBlank()) {
            user.setUsername(dto.getUsername());
        }

        if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
            userRepository.findByEmail(dto.getEmail())
                    .filter(u -> !u.getUsername().equals(principalUsername))
                    .ifPresent(u -> {throw new ApiException("Email already exists"); });
            user.setEmail(dto.getEmail());
        }

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        return userRepository.save(user);
    }
}