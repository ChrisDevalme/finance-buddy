package com.pluralsight.financebuddy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {
    private Long id;
    private String name;
    private String type;
    private BigDecimal balance;
    private Long userId;

}