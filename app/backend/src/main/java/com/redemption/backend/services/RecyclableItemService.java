package com.redemption.backend.services;

import com.redemption.backend.entities.RecyclableItem;
import com.redemption.backend.entities.User;
import com.redemption.backend.repositories.RecyclableItemRepository;
import com.redemption.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//all services
@Service
public class RecyclableItemService {

    @Autowired
    private RecyclableItemRepository recyclableItemRepository;

    @Autowired
    private UserRepository userRepository;

    public List<RecyclableItem> getAllRecyclableItems() {
        return recyclableItemRepository.findAll();
    }

    public RecyclableItem addRecyclableItem(RecyclableItem item) {
        return recyclableItemRepository.save(item);
    }

    public Optional<RecyclableItem> updateRecyclableItem(Long itemId, RecyclableItem itemDetails) {
        return recyclableItemRepository.findById(itemId).map(existingItem -> {
            existingItem.setItemName(itemDetails.getItemName());
            existingItem.setPointsPerItem(itemDetails.getPointsPerItem());
            return recyclableItemRepository.save(existingItem);
        });
    }

    public boolean deleteRecyclableItem(Long itemId) {
        if (recyclableItemRepository.existsById(itemId)) {
            recyclableItemRepository.deleteById(itemId);
            return true;
        }
        return false;
    }

    //  Handle recycling redemption
    public ResponseEntity<String> handleRecycling(Long userId, Long itemId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<RecyclableItem> itemOpt = recyclableItemRepository.findById(itemId);

        if (userOpt.isEmpty() || itemOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid user or item ID.");
        }

        User user = userOpt.get();
        RecyclableItem item = itemOpt.get();

        int pointsToAdd = item.getPointsPerItem();
        user.setPoints(user.getPoints() + pointsToAdd);
        userRepository.save(user);

        return ResponseEntity.ok("You earned " + pointsToAdd + " points!");
    }
}
