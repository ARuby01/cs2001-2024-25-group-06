package com.redemption.backend.controllers;

import com.redemption.backend.entities.RecyclableItem;
import com.redemption.backend.services.RecyclableItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller to handle all HTTP requests related to recyclable items.
 */
@RestController
@RequestMapping("/api/recyclable-items")
public class RecyclableItemController {

    @Autowired
    private RecyclableItemService recyclableItemService;

    /**
     * GET /list
     * Retrieves all recyclable items in the system.
     * @return a list of RecyclableItem objects.
     */
    @GetMapping("/list")
    public List<RecyclableItem> getAllRecyclableItems() {
        return recyclableItemService.getAllRecyclableItems();
    }

    /**
     * POST /add
     * Adds a new recyclable item to the system.
     * @param item the item data passed in the request body.
     * @return the saved RecyclableItem object.
     */
    @PostMapping("/add")
    public ResponseEntity<RecyclableItem> addRecyclableItem(@RequestBody RecyclableItem item) {
        RecyclableItem savedItem = recyclableItemService.addRecyclableItem(item);
        return ResponseEntity.ok(savedItem);
    }

    /**
     * PUT /{itemId}
     * Updates an existing recyclable item based on its ID.
     * @param itemId the ID of the item to update.
     * @param itemDetails the updated item data.
     * @return the updated RecyclableItem if found, otherwise 404 Not Found.
     */
    @PutMapping("/{itemId}")
    public ResponseEntity<RecyclableItem> updateRecyclableItem(
            @PathVariable Long itemId,
            @RequestBody RecyclableItem itemDetails) {
        
        Optional<RecyclableItem> updatedItem = recyclableItemService.updateRecyclableItem(itemId, itemDetails);
        
        return updatedItem.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * DELETE /{itemId}
     * Deletes a recyclable item based on its ID.
     * @param itemId the ID of the item to delete.
     * @return success message if deleted, or 404 if not found.
     */
    @DeleteMapping("/{itemId}")
    public ResponseEntity<String> deleteRecyclableItem(@PathVariable Long itemId) {
        boolean deleted = recyclableItemService.deleteRecyclableItem(itemId);
        if (deleted) {
            return ResponseEntity.ok("Recyclable item deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * POST /recycle
     * Recycles an item for a specific user. Adds points to the user based on the item.
     * @param userId the ID of the user performing the recycling.
     * @param itemId the ID of the recyclable item.
     * @return a success message if processed correctly.
     */
    @PostMapping("/recycle")
    public ResponseEntity<String> recycle(@RequestParam Long userId, @RequestParam Long itemId) {
        return recyclableItemService.handleRecycling(userId, itemId);
    }

}
