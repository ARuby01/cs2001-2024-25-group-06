package com.redemption.backend.controllers;

import com.redemption.backend.entities.Reward;
import com.redemption.backend.entities.User;
import com.redemption.backend.services.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {

    @Autowired
    private RewardService rewardService;

    // ✅ Get all rewards
    @GetMapping("/list")
    public List<Reward> getAllRewards() {
        return rewardService.getAllRewards();
    }

    // ✅ Get a specific reward by ID
    @GetMapping("/{rewardId}")
    public Reward getRewardById(@PathVariable Long rewardId) {
        return rewardService.getRewardById(rewardId);
    }

    // ✅ Create a new reward
    @PostMapping("/create")
    public ResponseEntity<Reward> createReward(@RequestBody Reward reward) {
        Reward savedReward = rewardService.createReward(reward);
        return ResponseEntity.ok(savedReward);
    }

    // ✅ Update an existing reward
    @PutMapping("/{rewardId}")
    public ResponseEntity<Reward> updateReward(@PathVariable Long rewardId, @RequestBody Reward rewardDetails) {
        Reward updatedReward = rewardService.updateReward(rewardId, rewardDetails);
        return ResponseEntity.ok(updatedReward);
    }

    // ✅ Delete a reward
    @DeleteMapping("/{rewardId}")
    public ResponseEntity<String> deleteReward(@PathVariable Long rewardId) {
        rewardService.deleteReward(rewardId);
        return ResponseEntity.ok("Reward deleted successfully!");
    }

    // ✅ Get user details by userId
    @GetMapping("/user/{userId}")
    public User getUser(@PathVariable Long userId) {
        return rewardService.getUserById(userId);
    }

    // ✅ Redeem a reward (deducts points server-side)
    @PostMapping("/redeem")
    public ResponseEntity<String> redeemReward(@RequestParam Long userId, @RequestParam Long rewardId) {
        String response = rewardService.redeemReward(userId, rewardId);
        return ResponseEntity.ok(response);
    }
}
