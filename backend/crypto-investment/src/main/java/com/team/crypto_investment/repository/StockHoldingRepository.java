package com.team.crypto_investment.repository;

import com.team.crypto_investment.entity.StockHolding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockHoldingRepository extends JpaRepository<StockHolding, Long> {

}
