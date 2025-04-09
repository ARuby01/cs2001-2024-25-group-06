package com.redemption.backend.controllers;

import com.redemption.backend.entities.Content;  // Correct import
import com.redemption.backend.services.ContentService;  // Correct import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contents")
@CrossOrigin(origins = "http://localhost:*") // Allow all ports on localhost
public class ContentController {

    @Autowired
    private ContentService contentService;

    // GET /api/contents - Retrieve all content
    @GetMapping
    public List<Content> getAllContent() {
        return contentService.getAllContent();
    }

    // GET /api/contents/{id} - Retrieve content by ID
    @GetMapping("/{id}")
    public Optional<Content> getContentById(@PathVariable Long id) {
        return contentService.getContentById(id); // ✅ Pass the id parameter
    }

    // POST /api/contents - Create new content
    @PostMapping
    public Content createContent(@RequestBody Content content) {
        // Ensure createdAt is not null
        if (content.getCreatedAt() == null) {
            content.setCreatedAt(LocalDateTime.now());
        }
        return contentService.createContent(content);
    }

    // DELETE /api/contents/{id} - Delete content by ID
    @DeleteMapping("/{id}")
    public void deleteContent(@PathVariable Long id) {
        contentService.deleteContent(id);
    }
}
