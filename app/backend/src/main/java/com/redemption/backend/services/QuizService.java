package com.redemption.backend.services;

import com.redemption.backend.entities.Quiz;
import com.redemption.backend.repositories.QuizRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class QuizService {

    private final QuizRepository quizRepository;

    // Constructor Injection
    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    // Get all quizzes
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    // Get quiz by ID with proper exception handling
    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }
    
    // Add a new quiz with validation
    public Quiz addQuiz(Quiz quiz) {
        if (quiz == null) {
            throw new IllegalArgumentException("Quiz object cannot be null");
        }
        if (quiz.getQuestion() == null || quiz.getQuestion().trim().isEmpty()) {
            throw new IllegalArgumentException("Question cannot be empty");
        }
        if (quiz.getCorrectOption() == null || quiz.getCorrectOption() < 1 || quiz.getCorrectOption() > 3) {
            throw new IllegalArgumentException("CorrectOption must be between 1 and 3");
        }
        return quizRepository.save(quiz);
    }

    // Delete a quiz by ID with validation
    public boolean deleteQuiz(Long id) {
        if (quizRepository.existsById(id)) {
            quizRepository.deleteById(id);
            return true;
        } else {
            throw new NoSuchElementException("Quiz with ID " + id + " not found");
        }
    }
}
