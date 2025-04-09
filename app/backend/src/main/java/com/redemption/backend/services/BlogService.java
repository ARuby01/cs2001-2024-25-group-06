package com.redemption.backend.services;

import com.redemption.backend.entities.Blog;
import com.redemption.backend.repositories.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    // Get all blogs
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // Get a blog by ID
    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    // Create a new blog
    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    // Delete a blog
    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
}
