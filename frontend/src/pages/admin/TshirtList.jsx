import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TshirtList() {
  const [items, setItems] = useState(null);  // null = loading
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setError(''); setItems(null);
    try {
      const res = await axios.get('/api/tshirts');
      setItems(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load T-shirts.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`/api/tshirts/${id}`);
      load();
    } catch (err) {
      console.error(err);
      setError('Delete failed.');
    }
  };

  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (items === null) return <p className="mt-4">Loading T-shirts…</p>;

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2>T-Shirt Products</h2>
        <button
          className="btn btn-primary"
          onClick={() => nav('/admin/tshirts/new')}
        >
          + New
        </button>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th><th>Price</th><th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => nav(`/admin/tshirts/${p._id}`)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
