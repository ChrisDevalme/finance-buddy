package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.ApiResponse;
import com.pluralsight.financebuddy.dto.TransactionRequest;
import com.pluralsight.financebuddy.dto.TransactionResponse;
import com.pluralsight.financebuddy.enums.TransactionType;
import com.pluralsight.financebuddy.models.Account;
import com.pluralsight.financebuddy.models.User;
import com.pluralsight.financebuddy.repositories.AccountRepository;
import com.pluralsight.financebuddy.repositories.TransactionRepository;
import com.pluralsight.financebuddy.services.CurrentUserService;
import com.pluralsight.financebuddy.services.TransactionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final CurrentUserService currentUserService;
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public TransactionController(TransactionService transactionService, CurrentUserService currentUserService, TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionService = transactionService;
        this.currentUserService = currentUserService;
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    @PostMapping
    public TransactionResponse createTransaction(@Valid @RequestBody TransactionRequest request) {
        User user = currentUserService.getCurrentUser();
        return transactionService.createTransaction(request, user);
    }

    @GetMapping("/me")
    public List<TransactionResponse> getMyTransactions() {
        Long userId = currentUserService.getCurrentUser().getId();
        return transactionService.getTransactionsByUserId(userId);
    }

    @GetMapping("/{transactionId}")
    public TransactionResponse getTransactionById(@PathVariable Long transactionId) {
        User user = currentUserService.getCurrentUser();
        return transactionService.getTransactionById(transactionId, user);
    }

//    @GetMapping("/user/{userId}")
//    public List<TransactionResponse> getTransactionsByUser(@PathVariable Long userId) {
//        return transactionService.getTransactionsByUserId(userId);
//    }

//    @GetMapping("/account/{accountId}")
//    public List<TransactionResponse> getTransactionsByAccount(@PathVariable Long accountId) {
//        return transactionService.getTransactionsByAccountId(accountId);
//    }

    @GetMapping("/me/account/{accountId}")
    public List<TransactionResponse> getMyTransactionsByAccount(
            @PathVariable Long accountId) {

        User user = currentUserService.getCurrentUser();

        return transactionService.getTransactionsByAccountId(
                accountId,
                user
        );
    }

    @GetMapping("/me/category/{categoryId}")
    public List<TransactionResponse> getMyTransactionsByCategory(@PathVariable Long categoryId) {
        Long userId = currentUserService.getCurrentUser().getId();
        return transactionService.getTransactionsByUserIdAndCategoryId(userId, categoryId);
    }

//    @GetMapping("/user/{userId}/category/{categoryId}")
//    public List<TransactionResponse> getTransactionsByUserAndCategory(
//            @PathVariable Long userId,
//            @PathVariable Long categoryId) {
//        return transactionService.getTransactionsByUserIdAndCategoryId(userId, categoryId);
//    }

    @GetMapping("/me/month")
    public List<TransactionResponse> getMyTransactionsByMonth(
            @RequestParam int month,
            @RequestParam int year) {
        Long userId = currentUserService.getCurrentUser().getId();
        return transactionService.getTransactionsByUserIdAndMonth(userId, month, year);
    }

//    @GetMapping("/user/{userId}/month")
//    public List<TransactionResponse> getTransactionsByUserAndMonth(
//            @PathVariable Long userId,
//            @RequestParam int month,
//            @RequestParam int year) {
//        return transactionService.getTransactionsByUserIdAndMonth(userId, month, year);
//    }

    @GetMapping("/me/search")
    public List<TransactionResponse> searchMyTransactions(@RequestParam String keyword) {
        Long userId = currentUserService.getCurrentUser().getId();
        return transactionService.searchTransactionsByKeyword(userId, keyword);
    }

//    @GetMapping("/user/{userId}/search")
//    public List<TransactionResponse> searchTransactions(
//            @PathVariable Long userId,
//            @RequestParam String keyword) {
//        return transactionService.searchTransactionsByKeyword(userId, keyword);
//    }

    @GetMapping("/me/type")
    public List<TransactionResponse> getMyTransactionsByType(@RequestParam TransactionType type) {
        Long userId = currentUserService.getCurrentUser().getId();
        return transactionService.getTransactionsByUserIdAndType(userId, type);
    }

//    @GetMapping("/user/{userId}/type")
//    public List<TransactionResponse> getTransactionsByUserAndType(
//            @PathVariable Long userId,
//            @RequestParam TransactionType type) {
//        return transactionService.getTransactionsByUserIdAndType(userId, type);
//    }

    @PutMapping("/{transactionId}")
    public TransactionResponse updateTransaction(
            @PathVariable Long transactionId,
            @Valid @RequestBody TransactionRequest request) {

        User user = currentUserService.getCurrentUser();
        return transactionService.updateTransaction(transactionId, request, user);
    }

    @DeleteMapping("/{transactionId}")
    public ApiResponse deleteTransaction(@PathVariable Long transactionId) {
        User user = currentUserService.getCurrentUser();
        return transactionService.deleteTransaction(transactionId, user);
    }
}