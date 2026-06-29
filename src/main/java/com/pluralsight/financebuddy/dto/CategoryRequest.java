package com.pluralsight.financebuddy.dto;

import lombok.Getter;

public class CategoryRequest{
    @Getter
    private String name;

    @Getter
    private Long userId;
}
