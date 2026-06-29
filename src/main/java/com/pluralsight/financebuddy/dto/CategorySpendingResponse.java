package com.pluralsight.financebuddy.dto;

import java.math.BigDecimal;

public class CategorySpendingResponse {

    private String categoryName;
    private BigDecimal totalSpent;

    public CategorySpendingResponse(String categoryName, BigDecimal totalSpent) {
        this.categoryName = categoryName;
        this.totalSpent = totalSpent;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public BigDecimal getTotalSpent() {
        return totalSpent;
    }
}