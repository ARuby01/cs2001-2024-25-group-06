
package com.redemption.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.redemption.backend.entities.NGO;
import com.redemption.backend.services.NGOService;

@RestController
@RequestMapping("/api/ngos")
@CrossOrigin(origins = "http://localhost:5174") // Adjust if your frontend runs on a different port
public class NGOController {
    private final NGOService ngoService;

    @Autowired
    public NGOController(NGOService ngoService) {
        this.ngoService = ngoService;
    }

    @GetMapping
    public ResponseEntity<List<NGO>> getAllNGOs() {
        return ResponseEntity.ok(ngoService.getAllNGOs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NGO> getNGOById(@PathVariable Long id) {
        Optional<NGO> ngo = ngoService.getNGOById(id);
        return ngo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}


