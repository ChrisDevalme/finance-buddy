package com.pluralsight.financebuddy.dto;

import java.math.BigDecimal;

public class MonthlySummaryResponse {

    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal netCashFlow;
    private int month;
    private int year;

    public MonthlySummaryResponse(BigDecimal totalIncome, BigDecimal totalExpenses,
                                  BigDecimal netCashFlow, int month, int year) {
        this.totalIncome = totalIncome;
        this.totalExpenses = totalExpenses;
        this.netCashFlow = netCashFlow;
        this.month = month;
        this.year = year;
    }

    public BigDecimal getTotalIncome() { return totalIncome; }
    public BigDecimal getTotalExpenses() { return totalExpenses; }
    public BigDecimal getNetCashFlow() { return netCashFlow; }
    public int getMonth() { return month; }
    public int getYear() { return year; }
}