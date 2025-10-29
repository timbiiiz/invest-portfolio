package com.team.crypto_investment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private boolean enabled = true;
    private String token;

    private double cash = 0.0; // 現金残高

    // 保有株一覧
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StockHolding> stockHoldings = new ArrayList<>();

    /* 現金操作 */
    public void deposit(double amount) {
        this.cash = amount;
    }

    public void withdraw(double amount) {
        if (this.cash < amount) {
            throw new IllegalArgumentException("Insufficient balance");
        }
        this.cash -= amount;
    }

    public void addStock(String symbol, int quantity, double price) {
        StockHolding holding = new StockHolding(symbol, quantity, price, this);
        this.stockHoldings.add(holding);
    }
}
