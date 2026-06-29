package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.AccountRequest;
import com.pluralsight.financebuddy.dto.AccountResponse;
import com.pluralsight.financebuddy.models.User;
import com.pluralsight.financebuddy.services.AccountService;
import com.pluralsight.financebuddy.services.CurrentUserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;
    private final CurrentUserService currentUserService;

    public AccountController(AccountService accountService, CurrentUserService currentUserService) {
        this.accountService = accountService;
        this.currentUserService = currentUserService;
    }

    @PostMapping
    public AccountResponse createAccount(@Valid @RequestBody AccountRequest request) {
        User user = currentUserService.getCurrentUser();
        return accountService.createAccount(request, user);
    }

    @GetMapping("/me")
    public List<AccountResponse> getMyAccounts() {
        Long userId = currentUserService.getCurrentUser().getId();
        return accountService.getAccountsByUserId(userId);
    }

    @GetMapping("/user/{userId}")
    public List<AccountResponse> getAccountsByUser(@PathVariable Long userId) {
        return accountService.getAccountsByUserId(userId);
    }
}