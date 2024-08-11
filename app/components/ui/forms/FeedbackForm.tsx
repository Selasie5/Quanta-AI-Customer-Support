"use clieny"

import React, { useState } from 'react';

interface FeedbackFormProps {
  sessionId: string;
  messageId: string;
  onFeedbackSubmitted: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ sessionId, messageId, onFeedbackSubmitted }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (rating === null) {
      alert("Please provide a rating.");
      return;
    }

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, messageId, rating, comment }),
      });
      alert("Feedback submitted!");
      onFeedbackSubmitted();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="feedback-form bg-gray-800 text-white p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Rate the Response</h3>
      <div className="flex space-x-4 mb-2">
        {[1, 2, 3, 4, 5].map((r) => (
          <label key={r} className="flex items-center space-x-2">
            <input
              type="radio"
              name="rating"
              value={r}
              onChange={() => setRating(r)}
              className="form-radio text-lime-200"
            />
            <span className="text-sm">{r}</span>
          </label>
        ))}
      </div>
      <textarea
        placeholder="Add a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 mb-2 border rounded-lg bg-gray-700 text-white"
      />
      <button
        onClick={handleSubmit}
        className="bg-lime-200 text-black px-4 py-2 rounded-lg hover:bg-lime-300"
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
