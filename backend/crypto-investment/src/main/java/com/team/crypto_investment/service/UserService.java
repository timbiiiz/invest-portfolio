package com.team.crypto_investment.service;

import com.team.crypto_investment.entity.User;
import com.team.crypto_investment.exception.ApiException;
import com.team.crypto_investment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository repository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    // プロフ画像url更新
    public void updateProfileImage(Long userId, String imageUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setProfileImageUrl(imageUrl);
        userRepository.save(user);
    }

    // ユーザ登録処理
    public User register(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()
                || userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ApiException("Username or email already exists");
        }
        // パスワードをハッシュ化
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // roleに何も入れなかったらuserが入るようにする(ADMINを入れると管理者になる)
        if (user.getRole() == null || user.getRole().isEmpty()) user.setRole("USER");
        user.setEnabled(true);

        return userRepository.save(user);
    }

    // ログイン時のユーザ取得
    public Optional<User> findByUsernameOrEmail(String identifier) {
        return userRepository.findByUsername(identifier)
                .or(() -> userRepository.findByEmail(identifier));
    }

    // パスワードチェック
    public boolean checkPassword(String raw, String encoded) {
        return passwordEncoder.matches(raw, encoded);
    }
}