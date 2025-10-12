package com.team.crypto_investment.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class StockUpdateScheduler {

    private static final Logger logger = LoggerFactory.getLogger(StockUpdateScheduler.class);

    private final StockService stockService;
    private static final int BATCH_SIZE = 10; // 一度に更新する銘柄の件数

    public StockUpdateScheduler(StockService stockService) {
        this.stockService = stockService;
    }

    @Scheduled(fixedRate = 60_000) // 1分ごとに実行(finnhub無料枠内)
    public void updateBatchStockPrices() {
        List<String> symbols = stockService.findAllSymbols();
        int BATCH_SIZE = 10;

        for (int i=0; i<symbols.size(); i+=BATCH_SIZE) {
            List<String> batch = symbols.subList(i, Math.min(i + BATCH_SIZE, symbols.size()));

            batch.forEach(symbol -> {
                    try {
                        stockService.updateStockPrice(symbol);
                        Thread.sleep(1000);
                    } catch (Exception e) {
                        logger.error("Error updating symbol: {}", symbol, e);
                    }
                });
            }
    }
}
