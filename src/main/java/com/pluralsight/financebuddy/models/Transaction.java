package com.pluralsight.financebuddy.models;

import com.pluralsight.financebuddy.enums.TransactionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private BigDecimal amount;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @Getter
    @Setter
    private LocalDate transactionDate;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}