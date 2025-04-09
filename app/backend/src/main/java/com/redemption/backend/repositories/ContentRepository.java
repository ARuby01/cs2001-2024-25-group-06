package com.redemption.backend.repositories;

import com.redemption.backend.entities.Content; // Correct import
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {
    // Custom query methods (if needed) can go here, for now we have the basic CRUD operations
}
