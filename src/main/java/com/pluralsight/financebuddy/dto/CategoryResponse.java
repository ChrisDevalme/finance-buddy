package com.pluralsight.financebuddy.dto;

import lombok.Getter;

public class CategoryResponse {

    @Getter
    private Long id;

    @Getter
    private String name;

    @Getter
    private Long userId;

    public CategoryResponse(Long id, String name, Long userId) {
        this.id = id;
        this.name = name;
        this.userId = userId;
    }
}
