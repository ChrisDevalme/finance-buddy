package com.pluralsight.financebuddy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class BudgetSummaryResponse {

    private Long budgetId;
    private String categoryName;
    private BigDecimal monthlyLimit;
    private BigDecimal amountSpent;
    private BigDecimal remaining;
    private int month;
    private int year;

}
