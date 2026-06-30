package com.pluralsight.financebuddy.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BudgetRequest {

    @NotNull(message = "Monthly limit is required")
    @Positive(message = "Monthly limit must be greater than zero")
    private BigDecimal monthlyLimit;

    @Min(value = 1, message = "Month must be between 1 and 12")
    @Max(value = 12, message = "Month must be between 1 and 12")
    private int month;

    @Min(value = 2000, message = "Year must be valid")
    private int year;

    @NotNull(message = "Category ID is required")
    private Long categoryId;
}