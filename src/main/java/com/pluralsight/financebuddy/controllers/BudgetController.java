package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.BudgetRequest;
import com.pluralsight.financebuddy.dto.BudgetResponse;
import com.pluralsight.financebuddy.services.BudgetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping
    public BudgetResponse createBudget(@RequestBody BudgetRequest request) {
        return budgetService.createBudget(request);
    }

    @GetMapping("/user/{userId}")
    public List<BudgetResponse> getBudgetsByUser(@PathVariable Long userId) {
        return budgetService.getBudgetsByUserId(userId);
    }
}