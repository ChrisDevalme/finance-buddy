package com.pluralsight.financebuddy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
@Getter
@AllArgsConstructor
public class BudgetResponse {

    private Long id;
    private BigDecimal monthlyLimit;
    private int month;
    private int year;
    private Long userId;
    private Long categoryId;
    private String categoryName;

}