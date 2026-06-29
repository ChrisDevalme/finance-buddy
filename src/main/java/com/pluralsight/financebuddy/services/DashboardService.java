package com.pluralsight.financebuddy.services;

import com.pluralsight.financebuddy.dto.DashboardResponse;
import com.pluralsight.financebuddy.enums.TransactionType;
import com.pluralsight.financebuddy.models.Account;
import com.pluralsight.financebuddy.models.Transaction;
import com.pluralsight.financebuddy.repositories.AccountRepository;
import com.pluralsight.financebuddy.repositories.TransactionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DashboardService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public DashboardService(AccountRepository accountRepository,
                            TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    public DashboardResponse getDashboardByUserId(Long userId) {
        List<Account> accounts = accountRepository.findByUserId(userId);
        List<Transaction> transactions = transactionRepository.findByAccountUserId(userId);

        BigDecimal totalBalance = accounts.stream()
                .map(Account::getBalance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalIncome = transactions.stream()
                .filter(t -> t.getType() == TransactionType.INCOME)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpenses = transactions.stream()
                .filter(t -> t.getType() == TransactionType.EXPENSE)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal netCashFlow = totalIncome.subtract(totalExpenses);

        return new DashboardResponse(
                totalBalance,
                totalIncome,
                totalExpenses,
                netCashFlow
        );
    }
}