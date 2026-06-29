package com.pluralsight.financebuddy.models;

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
    private String type;

    @Getter
    @Setter
    private LocalDate transactionDate;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}