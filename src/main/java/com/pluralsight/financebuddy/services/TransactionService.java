package com.pluralsight.financebuddy.services;

import com.pluralsight.financebuddy.dto.TransactionRequest;
import com.pluralsight.financebuddy.dto.TransactionResponse;
import com.pluralsight.financebuddy.enums.TransactionType;
import com.pluralsight.financebuddy.models.Account;
import com.pluralsight.financebuddy.models.Category;
import com.pluralsight.financebuddy.models.Transaction;
import com.pluralsight.financebuddy.repositories.AccountRepository;
import com.pluralsight.financebuddy.repositories.CategoryRepository;
import com.pluralsight.financebuddy.repositories.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final CategoryRepository categoryRepository;

    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository, CategoryRepository categoryRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.categoryRepository = categoryRepository;
    }

    public TransactionResponse createTransaction(TransactionRequest request) {
        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Transaction transaction = new Transaction();
        transaction.setDescription(request.getDescription());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setTransactionDate(request.getTransactionDate());
        transaction.setAccount(account);
        transaction.setCategory(category);

        if (transaction.getType() == TransactionType.EXPENSE) {
            account.setBalance(account.getBalance().subtract(transaction.getAmount()));
        }
        else if (transaction.getType() == TransactionType.INCOME) {
            account.setBalance(account.getBalance().add(transaction.getAmount()));
        }

        accountRepository.save(account);
        Transaction savedTransaction = transactionRepository.save(transaction);

        return mapToResponse(savedTransaction);
    }

    public List<TransactionResponse> getTransactionsByUserId(Long userId) {
        return transactionRepository.findByAccountUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<TransactionResponse> getTransactionsByAccountId(Long accountId) {
        return transactionRepository.findByAccountId(accountId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<TransactionResponse> getTransactionsByUserIdAndCategoryId(Long userId, Long categoryId) {
        return transactionRepository.findByAccountUserIdAndCategoryId(userId, categoryId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private TransactionResponse mapToResponse(Transaction transaction) {
        Long categoryId = null;

        if (transaction.getCategory() != null) {
            categoryId = transaction.getCategory().getId();
        }
        return new TransactionResponse(
                transaction.getId(),
                transaction.getDescription(),
                transaction.getAmount(),
                transaction.getType(),
                transaction.getTransactionDate(),
                transaction.getAccount().getId(),
                categoryId
        );
    }
}