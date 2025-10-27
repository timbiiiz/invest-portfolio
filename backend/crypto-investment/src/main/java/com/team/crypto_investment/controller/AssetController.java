package com.team.crypto_investment.controller;

import com.team.crypto_investment.entity.User;
import com.team.crypto_investment.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class AssetController {
    private final AssetService assetService;

    // 資産取得
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserAssets(@PathVariable Long userId) {
        return ResponseEntity.ok(assetService.getUserAssets(userId));
    }

    // 入金
    @PostMapping("{userId}/deposit")
    public ResponseEntity<User> deposit(@PathVariable Long userId, @RequestParam double amount) {
        return ResponseEntity.ok(assetService.deposit(userId, amount));
    }

    // 出金
    @PostMapping("/{userId}/withdraw")
    public ResponseEntity<User> withdraw(@PathVariable Long userId, @RequestParam double amount) {
        return ResponseEntity.ok(assetService.withdraw(userId, amount));
    }

    // 株追加
    @PostMapping("/{userId}/stocks")
    public ResponseEntity<User> addStock(@PathVariable Long userId, @RequestParam Map<String, Object> body) {
        String symbol = (String) body.get("symbol");
        int quantity = (int) body.get("quantity");
        double price = ((Number) body.get("price")).doubleValue();

        return ResponseEntity.ok(assetService.addStock(userId, symbol, quantity, price));
    }

}