package com.team.crypto_investment.controller;

import com.team.crypto_investment.dto.auth.UpdateUserRequest;
import com.team.crypto_investment.dto.auth.UserResponse;
import com.team.crypto_investment.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /* 認証されたユーザを取得する補助メソッド */
    private String getAuthenticatedUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    /* ログイン中のユーザ情報取得 */
    @GetMapping("/me")
    public UserResponse getUserInfo() {
        return userService.getUserInfo(getAuthenticatedUsername());
    }

    /* ユーザ情報更新 */
    @PutMapping("/update")
    public UserResponse updateUserInfo(@RequestBody UpdateUserRequest request) {
        return userService.updateUser(getAuthenticatedUsername(), request);
    }

    /* アカウント削除 */
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserInfo() {
        userService.deleteUser(getAuthenticatedUsername());
    }
}
