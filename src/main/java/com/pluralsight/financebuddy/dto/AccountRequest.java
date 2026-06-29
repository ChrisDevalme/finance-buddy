package com.pluralsight.financebuddy.dto;

import java.math.BigDecimal;

public class AccountRequest {
    private String name;
    private String type;
    private BigDecimal balance;
    private Long userId;

    public String getName() { return name; }
    public String getType() { return type; }
    public BigDecimal getBalance() { return balance; }
    public Long getUserId() { return userId; }
}