package com.pluralsight.financebuddy.services;

import com.pluralsight.financebuddy.dto.CategoryRequest;
import com.pluralsight.financebuddy.dto.CategoryResponse;
import com.pluralsight.financebuddy.models.Category;
import com.pluralsight.financebuddy.models.User;
import com.pluralsight.financebuddy.repositories.CategoryRepository;
import com.pluralsight.financebuddy.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository ) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public CategoryResponse createCategory(CategoryRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = new Category();
        category.setName(request.getName());
        category.setUser(user);

        Category savedCategory = categoryRepository.save(category);

        return mapToResponse(savedCategory);
    }

    public List<CategoryResponse> getCategoriesByUserId(Long userId) {
        return categoryRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private CategoryResponse mapToResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getUser().getId()
        );
    }


}
