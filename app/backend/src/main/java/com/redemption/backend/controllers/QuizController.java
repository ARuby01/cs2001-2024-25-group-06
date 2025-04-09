package com.redemption.backend.controllers;

import com.redemption.backend.entities.Quiz;  // Import Quiz model
import com.redemption.backend.services.QuizService;  // Import QuizService
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    private final QuizService quizService;

    // Constructor Injection
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    // ✅ Get all quizzes
    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getAllQuizzes();

        if (quizzes.isEmpty()) {
            return ResponseEntity.ok(List.of()); // ✅ Return empty JSON array `[]` instead of 204 No Content
        }

        return ResponseEntity.ok(quizzes);
    }

    // ✅ Get quiz by ID
    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        Optional<Quiz> quiz = quizService.getQuizById(id);

        return quiz.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)); // ✅ Ensures JSON response
    }

    // ✅ Add a new quiz
    @PostMapping
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) {
        try {
            Quiz createdQuiz = quizService.addQuiz(quiz);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdQuiz);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // ✅ Handle unexpected errors
        }
    }

    // ✅ Delete a quiz by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuiz(@PathVariable Long id) {
        boolean isDeleted = quizService.deleteQuiz(id);
        
        if (isDeleted) {
            return ResponseEntity.ok("Quiz deleted successfully."); // ✅ Return JSON response on success
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quiz not found."); // ✅ Return meaningful error message
        }
    }
}
