// 個別の株銘柄と数量など(ポートフォリオ構成)

package com.team.crypto_investment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class StockHolding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symbol;
    private int quantity;
    private double price;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public StockHolding(String symbol, int quantity, double price, User user) {
        this.symbol = symbol;
        this.quantity = quantity;
        this.price = price;
        this.user = user;
    }
}
