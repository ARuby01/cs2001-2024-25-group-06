package com.redemption.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.redemption.backend.entities.NGO;

@Repository
public interface NGORepository extends JpaRepository<NGO, Long> {
}

