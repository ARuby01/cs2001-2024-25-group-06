package com.redemption.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.redemption.backend.entities.RecyclingShop;
import com.redemption.backend.repositories.RecyclingShopRepository;

@RestController
@RequestMapping("/api/recycling-shops")
@CrossOrigin(origins = "http://localhost:5174")
public class RecyclingShopController {

    @Autowired
    private RecyclingShopRepository recyclingShopRepository;

    @GetMapping
    public List<RecyclingShop> getAllRecyclingShops() {
        return recyclingShopRepository.findAll();
    }
}
