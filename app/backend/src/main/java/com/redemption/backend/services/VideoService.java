package com.redemption.backend.services;

import com.redemption.backend.entities.Video;
import com.redemption.backend.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    // Get all videos
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    // Get video by ID
    public Optional<Video> getVideoById(Long id) {
        return videoRepository.findById(id);
    }

    // Create new video
    public Video createVideo(Video video) {
        // Ensure createdAt is not null
        if (video.getCreatedAt() == null) {
            video.setCreatedAt(LocalDateTime.now());
        }
        return videoRepository.save(video);
    }

    // Delete video by ID
    public void deleteVideoById(Long id) {
        if (videoRepository.existsById(id)) { // Check if video exists before deleting
            videoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Video not found with ID: " + id);
        }
    }
}
