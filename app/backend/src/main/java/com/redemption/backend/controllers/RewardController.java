package com.redemption.backend.controllers;

import com.redemption.backend.entities.Reward;
import com.redemption.backend.entities.User;
import com.redemption.backend.services.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller to handle all reward-related HTTP requests.
 */
@RestController
@RequestMapping("/api/rewards")
public class RewardController {

    @Autowired
    private RewardService rewardService;

    /**
     * GET /list
     * Fetches all rewards from the database.
     * @return a list of all Reward objects.
     */
    @GetMapping("/list")
    public List<Reward> getAllRewards() {
        return rewardService.getAllRewards();
    }

    /**
     * GET /{rewardId}
     * Fetches a specific reward by its ID.
     * @param rewardId the ID of the reward to fetch.
     * @return the Reward object if found.
     */
    @GetMapping("/{rewardId}")
    public Reward getRewardById(@PathVariable Long rewardId) {
        return rewardService.getRewardById(rewardId);
    }

    /**
     * POST /create
     * Creates a new reward and saves it to the database.
     * @param reward the reward data sent in the request body.
     * @return the newly created Reward object.
     */
    @PostMapping("/create")
    public ResponseEntity<Reward> createReward(@RequestBody Reward reward) {
        Reward savedReward = rewardService.createReward(reward);
        return ResponseEntity.ok(savedReward);
    }

    /**
     * PUT /{rewardId}
     * Updates the details of an existing reward.
     * @param rewardId the ID of the reward to update.
     * @param rewardDetails the updated reward information.
     * @return the updated Reward object.
     */
    @PutMapping("/{rewardId}")
    public ResponseEntity<Reward> updateReward(@PathVariable Long rewardId, @RequestBody Reward rewardDetails) {
        Reward updatedReward = rewardService.updateReward(rewardId, rewardDetails);
        return ResponseEntity.ok(updatedReward);
    }

    /**
     * DELETE /{rewardId}
     * Deletes a reward by its ID.
     * @param rewardId the ID of the reward to delete.
     * @return a success message if deletion is successful.
     */
    @DeleteMapping("/{rewardId}")
    public ResponseEntity<String> deleteReward(@PathVariable Long rewardId) {
        rewardService.deleteReward(rewardId);
        return ResponseEntity.ok("Reward deleted successfully!");
    }

    /**
     * GET /user/{userId}
     * Fetches user details based on user ID.
     * This is used during redemption to validate user data.
     * @param userId the ID of the user.
     * @return the User object.
     */
    @GetMapping("/user/{userId}")
    public User getUser(@PathVariable Long userId) {
        return rewardService.getUserById(userId);
    }

    /**
     * POST /redeem
     * Handles the logic of redeeming a reward for a specific user.
     * Deducts the required points from the user and processes the reward.
     * @param userId the ID of the user redeeming the reward.
     * @param rewardId the ID of the reward being redeemed.
     * @return a success message.
     */
    @PostMapping("/redeem")
    public ResponseEntity<String> redeemReward(@RequestParam Long userId, @RequestParam Long rewardId) {
        String response = rewardService.redeemReward(userId, rewardId);
        return ResponseEntity.ok(response);
    }
}
