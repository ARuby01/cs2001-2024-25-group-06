package com.redemption.backend.services;

import com.redemption.backend.entities.Reward;
import com.redemption.backend.entities.User;
import com.redemption.backend.repositories.RewardRepository;
import com.redemption.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RewardRepository rewardRepository;

    // ✅ Get all rewards
    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    // ✅ Get specific reward by ID
    public Reward getRewardById(Long rewardId) {
        return rewardRepository.findById(rewardId)
                .orElseThrow(() -> new RuntimeException("Reward not found"));
    }

    // ✅ Create a reward
    public Reward createReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    // ✅ Update a reward
    public Reward updateReward(Long rewardId, Reward rewardDetails) {
        Reward reward = getRewardById(rewardId);
        reward.setRewardName(rewardDetails.getRewardName());
        reward.setDescription(rewardDetails.getDescription());
        reward.setPointsRequired(rewardDetails.getPointsRequired());
        return rewardRepository.save(reward);
    }

    // ✅ Delete a reward
    public void deleteReward(Long rewardId) {
        rewardRepository.deleteById(rewardId);
    }

    // ✅ Get user by ID
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ✅ Redeem reward (no history saved)
    public String redeemReward(Long userId, Long rewardId) {
        User user = getUserById(userId);
        Reward reward = getRewardById(rewardId);

        if (user.getPoints() < reward.getPointsRequired()) {
            return "Insufficient points!";
        }

        user.setPoints(user.getPoints() - reward.getPointsRequired());
        userRepository.save(user);

        return "Redeemed " + reward.getRewardName() + " successfully!";
    }
}
