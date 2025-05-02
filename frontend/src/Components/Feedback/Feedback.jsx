import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import feedbackService from "../../services/feedbackService.js";

const FeedbackSection = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const categories = [
    { value: "general", label: "General" },
    { value: "books", label: "Books" },
    { value: "notes", label: "Notes" },
    { value: "question-papers", label: "Question Papers" },
    { value: "technical", label: "Technical" }
  ];

  const resetForm = () => {
    setFeedback("");
    setRating(0);
    setCategory("general");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    
    if (!feedback.trim()) {
      setError("Please enter your feedback");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token");
      
      await feedbackService.submitFeedback(
        { rating, comment: feedback, category },
        token
      );
      
      setSuccess(true);
      resetForm();
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Please log in to submit feedback");
      } else {
        setError(err.response?.data?.message || "Failed to submit feedback");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
      <motion.div 
        className="feedback-form bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Share Your Feedback</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Thank you for your feedback!
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Rating:</label>
            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-3xl focus:outline-none mx-1 transition-colors duration-200"
                  style={{ color: rating >= star ? "#FFB800" : "#D1D5DB" }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Your Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you think..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default FeedbackSection;
