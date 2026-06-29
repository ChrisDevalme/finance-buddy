package com.pluralsight.financebuddy.dto;

import com.pluralsight.financebuddy.enums.TransactionType;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionRequest {
    @Getter
    private String description;
    @Getter
    private BigDecimal amount;
    @Getter
    private TransactionType type;
    @Getter
    private LocalDate transactionDate;
    @Getter
    private Long accountId;
    @Getter
    private Long categoryId;
}