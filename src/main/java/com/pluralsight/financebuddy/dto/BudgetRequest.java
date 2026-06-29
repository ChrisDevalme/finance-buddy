package com.pluralsight.financebuddy.dto;

import lombok.Getter;

import java.math.BigDecimal;
@Getter
public class BudgetRequest {

    private BigDecimal monthlyLimit;
    private int month;
    private int year;
    private Long userId;
    private Long categoryId;

}