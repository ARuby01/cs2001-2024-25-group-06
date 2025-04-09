package com.redemption.backend.repositories;

import com.redemption.backend.entities.RecyclableItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecyclableItemRepository extends JpaRepository<RecyclableItem, Long> {
}
