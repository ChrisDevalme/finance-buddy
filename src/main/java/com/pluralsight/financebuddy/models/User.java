package com.pluralsight.financebuddy.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;

    @Setter
    @Getter
    private String lastName;

    @Getter
    @Setter
    @Column(nullable = false, unique = true)
    private String email;

    private String password;

    private LocalDateTime createdAt = LocalDateTime.now();

}