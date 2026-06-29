package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.CategoryRequest;
import com.pluralsight.financebuddy.dto.CategoryResponse;
import com.pluralsight.financebuddy.services.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public CategoryResponse createCategory(@RequestBody CategoryRequest request) {
        return categoryService.createCategory(request);
    }

    @GetMapping("/user/{userId}")
    public List<CategoryResponse> getCategoriesByUser(@PathVariable Long userId) {
        return categoryService.getCategoriesByUserId(userId);
    }
}