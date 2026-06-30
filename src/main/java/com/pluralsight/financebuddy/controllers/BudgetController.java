package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.ApiResponse;
import com.pluralsight.financebuddy.dto.BudgetRequest;
import com.pluralsight.financebuddy.dto.BudgetResponse;
import com.pluralsight.financebuddy.dto.BudgetSummaryResponse;
import com.pluralsight.financebuddy.models.User;
import com.pluralsight.financebuddy.services.BudgetService;
import com.pluralsight.financebuddy.services.CurrentUserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;
    private final CurrentUserService currentUserService;

    public BudgetController(BudgetService budgetService, CurrentUserService currentUserService) {
        this.budgetService = budgetService;
        this.currentUserService = currentUserService;
    }

    @PostMapping
    public BudgetResponse createBudget(@Valid @RequestBody BudgetRequest request) {
        User user = currentUserService.getCurrentUser();
        return budgetService.createBudget(request, user);
    }

    @GetMapping("/me")
    public List<BudgetResponse> getMyBudgets() {
        Long userId = currentUserService.getCurrentUser().getId();
        return budgetService.getBudgetsByUserId(userId);
    }

    @GetMapping("/me/summary")
    public List<BudgetSummaryResponse> getMyBudgetSummary() {
        Long userId = currentUserService.getCurrentUser().getId();
        return budgetService.getBudgetSummaryByUserId(userId);
    }

    @PutMapping("/{budgetId}")
    public BudgetResponse updateBudget(
            @PathVariable Long budgetId,
            @Valid @RequestBody BudgetRequest request) {

        User user = currentUserService.getCurrentUser();
        return budgetService.updateBudget(budgetId, request, user);
    }

    @DeleteMapping("/{budgetId}")
    public ApiResponse deleteBudget(@PathVariable Long budgetId) {
        User user = currentUserService.getCurrentUser();
        return budgetService.deleteBudget(budgetId, user);
    }

//    @GetMapping("/user/{userId}/summary")
//    public List<BudgetSummaryResponse> getBudgetSummaryByUser(@PathVariable Long userId) {
//        return budgetService.getBudgetSummaryByUserId(userId);
//    }
}