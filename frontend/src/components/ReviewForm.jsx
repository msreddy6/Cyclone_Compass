import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function ReviewForm({ productId, type }) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post('/api/reviews', {
        productId,
        type,
        user: user.username,
        text,
        rating: Number(rating),
      });
      console.log('Review submitted:', res.data);
      setText('');
      setRating(5);
      setError('');
    } catch (err) {
      console.error('ReviewForm error:', err);
      setError(err.response?.data?.error || 'Failed to submit review');
    }
  };

  // Only show if user is logged in
  if (!user) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h6 className="mb-2">Leave a Review</h6>
      {error && <div className="alert alert-danger">{error}</div>}
      <textarea
        className="form-control mb-2"
        rows={2}
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <div className="d-flex justify-content-between align-items-center">
        <select
          className="form-select form-select-sm w-auto"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>
        <button className="btn btn-sm btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
