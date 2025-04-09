import React, { useState, useEffect } from "react";
import "./EducationHub.css";

const EducationHub = () => {
  const [activeTab, setActiveTab] = useState("Blogs");
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(null); // Track selected quiz question id
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blogs and videos from backend
 
    // Fetch blogs from backend
    useEffect(() => {
      fetch("http://localhost:8080/api/blogs")
        .then((response) => {
          console.log("Fetched:", response); // ✅ Log response
          if (!response.ok) {
            throw new Error("Failed to fetch blogs");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Blogs fetched:", data); // ✅ Log fetched data
          setBlogs(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, []);
    
    useEffect(() => {
      fetch("http://localhost:8080/api/videos")
        .then((response) => {
          console.log("Fetched:", response); // ✅ Log response
          if (!response.ok) {
            throw new Error("Failed to fetch videos");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Videos fetched:", data); // ✅ Log fetched data
          setVideos(data);
        })
        .catch((error) => {
          console.error("Error fetching videos:", error);
          setError(error.message);
        });
    }, []);

    useEffect(() => {
      fetch("http://localhost:8080/api/quiz")
        .then((response) => {
          console.log("Fetched Response:", response);  // Debugging: Check the response in the console
          if (!response.ok) {
            throw new Error("Failed to fetch quizzes");
          }
          return response.text();  // Get the response body as text
        })
        .then((text) => {
          if (text) {
            return JSON.parse(text);  // Parse JSON if text exists
          }
          return [];  // Return an empty array if no content
        })
        .then((data) => {
          console.log("Quizzes Fetched:", data);  // Debugging: Check the data in the console
          setQuizzes(data);  // Set quizzes state with fetched data
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching quizzes:", error);
          setError(error.message);  // Set error state
          setLoading(false);
        });
    }, []);

    const handleAnswerClick = (selected, correctAnswer, quizId) => {
      setSelectedAnswer(selected);
      setSelectedQuizId(quizId);  // Store the quiz ID when an answer is selected
    };
    
    
  // Handle blog click to toggle showing body
  const handleBlogClick = (blog) => {
    if (selectedBlog && selectedBlog.id === blog.id) {
      setSelectedBlog(null); // Close the blog if clicked again
    } else {
      setSelectedBlog(blog); // Show the clicked blog's body
    }
  };

  return (
    <div className="education-hub">
      <h2 className="title">Education Hub</h2>

      {/* Tabs for Switching Between Blogs, Videos, and Quizzes */}
      <div className="tabs">
        {["Blogs", "Videos", "Quizzes"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Display Content Based on Active Tab */}
      <div className="content">
        {activeTab === "Blogs" && (
          <>
            {loading && <p>Loading blogs...</p>}
            {error && <p className="error">{error}</p>}
            {blogs.length === 0 && !loading && !error && <p>No blogs available.</p>}
            {blogs.map((blog) => (
              <div key={blog.id} className="card" onClick={() => handleBlogClick(blog)}>
                <h3>{blog.title}</h3>
                {selectedBlog && selectedBlog.id === blog.id && (
                  <div className="blog-body">
                    <p>{blog.body}</p>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {activeTab === "Videos" && (
          <div className="video-grid">
            {videos.length === 0 && <p>No videos available.</p>}
            {videos.map((video) => (
              <div key={video.id} className="video-card">
                <h3>{video.title}</h3>
                <div className="video-player">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        )}

{activeTab === "Quizzes" && (
  <div className="quiz-section">
    {loading && <p>Loading quizzes...</p>}
    {error && <p className="error">{error}</p>}
    {quizzes.length === 0 && !loading && !error && <p>No quizzes available.</p>}

    {quizzes.map((quiz) => (
      <div key={quiz.id} className="quiz-card">
        <h3>{quiz.question}</h3>
        <div className="options">
          {[quiz.option1, quiz.option2, quiz.option3].map((option, index) => (
            <button
              key={index}
              className={
                selectedAnswer === option
                  ? option === quiz.correctAnswer
                    ? "correct"
                    : "incorrect"
                  : ""
              }
              onClick={() => handleAnswerClick(option, quiz.correctAnswer, quiz.id)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Only show feedback for the selected quiz question */}
        {selectedQuizId === quiz.id && selectedAnswer && (
          <p className={selectedAnswer === quiz.correctAnswer ? "success" : "error"}>
            {selectedAnswer === quiz.correctAnswer ? "Well done!" : "Try again!"}
          </p>
        )}
      </div>
    ))}
  </div>
)}
      </div>
    </div>
  );
};

export default EducationHub;
