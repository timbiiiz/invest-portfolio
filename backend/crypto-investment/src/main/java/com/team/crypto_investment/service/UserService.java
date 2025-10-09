package com.team.crypto_investment.service;

import com.team.crypto_investment.entity.User;
import com.team.crypto_investment.exception.ApiException;
import com.team.crypto_investment.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, BCryptPasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    // ユーザ登録処理
    public User register(User user) {
        if (repository.findByUsername(user.getUsername()).isPresent()
                || repository.findByEmail(user.getEmail()).isPresent()) {
            throw new ApiException("Username or email already exists");
        }
        // パスワードをハッシュ化
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // roleに何も入れなかったらuserが入るようにする(ADMINを入れると管理者になる)
        if (user.getRole() == null || user.getRole().isEmpty()) user.setRole("USER");
        user.setEnabled(true);
        return repository.save(user);
    }

    // ログイン時のユーザ取得
    public Optional<User> findByUsernameOrEmail(String identifier) {
        return repository.findByUsername(identifier).or(() -> repository.findByEmail(identifier));
    }

    // パスワードチェック
    public boolean checkPassword(String raw, String encoded) {
        return passwordEncoder.matches(raw, encoded);
    }
}