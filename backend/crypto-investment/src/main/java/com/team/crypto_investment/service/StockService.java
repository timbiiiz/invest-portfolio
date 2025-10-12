package com.team.crypto_investment.service;

import com.team.crypto_investment.dto.FinnhubQuote;
import com.team.crypto_investment.entity.Stock;
import com.team.crypto_investment.repository.StockRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    private static final Logger logger = LoggerFactory.getLogger(StockService.class);

    private final StockRepository stockRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${finnhub.api.key}")
    private String apiKey;

    @Value("${finnhub.api.url}")
    private String apiUrl;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public Stock updateStockPrice(String symbol) {
        try {
            String requestUrl = apiUrl + symbol + "&token=" + apiKey;
            ResponseEntity<FinnhubQuote> response =
                    restTemplate.getForEntity(requestUrl, FinnhubQuote.class);

            FinnhubQuote quote = response.getBody();
            if (quote == null || quote.getC() == null) {
                throw new RuntimeException("Cannot get stock data: " + symbol);
            }

        Optional<Stock> existing = stockRepository.findBySymbol(symbol);
        Stock stock = existing.orElseGet(() -> {
            Stock s = new Stock();
            s.setSymbol(symbol);
            s.setName(symbol);
            return s;
        });

        stock.setPrice(quote.getC());
        stock.setLastUpdated(LocalDateTime.now());
        return stockRepository.save(stock);
    } catch (Exception e) {
            logger.error("Failed to update stock price for symbol: {}", symbol, e);
            return null;
        }
    }

    public List<Stock> findAll() {
        return stockRepository.findAll();
    }

    public List<String> findAllSymbols() {
        return stockRepository.findAll().stream()
                .map(Stock::getSymbol)
                .toList();
    }

    public Optional<Stock> findBySymbol(String symbol) {
        return stockRepository.findBySymbol(symbol);
    }

    public Stock save(Stock stock) {
        stock.setLastUpdated(LocalDateTime.now());
        return stockRepository.save(stock);
    }

    public void deleteById(Long id) {
        stockRepository.deleteById(id);
    }
}
