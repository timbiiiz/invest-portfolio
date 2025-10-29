package com.team.crypto_investment.service;

import com.team.crypto_investment.dto.auth.*;
import com.team.crypto_investment.entity.User;
import com.team.crypto_investment.exception.ApiException;
import com.team.crypto_investment.repository.UserRepository;
import com.team.crypto_investment.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /* 新規登録 */
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new ApiException("Username already exists");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ApiException("Email already exists");
        }

        // dto -> entityに変換
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // 保存
        User saved = userRepository.save(user);
        log.info("User registered: {}", saved.getUsername());

        // jwt生成
        String token = jwtUtil.generateToken(saved.getUsername());

        // Entity -> Response変換
        return new RegisterResponse(saved.getId(), saved.getUsername(), saved.getEmail(), token);
    }

    /* ユーザ情報更新 */
    public UserResponse updateUser(String updateUsername, UpdateUserRequest request) {
        User user = userRepository.findByUsername(updateUsername)
                .orElseThrow(() -> new ApiException("User not found"));

        // ユーザ名更新
        if (request.getUsername() != null && !request.getUsername().isBlank()) {
            // 新しいユーザ名がすでに存在しないかチェック
            userRepository.findByUsername(request.getUsername())
                    .filter(u -> !u.getId().equals(user.getId()))
                    .ifPresent(u -> { throw new ApiException("Username already exists"); });
            user.setUsername(request.getUsername());
        }
        // メアド更新
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            userRepository.findByEmail(request.getEmail())
                    .filter(u -> !u.getId().equals(user.getId()))
                    .ifPresent(u -> { throw new ApiException("Email already exists"); });
            user.setEmail(request.getEmail());
        }
        // パスワード更新
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        // 保存
        User saved = userRepository.save(user);
        log.info("User updated: {}", saved.getUsername());

        return new UserResponse(saved.getId(), saved.getUsername(), saved.getEmail());

    }

    /* 現在のユーザ情報取得 */
    public UserResponse getUserInfo(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException("User not found"));
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail());
    }

    /* アカウント削除 */
    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException("User not found"));
        userRepository.delete(user);
    }
}