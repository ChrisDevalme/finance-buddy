package com.pluralsight.financebuddy.dto;

import java.math.BigDecimal;

public class DashboardResponse {

    private BigDecimal totalBalance;
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal netCashFlow;

    public DashboardResponse(BigDecimal totalBalance, BigDecimal totalIncome,
                             BigDecimal totalExpenses, BigDecimal netCashFlow) {
        this.totalBalance = totalBalance;
        this.totalIncome = totalIncome;
        this.totalExpenses = totalExpenses;
        this.netCashFlow = netCashFlow;
    }

    public BigDecimal getTotalBalance() { return totalBalance; }
    public BigDecimal getTotalIncome() { return totalIncome; }
    public BigDecimal getTotalExpenses() { return totalExpenses; }
    public BigDecimal getNetCashFlow() { return netCashFlow; }
}