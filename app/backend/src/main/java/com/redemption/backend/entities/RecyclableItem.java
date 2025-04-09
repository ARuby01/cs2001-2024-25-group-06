package com.redemption.backend.entities;

import jakarta.persistence.*;

/**
 * Entity class representing a recyclable item in the system.
 * Each item has a name and a specific number of points awarded per item when recycled.
 */
@Entity
@Table(name = "recycling_items") // Maps this entity to the "recycling_items" table in the database
public class RecyclableItem {

    // Unique identifier for each recyclable item (auto-generated)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    // Name/description of the recyclable item (e.g., Plastic Bottle)
    private String itemName;

    // Number of points awarded per item when recycled
    @Column(name = "points_per_item") // Maps to "points_per_item" column in the database
    private int pointsPerItem;

    // Default no-args constructor (required by JPA)
    public RecyclableItem() {}

    // ----- Getters -----

    /**
     * Gets the item ID.
     * @return the unique identifier for the recyclable item.
     */
    public Long getItemId() {
        return itemId;
    }

    /**
     * Gets the item name.
     * @return the name of the recyclable item.
     */
    public String getItemName() {
        return itemName;
    }

    /**
     * Gets the number of points awarded per item.
     * @return points per recyclable item.
     */
    public int getPointsPerItem() {
        return pointsPerItem;
    }

    // ----- Setters -----

    /**
     * Sets the item ID.
     * @param itemId the unique identifier to assign.
     */
    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    /**
     * Sets the item name.
     * @param itemName the name of the recyclable item.
     */
    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    /**
     * Sets the number of points awarded per item.
     * @param pointsPerItem the number of points.
     */
    public void setPointsPerItem(int pointsPerItem) {
        this.pointsPerItem = pointsPerItem;
    }
}
