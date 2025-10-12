package com.team.crypto_investment.dto;

import lombok.Data;

@Data
public class FinnhubQuote {

    private Double c; // 現在価格
    private Double h; // 高値
    private Double l; // 安値
    private Double o; // 始値
    private Double pc; // 前日終値
}
