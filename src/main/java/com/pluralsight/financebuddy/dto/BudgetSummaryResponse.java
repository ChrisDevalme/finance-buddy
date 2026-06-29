package com.pluralsight.financebuddy.dto;

import java.math.BigDecimal;

public class BudgetSummaryResponse {

    private Long budgetId;
    private String categoryName;
    private BigDecimal monthlyLimit;
    private BigDecimal amountSpent;
    private BigDecimal remaining;
    private int month;
    private int year;

    public BudgetSummaryResponse(Long budgetId, String categoryName,
                                 BigDecimal monthlyLimit, BigDecimal amountSpent,
                                 BigDecimal remaining, int month, int year) {
        this.budgetId = budgetId;
        this.categoryName = categoryName;
        this.monthlyLimit = monthlyLimit;
        this.amountSpent = amountSpent;
        this.remaining = remaining;
        this.month = month;
        this.year = year;
    }

    public Long getBudgetId() { return budgetId; }
    public String getCategoryName() { return categoryName; }
    public BigDecimal getMonthlyLimit() { return monthlyLimit; }
    public BigDecimal getAmountSpent() { return amountSpent; }
    public BigDecimal getRemaining() { return remaining; }
    public int getMonth() { return month; }
    public int getYear() { return year; }
}
