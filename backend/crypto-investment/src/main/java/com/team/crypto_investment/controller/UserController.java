package com.team.crypto_investment.controller;

import com.team.crypto_investment.dto.UpdateUserRequest;
import com.team.crypto_investment.dto.UserResponse;
import com.team.crypto_investment.entity.User;
import com.team.crypto_investment.exception.ApiException;
import com.team.crypto_investment.repository.UserRepository;
import com.team.crypto_investment.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    // ログイン中のユーザ情報を取得
    @GetMapping("/me")
    public UserResponse getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        // DBからユーザ情報を検索
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException("User not found"));
        // レスポンスdtoとして返す
        return new UserResponse(user.getId(), user.getUsername(),user.getEmail());
    }

    // ユーザ情報更新
    @PutMapping("/update")
    public UserResponse updateCurrentUser(@RequestBody UpdateUserRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        // Service層へ処理を渡す
        User updated = userService.updateUser(username, request);

        return new UserResponse(updated.getId(), updated.getUsername(), updated.getEmail());
    }

    // アカウント削除
    @DeleteMapping("/delete")
    public void deleteCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException("User not found"));

        userRepository.delete(user);
    }
}