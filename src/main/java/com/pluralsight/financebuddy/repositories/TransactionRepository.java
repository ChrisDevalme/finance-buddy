package com.pluralsight.financebuddy.repositories;

import com.pluralsight.financebuddy.enums.TransactionType;
import com.pluralsight.financebuddy.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByAccountId(Long accountId);
    List<Transaction> findByAccountUserId(Long userId);
    List<Transaction> findByAccountUserIdAndTransactionDateBetween(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );
    List<Transaction> findByAccountUserIdAndType(Long userId, TransactionType type);
    List<Transaction> findByAccountUserIdAndCategoryId(Long userId, Long categoryId);
    List<Transaction> findByAccountUserIdAndDescriptionContainingIgnoreCase(
            Long userId,
            String keyword
    );

    boolean existsByAccountId(Long accountId);
    boolean existsByCategoryId(Long categoryId);
}