import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TestimonialList() {
  const [items, setItems] = useState(null); // null = loading
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get('/api/testimonials');
        if (!Array.isArray(res.data)) {
          throw new Error('Bad response from server');
        }
        setItems(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load testimonials');
      }
    }
    load();
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (items === null) return <p>Loading testimonials…</p>;

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2>Testimonials</h2>
        <button
          className="btn btn-primary"
          onClick={() => nav('/admin/testimonials/new')}
        >
          + New Testimonial
        </button>
      </div>
      <table className="table mt-3">
        <thead>
          <tr><th>Author</th><th>Quote</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {items.map((t) => (
            <tr key={t._id}>
              <td>{t.author}</td>
              <td>{t.quote}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => nav(`/admin/testimonials/${t._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={async () => {
                    if (window.confirm('Delete this testimonial?')) {
                      await axios.delete(`/api/testimonials/${t._id}`);
                      setItems(items.filter(x => x._id !== t._id));
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No testimonials yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
