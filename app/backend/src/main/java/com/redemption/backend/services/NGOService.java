
package com.redemption.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.redemption.backend.entities.NGO;
import com.redemption.backend.repositories.NGORepository;

@Service
public class NGOService {
    @Autowired
    private NGORepository ngoRepository;

    public List<NGO> getAllNGOs() {
        return ngoRepository.findAll();
    }

    public Optional<NGO> getNGOById(Long id) {
        return ngoRepository.findById(id);
    }

    public NGO saveNGO(NGO ngo) {
        return ngoRepository.save(ngo);
    }
}

