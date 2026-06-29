package com.pluralsight.financebuddy.dto;

import lombok.Getter;

import java.math.BigDecimal;
@Getter
public class BudgetResponse {

    private Long id;
    private BigDecimal monthlyLimit;
    private int month;
    private int year;
    private Long userId;
    private Long categoryId;
    private String categoryName;

    public BudgetResponse(Long id, BigDecimal monthlyLimit, int month, int year,
                          Long userId, Long categoryId, String categoryName) {
        this.id = id;
        this.monthlyLimit = monthlyLimit;
        this.month = month;
        this.year = year;
        this.userId = userId;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

}