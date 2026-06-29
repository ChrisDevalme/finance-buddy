package com.pluralsight.financebuddy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;


@Getter
@AllArgsConstructor
public class CategorySpendingResponse {

    private String categoryName;
    private BigDecimal totalSpent;
}