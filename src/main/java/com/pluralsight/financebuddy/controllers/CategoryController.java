package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.CategoryRequest;
import com.pluralsight.financebuddy.dto.CategoryResponse;
import com.pluralsight.financebuddy.models.User;
import com.pluralsight.financebuddy.services.CategoryService;
import com.pluralsight.financebuddy.services.CurrentUserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final CurrentUserService currentUserService;

    public CategoryController(CategoryService categoryService, CurrentUserService currentUserService) {
        this.categoryService = categoryService;
        this.currentUserService = currentUserService;
    }

    @PostMapping
    public CategoryResponse createCategory(@Valid @RequestBody CategoryRequest request) {
        User user = currentUserService.getCurrentUser();
        return categoryService.createCategory(request, user);
    }

    @GetMapping("/me")
    public List<CategoryResponse> getMyCategories() {
        Long userId = currentUserService.getCurrentUser().getId();
        return categoryService.getCategoriesByUserId(userId);
    }

    @GetMapping("/user/{userId}")
    public List<CategoryResponse> getCategoriesByUser(@PathVariable Long userId) {
        return categoryService.getCategoriesByUserId(userId);
    }
}