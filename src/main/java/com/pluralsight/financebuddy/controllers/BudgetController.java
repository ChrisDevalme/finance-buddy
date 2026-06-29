package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.BudgetRequest;
import com.pluralsight.financebuddy.dto.BudgetResponse;
import com.pluralsight.financebuddy.dto.BudgetSummaryResponse;
import com.pluralsight.financebuddy.services.BudgetService;
import com.pluralsight.financebuddy.services.CurrentUserService;
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
    public BudgetResponse createBudget(@RequestBody BudgetRequest request) {
        return budgetService.createBudget(request);
    }

    @GetMapping("/me")
    public List<BudgetResponse> getMyBudgets() {
        Long userId = currentUserService.getCurrentUser().getId();
        return budgetService.getBudgetsByUserId(userId);
    }

    @GetMapping("/user/{userId}")
    public List<BudgetResponse> getBudgetsByUser(@PathVariable Long userId) {
        return budgetService.getBudgetsByUserId(userId);
    }

    @GetMapping("/user/{userId}/summary")
    public List<BudgetSummaryResponse> getBudgetSummaryByUser(@PathVariable Long userId) {
        return budgetService.getBudgetSummaryByUserId(userId);
    }
}