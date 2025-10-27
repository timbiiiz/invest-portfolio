package com.team.crypto_investment.service;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
public class FinnhubService {

    private final WebClient webClient;
    private final String apiKey;
    private final Cache<String, List<Map<String,Object>>> cache = Caffeine.newBuilder()
            .maximumSize(1000)
            .expireAfterWrite(Duration.ofSeconds(30))
            .build();

    public FinnhubService(@Value("${finnhub.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.webClient = WebClient.builder()
                .baseUrl("https://finnhub.io/api/v1")
                .exchangeStrategies(
                        ExchangeStrategies.builder()
                                .codecs(clientDefaultCodecs -> clientDefaultCodecs.defaultCodecs().maxInMemorySize(16 * 1024 * 1024))
                                .build()
                )
                .build();
    }

    public Mono<List<Map<String,Object>>> getSymbols(String exchange) {
        String normalizedExchange = switch (exchange.toUpperCase()) {
            case "TOKYO" -> "T";
            case "TORONTO" -> "TO";
            case "HONGKONG" -> "HK";
            default -> "US";
        };

        List<Map<String, Object>> cached = cache.getIfPresent(exchange);
        if (cached != null) return Mono.just(cached);

        return webClient.get()
                .uri(uri -> uri.path("/stock/symbol")
                        .queryParam("exchange", exchange)
                        .queryParam("token", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String,Object>>>() {})
                .doOnNext(list -> cache.put(exchange, list));
    }

    public Mono<Object> getQuote(String symbol) {
        return webClient.get()
                .uri(uri -> uri.path("/quote")
                        .queryParam("symbol", symbol)
                        .queryParam("token", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(Object.class);
    }
}