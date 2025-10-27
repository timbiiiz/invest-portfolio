package com.team.crypto_investment.controller;

import com.team.crypto_investment.service.FinnhubService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class StockController {
    private final FinnhubService finnhubService;

    @GetMapping("/stocks")
    public Mono<ResponseEntity<List<Map<String,Object>>>> listSymbols(
            @RequestParam(defaultValue = "US") String exchange,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {

        return finnhubService.getSymbols(exchange)
                .map(allSymbols -> {
                    int start = Math.min(page * size, allSymbols.size());
                    int end = Math.min(start + size, allSymbols.size());
                    return allSymbols.subList(start, end);
                })
                .map(ResponseEntity::ok)
                .onErrorResume(ex -> Mono.just(
                        ResponseEntity.status(500)
                                .body(List.of(Map.of("error", ex.getMessage())))
                ));
    }

    @GetMapping("/quote")
    public Mono<ResponseEntity<Object>> quote(@RequestParam String symbol) {
        return finnhubService.getQuote(symbol)
                .map(ResponseEntity::ok)
                .onErrorResume(ex -> Mono.just(ResponseEntity.status(500).body(Map.of("error", ex.getMessage()))));
    }

}
