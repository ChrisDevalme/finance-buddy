package com.pluralsight.financebuddy.services;

import com.pluralsight.financebuddy.dto.BudgetRequest;
import com.pluralsight.financebuddy.dto.BudgetResponse;
import com.pluralsight.financebuddy.models.Budget;
import com.pluralsight.financebuddy.models.Category;
import com.pluralsight.financebuddy.models.User;
import com.pluralsight.financebuddy.repositories.BudgetRepository;
import com.pluralsight.financebuddy.repositories.CategoryRepository;
import com.pluralsight.financebuddy.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public BudgetService(BudgetRepository budgetRepository,
                         UserRepository userRepository,
                         CategoryRepository categoryRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public BudgetResponse createBudget(BudgetRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Budget budget = new Budget();
        budget.setMonthlyLimit(request.getMonthlyLimit());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());
        budget.setUser(user);
        budget.setCategory(category);

        Budget savedBudget = budgetRepository.save(budget);

        return mapToResponse(savedBudget);
    }

    public List<BudgetResponse> getBudgetsByUserId(Long userId) {
        return budgetRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private BudgetResponse mapToResponse(Budget budget) {
        return new BudgetResponse(
                budget.getId(),
                budget.getMonthlyLimit(),
                budget.getMonth(),
                budget.getYear(),
                budget.getUser().getId(),
                budget.getCategory().getId(),
                budget.getCategory().getName()
        );
    }
}