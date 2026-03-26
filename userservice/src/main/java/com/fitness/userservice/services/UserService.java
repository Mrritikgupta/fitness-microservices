package com.fitness.userservice.services;

import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.models.User;
import com.fitness.userservice.repository.UserRepository;
import jdk.jshell.spi.ExecutionControl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository repository;

    public UserResponse register(RegisterRequest request) {

        if(repository.existsByEmail(request.getEmail())){
            User existingUser= repository.findByEmail(request.getEmail());
            UserResponse userResponse = new UserResponse();
            userResponse.setId(existingUser.getId());
            userResponse.setEmail(existingUser.getEmail());
            userResponse.setFirstName(existingUser.getFirstname());
            userResponse.setLastName(existingUser.getLastname());
            userResponse.setPassword(existingUser.getPassword());
            userResponse.setCreatedAt(existingUser.getCreatedAt());
            userResponse.setUpdatedAt(existingUser.getUpdatedAt());
            return userResponse;
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setFirstname(request.getFirstName());
        user.setKeycloakId(request.getKeycloakId());
        user.setLastname(request.getLastName());
        user.setPassword(request.getPassword());

        User savedUSer= repository.save(user);
        UserResponse userResponse = new UserResponse();
        userResponse.setId(savedUSer.getId());
        userResponse.setEmail(savedUSer.getEmail());
        userResponse.setFirstName(savedUSer.getFirstname());
        userResponse.setLastName(savedUSer.getLastname());
        userResponse.setPassword(savedUSer.getPassword());
        userResponse.setKeycloakId(savedUSer.getKeycloakId());
        userResponse.setCreatedAt(savedUSer.getCreatedAt());
        userResponse.setUpdatedAt(savedUSer.getUpdatedAt());
        return userResponse;


    }

    public UserResponse getUserProfile(String userId) {
        User user = repository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new RuntimeException("User not Found") );
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName(user.getFirstname());
        userResponse.setLastName(user.getLastname());
        userResponse.setPassword(user.getPassword());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        return userResponse;
    }

    public Boolean existByUserId(String userId) {
        log.info("Calling User Service for {}", userId);
        return repository.existsByKeycloakId(userId);

    }
}
