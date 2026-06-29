package com.pluralsight.financebuddy.services;

import com.pluralsight.financebuddy.dto.BudgetRequest;
import com.pluralsight.financebuddy.dto.BudgetResponse;
import com.pluralsight.financebuddy.dto.BudgetSummaryResponse;
import com.pluralsight.financebuddy.enums.TransactionType;
import com.pluralsight.financebuddy.models.Budget;
import com.pluralsight.financebuddy.models.Category;
import com.pluralsight.financebuddy.models.Transaction;
import com.pluralsight.financebuddy.models.User;
import com.pluralsight.financebuddy.repositories.BudgetRepository;
import com.pluralsight.financebuddy.repositories.CategoryRepository;
import com.pluralsight.financebuddy.repositories.TransactionRepository;
import com.pluralsight.financebuddy.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;

    public BudgetService(BudgetRepository budgetRepository,
                         UserRepository userRepository,
                         CategoryRepository categoryRepository,
                         TransactionRepository transactionRepository){
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.transactionRepository = transactionRepository;
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

    public List<BudgetSummaryResponse> getBudgetSummaryByUserId(Long userId) {
        List<Budget> budgets = budgetRepository.findByUserId(userId);

        return budgets.stream()
                .map(budget -> {
                    List<Transaction> transactions =
                            transactionRepository.findByAccountUserIdAndCategoryId(
                                    userId,
                                    budget.getCategory().getId()
                            );

                    BigDecimal amountSpent = transactions.stream()
                            .filter(t -> t.getType() == TransactionType.EXPENSE)
                            .filter(t -> t.getTransactionDate().getMonthValue() == budget.getMonth())
                            .filter(t -> t.getTransactionDate().getYear() == budget.getYear())
                            .map(Transaction::getAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                    BigDecimal remaining = budget.getMonthlyLimit().subtract(amountSpent);

                    return new BudgetSummaryResponse(
                            budget.getId(),
                            budget.getCategory().getName(),
                            budget.getMonthlyLimit(),
                            amountSpent,
                            remaining,
                            budget.getMonth(),
                            budget.getYear()
                    );
                })
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