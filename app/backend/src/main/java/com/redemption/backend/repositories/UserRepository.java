package com.redemption.backend.repositories;

import com.redemption.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for the User entity.
 * Extends JpaRepository to provide basic CRUD operations
 * such as save, findAll, findById, deleteById, etc.
 *
 * Parameters:
 * - User: the entity class this repository manages.
 * - Long: the type of the primary key (userId).
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Additional custom query methods (e.g., findByUsername, findByEmail) can be added here if needed.
}
