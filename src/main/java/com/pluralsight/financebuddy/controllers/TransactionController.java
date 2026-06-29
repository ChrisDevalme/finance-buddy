package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.ApiResponse;
import com.pluralsight.financebuddy.dto.TransactionRequest;
import com.pluralsight.financebuddy.dto.TransactionResponse;
import com.pluralsight.financebuddy.enums.TransactionType;
import com.pluralsight.financebuddy.services.TransactionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public TransactionResponse createTransaction(@Valid @RequestBody TransactionRequest request) {
        return transactionService.createTransaction(request);
    }

    @GetMapping("/{transactionId}")
    public TransactionResponse getTransactionById(
            @PathVariable Long transactionId) {

        return transactionService.getTransactionById(transactionId);
    }

    @GetMapping("/user/{userId}")
    public List<TransactionResponse> getTransactionsByUser(@PathVariable Long userId) {
        return transactionService.getTransactionsByUserId(userId);
    }

    @GetMapping("/account/{accountId}")
    public List<TransactionResponse> getTransactionsByAccount(@PathVariable Long accountId) {
        return transactionService.getTransactionsByAccountId(accountId);
    }

    @GetMapping("/user/{userId}/category/{categoryId}")
    public List<TransactionResponse> getTransactionsByUserAndCategory(
            @PathVariable Long userId,
            @PathVariable Long categoryId) {
        return transactionService.getTransactionsByUserIdAndCategoryId(userId, categoryId);
    }

    @GetMapping("/user/{userId}/month")
    public List<TransactionResponse> getTransactionsByUserAndMonth(
            @PathVariable Long userId,
            @RequestParam int month,
            @RequestParam int year) {
        return transactionService.getTransactionsByUserIdAndMonth(userId, month, year);
    }

    @GetMapping("/user/{userId}/search")
    public List<TransactionResponse> searchTransactions(
            @PathVariable Long userId,
            @RequestParam String keyword) {
        return transactionService.searchTransactionsByKeyword(userId, keyword);
    }

    @GetMapping("/user/{userId}/type")
    public List<TransactionResponse> getTransactionsByUserAndType(
            @PathVariable Long userId,
            @RequestParam TransactionType type) {
        return transactionService.getTransactionsByUserIdAndType(userId, type);
    }

    @PutMapping("/{transactionId}")
    public TransactionResponse updateTransaction(
            @PathVariable Long transactionId,
            @Valid @RequestBody TransactionRequest request) {
        return transactionService.updateTransaction(transactionId, request);
    }

    @DeleteMapping("/{transactionId}")
    public ApiResponse deleteTransaction(@PathVariable Long transactionId) {
        return transactionService.deleteTransaction(transactionId);
    }
}