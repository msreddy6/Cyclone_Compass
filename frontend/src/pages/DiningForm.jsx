import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function DiningForm() {
  const { id } = useParams(); // undefined for new, present for edit
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    img: ''
  });

  const [error, setError] = useState('');

  // Fetch existing dining center if editing
  useEffect(() => {
    if (isEdit) {
      axios.get('/api/dining')
        .then((res) => {
          const existing = res.data.find(d => d._id === id);
          if (existing) {
            setForm({
              name: existing.name,
              description: existing.description,
              img: existing.img
            });
          } else {
            setError('Dining center not found.');
          }
        })
        .catch((err) => setError('Error loading dining data.'));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`/api/dining/${id}`, form);
      } else {
        await axios.post('/api/dining', form);
      }
      navigate('/dining-guide');
    } catch (err) {
      setError('Submit failed. Please try again.');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2>{isEdit ? 'Edit Dining Center' : 'Add New Dining Center'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            name="img"
            value={form.img}
            onChange={handleChange}
            className="form-control"
            placeholder="/images/dining.jpg"
          />
        </div>

        <button type="submit" className="btn btn-success">
          {isEdit ? 'Save Changes' : 'Create'}
        </button>
      </form>
    </div>
  );
}
