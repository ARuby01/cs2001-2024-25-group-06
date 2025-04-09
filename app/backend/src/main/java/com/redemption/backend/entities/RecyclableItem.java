package com.redemption.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "recycling_items")
public class RecyclableItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    private String itemName;

    @Column(name = "points_per_item") // Ensure it maps to the correct DB column
    private int pointsPerItem;

    // Default Constructor
    public RecyclableItem() {}

    // Getters
    public Long getItemId() {
        return itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public int getPointsPerItem() {
        return pointsPerItem;
    }

    // Setters
    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public void setPointsPerItem(int pointsPerItem) {
        this.pointsPerItem = pointsPerItem;
    }
}
