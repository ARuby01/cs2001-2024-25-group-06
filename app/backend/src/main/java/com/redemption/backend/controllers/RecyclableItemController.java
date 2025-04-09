package com.redemption.backend.controllers;

import com.redemption.backend.entities.RecyclableItem;
import com.redemption.backend.services.RecyclableItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recyclable-items")
public class RecyclableItemController {

    @Autowired
    private RecyclableItemService recyclableItemService;

    // GET all recyclable items
    @GetMapping("/list")
    public List<RecyclableItem> getAllRecyclableItems() {
        return recyclableItemService.getAllRecyclableItems();
    }

    // POST - Add a new recyclable item
    @PostMapping("/add")
    public ResponseEntity<RecyclableItem> addRecyclableItem(@RequestBody RecyclableItem item) {
        RecyclableItem savedItem = recyclableItemService.addRecyclableItem(item);
        return ResponseEntity.ok(savedItem);
    }

    // PUT - Update an existing recyclable item
    @PutMapping("/{itemId}")
    public ResponseEntity<RecyclableItem> updateRecyclableItem(
            @PathVariable Long itemId,
            @RequestBody RecyclableItem itemDetails) {
        
        Optional<RecyclableItem> updatedItem = recyclableItemService.updateRecyclableItem(itemId, itemDetails);
        
        return updatedItem.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE - Remove a recyclable item
    @DeleteMapping("/{itemId}")
    public ResponseEntity<String> deleteRecyclableItem(@PathVariable Long itemId) {
        boolean deleted = recyclableItemService.deleteRecyclableItem(itemId);
        if (deleted) {
            return ResponseEntity.ok("Recyclable item deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ NEW: POST - Recycle an item (adds points based on itemId)
    @PostMapping("/recycle")
    public ResponseEntity<String> recycle(@RequestParam Long userId, @RequestParam Long itemId) {
        return recyclableItemService.handleRecycling(userId, itemId);
    }

}
