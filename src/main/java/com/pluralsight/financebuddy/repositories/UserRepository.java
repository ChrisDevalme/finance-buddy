package com.pluralsight.financebuddy.repositories;

import com.pluralsight.financebuddy.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}