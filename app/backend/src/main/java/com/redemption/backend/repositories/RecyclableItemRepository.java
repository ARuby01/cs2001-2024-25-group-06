package com.redemption.backend.repositories;

import com.redemption.backend.entities.RecyclableItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for RecyclableItem entity.
 * Extends JpaRepository to provide built-in CRUD methods
 * for interacting with the database (e.g., save, findById, findAll, delete).
 *
 * The generic parameters <RecyclableItem, Long> specify:
 * - RecyclableItem: the entity type this repository manages
 * - Long: the type of the primary key (itemId in this case)
 */
@Repository
public interface RecyclableItemRepository extends JpaRepository<RecyclableItem, Long> {
    // No custom methods needed at this point - inherits all default JPA operations.
}
