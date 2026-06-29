package com.pluralsight.financebuddy.controllers;

import com.pluralsight.financebuddy.dto.AccountRequest;
import com.pluralsight.financebuddy.dto.AccountResponse;
import com.pluralsight.financebuddy.services.AccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public AccountResponse createAccount(@RequestBody AccountRequest request) {
        return accountService.createAccount(request);
    }

    @GetMapping("/user/{userId}")
    public List<AccountResponse> getAccountsByUser(@PathVariable Long userId) {
        return accountService.getAccountsByUserId(userId);
    }
}