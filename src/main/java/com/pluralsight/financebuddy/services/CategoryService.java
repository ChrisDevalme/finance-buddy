package com.pluralsight.financebuddy.services;

import com.pluralsight.financebuddy.dto.ApiResponse;
import com.pluralsight.financebuddy.dto.CategoryRequest;
import com.pluralsight.financebuddy.dto.CategoryResponse;
import com.pluralsight.financebuddy.models.Category;
import com.pluralsight.financebuddy.models.User;
import com.pluralsight.financebuddy.repositories.BudgetRepository;
import com.pluralsight.financebuddy.repositories.CategoryRepository;
import com.pluralsight.financebuddy.repositories.TransactionRepository;
import com.pluralsight.financebuddy.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final BudgetRepository budgetRepository;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository, TransactionRepository transactionRepository, BudgetRepository budgetRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.budgetRepository = budgetRepository;
    }

    public CategoryResponse createCategory(CategoryRequest request, User user) {
        Category category = Category.builder()
                .name(request.getName())
                .user(user)
                .build();

        return mapToResponse(categoryRepository.save(category));
    }

    public List<CategoryResponse> getCategoriesByUserId(Long userId) {
        return categoryRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void createDefaultCategoriesForUser(User user) {
        List<String> defaultCategories = List.of(
                "Food",
                "Rent",
                "Gas",
                "Shopping",
                "Entertainment",
                "Subscriptions",
                "Income",
                "Savings",
                "Health",
                "Transportation"
        );

        List<Category> categories = defaultCategories.stream()
                .map(name -> Category.builder()
                        .name(name)
                        .user(user)
                        .build())
                .toList();

        categoryRepository.saveAll(categories);
    }

    public CategoryResponse updateCategory(Long categoryId, CategoryRequest request, User user) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You do not have access to this category");
        }

        category.setName(request.getName());

        return mapToResponse(categoryRepository.save(category));
    }

    public ApiResponse deleteCategory(Long categoryId, User user) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You do not have access to this category");
        }

        if (transactionRepository.existsByCategoryId(categoryId)) {
            throw new RuntimeException("Cannot delete category with existing transactions");
        }

        if (budgetRepository.existsByCategoryId(categoryId)) {
            throw new RuntimeException("Cannot delete category with existing budgets");
        }

        categoryRepository.delete(category);

        return new ApiResponse(true, "Category deleted successfully.");
    }

    private CategoryResponse mapToResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getUser().getId()
        );
    }


}
