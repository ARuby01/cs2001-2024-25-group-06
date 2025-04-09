package com.redemption.backend.services;

import com.redemption.backend.entities.Content; // Correct import
import com.redemption.backend.repositories.ContentRepository; // Correct import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    // Retrieve all content
    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }

    // Retrieve content by ID
    public Optional<Content> getContentById(Long id) {
        return contentRepository.findById(id);
    }

    // Create new content
    public Content createContent(Content content) {
        // Ensure createdAt is not null
        if (content.getCreatedAt() == null) {
            content.setCreatedAt(LocalDateTime.now());
        }
        return contentRepository.save(content);
    }

    // Delete content by ID
    public void deleteContent(Long id) {
        contentRepository.deleteById(id);
    }
}
