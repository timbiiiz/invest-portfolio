package com.team.crypto_investment.service;

import com.team.crypto_investment.entity.User;
import com.team.crypto_investment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssetService {

    private final UserRepository userRepository;

    // 入金
    public User deposit(Long userId, double amount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.deposit(amount);
        return userRepository.save(user);
    }

    // 出金
    public User withdraw(Long userId, double amount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.withdraw(amount);
        return userRepository.save(user);
    }

    // 株追加
    public User addStock(Long userId, String symbol, int quantity, double price) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.addStock(symbol, quantity, price);
        return userRepository.save(user);
    }

    // 資産取得
    public User getUserAssets(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}