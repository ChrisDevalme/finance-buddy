package com.pluralsight.financebuddy.dto;

import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionRequest {
    @Getter
    private String description;
    @Getter
    private BigDecimal amount;
    @Getter
    private String type;
    @Getter
    private LocalDate transactionDate;
    @Getter
    private Long accountId;
}