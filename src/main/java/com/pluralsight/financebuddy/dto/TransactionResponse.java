package com.pluralsight.financebuddy.dto;

import com.pluralsight.financebuddy.enums.TransactionType;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionResponse {
    @Getter
    private Long id;
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

    public TransactionResponse(Long id, String description, BigDecimal amount, TransactionType type, LocalDate transactionDate, Long accountId) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.transactionDate = transactionDate;
        this.accountId = accountId;
    }
}
