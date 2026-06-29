package com.pluralsight.financebuddy.dto;

import java.math.BigDecimal;

public class AccountResponse {
    private Long id;
    private String name;
    private String type;
    private BigDecimal balance;
    private Long userId;

    public AccountResponse(Long id, String name, String type, BigDecimal balance, Long userId) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.balance = balance;
        this.userId = userId;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public BigDecimal getBalance() { return balance; }
    public Long getUserId() { return userId; }
}