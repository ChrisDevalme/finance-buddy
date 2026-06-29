package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.TransactionRequest;
import com.pluralsight.financebuddy.dto.TransactionResponse;
import com.pluralsight.financebuddy.services.TransactionService;
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
    public TransactionResponse createTransaction(@RequestBody TransactionRequest request) {
        return transactionService.createTransaction(request);
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
}