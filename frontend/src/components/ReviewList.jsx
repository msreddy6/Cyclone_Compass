import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function ReviewList({ productId, type }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await axios.get('/api/reviews', {
          params: { productId, type }
        });
        setReviews(res.data);
      } catch (err) {
        console.error('ReviewList error:', err);
      }
    }
    fetchReviews();
  }, [productId, type]);

  if (!reviews.length) {
    return <p className="text-muted">No reviews yet.</p>;
  }

  // Compute average rating
  const avg =
    reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length;

  const renderStars = (rating) =>
    [0, 1, 2, 3, 4].map((i) =>
      i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
    );

  // Scroll container style
  const containerStyle = {
    maxHeight: '200px',
    overflowY: 'auto',
    paddingRight: '0.5rem',
    border: '1px solid #dee2e6',
    borderRadius: '0.25rem',
    backgroundColor: '#fafafa'
  };

  return (
    <div className="mb-3">
      {/* Average Rating */}
      <div className="d-flex align-items-center mb-2">
        <div className="me-2 text-warning">
          {renderStars(Math.round(avg))}
        </div>
        <small className="text-muted">
          {avg.toFixed(1)} out of 5 ({reviews.length} reviews)
        </small>
      </div>

      {/* Scrollable list */}
      <div style={containerStyle}>
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="p-3 border-bottom"
            style={{ backgroundColor: '#fff' }}
          >
            <div className="d-flex align-items-center mb-1">
              <strong className="me-2">{rev.user}</strong>
              <div className="text-warning me-auto">
                {renderStars(rev.rating)}
              </div>
              <small className="text-muted">
                {new Date(rev.createdAt).toLocaleDateString()}
              </small>
            </div>
            <p className="mb-0" style={{ lineHeight: 1.4 }}>
              {rev.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
