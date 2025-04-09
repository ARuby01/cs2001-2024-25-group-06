package com.redemption.backend.repositories;

import com.redemption.backend.entities.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for the Reward entity.
 * Extends JpaRepository to provide basic CRUD operations
 * such as save, findAll, findById, deleteById, etc.
 *
 * Parameters:
 * - Reward: the entity class this repository manages.
 * - Long: the type of the primary key (rewardId).
 */
@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
    // Inherits standard CRUD methods from JpaRepository.
    // Custom query methods can be added here if needed in the future.
}
