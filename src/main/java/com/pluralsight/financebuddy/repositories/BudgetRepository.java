package com.pluralsight.financebuddy.repositories;

import com.pluralsight.financebuddy.models.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    List<Budget> findByUserId(Long userId);
}