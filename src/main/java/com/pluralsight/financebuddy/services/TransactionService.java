package com.pluralsight.financebuddy.services;

import com.pluralsight.financebuddy.dto.ApiResponse;
import com.pluralsight.financebuddy.dto.TransactionRequest;
import com.pluralsight.financebuddy.dto.TransactionResponse;
import com.pluralsight.financebuddy.enums.TransactionType;
import com.pluralsight.financebuddy.models.Account;
import com.pluralsight.financebuddy.models.Category;
import com.pluralsight.financebuddy.models.Transaction;
import com.pluralsight.financebuddy.repositories.AccountRepository;
import com.pluralsight.financebuddy.repositories.CategoryRepository;
import com.pluralsight.financebuddy.repositories.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    @Transactional
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

    public TransactionResponse getTransactionById(Long transactionId) {

        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        return mapToResponse(transaction);
    }

    @Transactional
    public TransactionResponse updateTransaction(Long transactionId, TransactionRequest request) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        Account oldAccount = transaction.getAccount();

        // Step 1: Reverse old transaction effect
        if (transaction.getType() == TransactionType.EXPENSE) {
            oldAccount.setBalance(oldAccount.getBalance().add(transaction.getAmount()));
        } else if (transaction.getType() == TransactionType.INCOME) {
            oldAccount.setBalance(oldAccount.getBalance().subtract(transaction.getAmount()));
        }

        Account newAccount = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Step 2: Update transaction fields
        transaction.setDescription(request.getDescription());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setTransactionDate(request.getTransactionDate());
        transaction.setAccount(newAccount);
        transaction.setCategory(category);

        // Step 3: Apply new transaction effect
        if (transaction.getType() == TransactionType.EXPENSE) {
            newAccount.setBalance(newAccount.getBalance().subtract(transaction.getAmount()));
        } else if (transaction.getType() == TransactionType.INCOME) {
            newAccount.setBalance(newAccount.getBalance().add(transaction.getAmount()));
        }

        accountRepository.save(oldAccount);
        accountRepository.save(newAccount);

        Transaction updatedTransaction = transactionRepository.save(transaction);

        return mapToResponse(updatedTransaction);
    }

    @Transactional
    public ApiResponse deleteTransaction(Long transactionId) {

        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        Account account = transaction.getAccount();

        // Reverse the original transaction
        if (transaction.getType() == TransactionType.EXPENSE) {
            account.setBalance(
                    account.getBalance().add(transaction.getAmount())
            );
        } else if (transaction.getType() == TransactionType.INCOME) {
            account.setBalance(
                    account.getBalance().subtract(transaction.getAmount())
            );
        }

        accountRepository.save(account);

        transactionRepository.delete(transaction);

        return new ApiResponse(
                true,
                "Transaction deleted successfully."
        );
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

    public List<TransactionResponse> getTransactionsByUserIdAndMonth(Long userId, int month, int year) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        return transactionRepository.findByAccountUserIdAndTransactionDateBetween(userId, startDate, endDate)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<TransactionResponse> getTransactionsByUserIdAndType(Long userId, TransactionType type) {
        return transactionRepository.findByAccountUserIdAndType(userId, type)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<TransactionResponse> searchTransactionsByKeyword(Long userId, String keyword) {
        return transactionRepository
                .findByAccountUserIdAndDescriptionContainingIgnoreCase(userId, keyword)
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
                transaction.getNotes(),
                transaction.getAccount().getId(),
                categoryId
        );
    }
}