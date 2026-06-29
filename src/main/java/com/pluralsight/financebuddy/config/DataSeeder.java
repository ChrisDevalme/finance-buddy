package com.pluralsight.financebuddy.config;

import com.pluralsight.financebuddy.enums.TransactionType;
import com.pluralsight.financebuddy.models.*;
import com.pluralsight.financebuddy.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(
            UserRepository userRepository,
            AccountRepository accountRepository,
            CategoryRepository categoryRepository,
            TransactionRepository transactionRepository,
            BudgetRepository budgetRepository
    ) {
        return args -> {
            if (userRepository.findByEmail("chris.demo@example.com").isPresent()) {
                return;
            }

            User user = User.builder()
                    .firstName("Chris")
                    .lastName("Demo")
                    .email("chris.demo@example.com")
                    .build();

            userRepository.save(user);

            Category food = Category.builder().name("Food").user(user).build();
            Category rent = Category.builder().name("Rent").user(user).build();
            Category income = Category.builder().name("Income").user(user).build();
            Category gas = Category.builder().name("Gas").user(user).build();

            categoryRepository.saveAll(List.of(food, rent, income, gas));

            Account checking = Account.builder()
                    .name("Chase Checking")
                    .type("CHECKING")
                    .balance(new BigDecimal("3500.00"))
                    .user(user)
                    .build();

            accountRepository.save(checking);

            Transaction paycheck = Transaction.builder()
                    .description("Paycheck")
                    .amount(new BigDecimal("2500.00"))
                    .type(TransactionType.INCOME)
                    .transactionDate(LocalDate.of(2026, 6, 1))
                    .account(checking)
                    .category(income)
                    .build();

            Transaction chipotle = Transaction.builder()
                    .description("Chipotle")
                    .amount(new BigDecimal("18.75"))
                    .type(TransactionType.EXPENSE)
                    .transactionDate(LocalDate.of(2026, 6, 10))
                    .account(checking)
                    .category(food)
                    .notes("Lunch after work")
                    .build();

            Transaction rentPayment = Transaction.builder()
                    .description("Apartment Rent")
                    .amount(new BigDecimal("1200.00"))
                    .type(TransactionType.EXPENSE)
                    .transactionDate(LocalDate.of(2026, 6, 1))
                    .account(checking)
                    .category(rent)
                    .build();

            Transaction gasStation = Transaction.builder()
                    .description("Shell Gas")
                    .amount(new BigDecimal("45.50"))
                    .type(TransactionType.EXPENSE)
                    .transactionDate(LocalDate.of(2026, 6, 14))
                    .account(checking)
                    .category(gas)
                    .build();

            transactionRepository.saveAll(List.of(paycheck, chipotle, rentPayment, gasStation));

            Budget foodBudget = Budget.builder()
                    .monthlyLimit(new BigDecimal("500.00"))
                    .month(6)
                    .year(2026)
                    .user(user)
                    .category(food)
                    .build();

            Budget gasBudget = Budget.builder()
                    .monthlyLimit(new BigDecimal("250.00"))
                    .month(6)
                    .year(2026)
                    .user(user)
                    .category(gas)
                    .build();

            budgetRepository.saveAll(List.of(foodBudget, gasBudget));
        };
    }
}