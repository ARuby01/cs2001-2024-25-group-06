package com.redemption.backend.services;

import com.redemption.backend.entities.User;
import com.redemption.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a user by ID
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    // Create a new user
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Update user points
    public Optional<User> updateUserPoints(Long userId, int points) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPoints(points);
            return Optional.of(userRepository.save(user));
        }
        return Optional.empty();
    }

    // Delete a user
    public boolean deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}
