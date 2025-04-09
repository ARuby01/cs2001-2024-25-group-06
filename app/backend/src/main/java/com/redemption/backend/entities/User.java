package com.redemption.backend.entities;

import jakarta.persistence.*;

/**
 * Entity class representing a User in the system.
 * This maps to the "users" table in the database.
 */
@Entity
@Table(name = "users")
public class User {

    // Unique identifier for each user (auto-generated)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    // Username must be unique and not null
    @Column(nullable = false, unique = true)
    private String username;

    // Email must be unique and not null
    @Column(nullable = false, unique = true)
    private String email;

    // Securely stored hashed password (not plaintext)
    @Column(nullable = false)
    private String passwordHash;

    // Full name of the user
    @Column(nullable = false)
    private String fullName;

    // Postcode of the user's location (used for potential location-based features)
    @Column(nullable = false)
    private String postcode;

    // Total number of points the user currently has
    @Column(nullable = false)
    private int points;

    // ----- Constructors -----

    /**
     * Default no-argument constructor required by JPA.
     */
    public User() {}

    // ----- Getters -----

    /**
     * Gets the user's unique ID.
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * Gets the username.
     */
    public String getUsername() {
        return username;
    }

    /**
     * Gets the email address.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Gets the hashed password.
     */
    public String getPasswordHash() {
        return passwordHash;
    }

    /**
     * Gets the user's full name.
     */
    public String getFullName() {
        return fullName;
    }

    /**
     * Gets the user's postcode.
     */
    public String getPostcode() {
        return postcode;
    }

    /**
     * Gets the user's current point balance.
     */
    public int getPoints() {
        return points;
    }

    // ----- Setters -----

    /**
     * Sets the user's unique ID.
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * Sets the username.
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Sets the email address.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Sets the hashed password.
     */
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    /**
     * Sets the user's full name.
     */
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    /**
     * Sets the user's postcode.
     */
    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    /**
     * Sets the user's current point balance.
     */
    public void setPoints(int points) {
        this.points = points;
    }
}
