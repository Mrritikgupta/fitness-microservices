package com.fitness.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fitness.userservice.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
}