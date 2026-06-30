package com.pluralsight.financebuddy.services;

import com.pluralsight.financebuddy.dto.AccountRequest;
import com.pluralsight.financebuddy.dto.AccountResponse;
import com.pluralsight.financebuddy.dto.ApiResponse;
import com.pluralsight.financebuddy.models.Account;
import com.pluralsight.financebuddy.models.User;
import com.pluralsight.financebuddy.repositories.AccountRepository;
import com.pluralsight.financebuddy.repositories.TransactionRepository;
import com.pluralsight.financebuddy.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public AccountService(AccountRepository accountRepository, UserRepository userRepository, TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
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

    public AccountResponse updateAccount(Long accountId, AccountRequest request, User user) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!account.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You do not have access to this account");
        }

        account.setName(request.getName());
        account.setType(request.getType());
        account.setBalance(request.getBalance());

        Account updatedAccount = accountRepository.save(account);

        return mapToResponse(updatedAccount);
    }

    public ApiResponse deleteAccount(Long accountId, User user) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!account.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You do not have access to this account");
        }

        if (transactionRepository.existsByAccountId(accountId)) {
            throw new RuntimeException("Cannot delete account with existing transactions");
        }

        accountRepository.delete(account);

        return new ApiResponse(true, "Account deleted successfully.");
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