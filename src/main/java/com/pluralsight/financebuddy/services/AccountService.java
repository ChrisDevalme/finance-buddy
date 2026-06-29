package com.pluralsight.financebuddy.services;

import com.pluralsight.financebuddy.dto.AccountRequest;
import com.pluralsight.financebuddy.dto.AccountResponse;
import com.pluralsight.financebuddy.models.Account;
import com.pluralsight.financebuddy.models.User;
import com.pluralsight.financebuddy.repositories.AccountRepository;
import com.pluralsight.financebuddy.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public AccountService(AccountRepository accountRepository, UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    public List<AccountResponse> getAccountsByUserId(Long userId) {
        return accountRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public AccountResponse createAccount(AccountRequest request, User user) {
        Account account = Account.builder()
                .name(request.getName())
                .type(request.getType())
                .balance(request.getBalance())
                .user(user)
                .build();

        Account savedAccount = accountRepository.save(account);

        return mapToResponse(savedAccount);
    }

    private AccountResponse mapToResponse(Account account) {
        return new AccountResponse(
                account.getId(),
                account.getName(),
                account.getType(),
                account.getBalance(),
                account.getUser().getId()
        );
    }
}