package com.pluralsight.financebuddy.dto;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class AccountRequest {
    private String name;
    private String type;
    private BigDecimal balance;
    private Long userId;

}