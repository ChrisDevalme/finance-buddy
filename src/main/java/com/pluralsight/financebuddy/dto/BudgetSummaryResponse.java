package com.pluralsight.financebuddy.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
public class BudgetSummaryResponse {

    private Long budgetId;
    private String categoryName;
    private BigDecimal monthlyLimit;
    private BigDecimal amountSpent;
    private BigDecimal remaining;
    private int month;
    private int year;

}
