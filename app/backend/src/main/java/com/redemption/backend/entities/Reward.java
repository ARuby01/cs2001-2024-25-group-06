package com.redemption.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "rewards")
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rewardId;

    private String rewardName;
    private String description;
    private int pointsRequired;

    // Default Constructor
    public Reward() {}

    // Getters
    public Long getRewardId() {
        return rewardId;
    }

    public String getRewardName() {
        return rewardName;
    }

    public String getDescription() {
        return description;
    }

    public int getPointsRequired() {
        return pointsRequired;
    }

    // Setters
    public void setRewardId(Long rewardId) {
        this.rewardId = rewardId;
    }

    public void setRewardName(String rewardName) {
        this.rewardName = rewardName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPointsRequired(int pointsRequired) {
        this.pointsRequired = pointsRequired;
    }
}
