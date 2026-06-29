package com.pluralsight.financebuddy.dto;

import com.pluralsight.financebuddy.enums.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class TransactionResponse {
    private Long id;
    private String description;
    private BigDecimal amount;
    private TransactionType type;
    private LocalDate transactionDate;
    private String notes;
    private Long accountId;
    private Long categoryId;

}
