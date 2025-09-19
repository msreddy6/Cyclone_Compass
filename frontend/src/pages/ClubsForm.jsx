import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ClubsForm() {
  const { id } = useParams();                // undefined for “new”
  const isEdit = Boolean(id);                // true if editing
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    img: ''
  });
  const [error, setError] = useState('');

  // If editing, load that club’s data
  useEffect(() => {
    if (!isEdit) return;
    async function fetchClub() {
      try {
        // We only have GET /api/clubs, so fetch all and find the one we need
        const res = await axios.get('/api/clubs');
        const club = res.data.find(c => c._id === id);
        if (!club) {
          setError('Club/Event not found');
        } else {
          setForm({
            name: club.name,
            description: club.description,
            img: club.img
          });
        }
      } catch (err) {
        console.error('Error loading club:', err);
        setError('Error loading data');
      }
    }
    fetchClub();
  }, [id, isEdit]);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let res;
      if (isEdit) {
        res = await axios.put(`/api/clubs/${id}`, form);
      } else {
        res = await axios.post('/api/clubs', form);
      }
      console.log('Success:', res.data);
      navigate('/clubs-events');
    } catch (err) {
      console.error('❌ ClubsForm error:', err);
      const msg = err.response?.data?.error
                || err.message
                || 'Unknown error';
      setError(`Submit failed: ${msg}`);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2>{isEdit ? 'Edit Club/Event' : 'Add Club or Event'}</h2>
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
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            name="img"
            value={form.img}
            onChange={handleChange}
            className="form-control"
            placeholder="/images/club.jpg"
          />
        </div>

        <button type="submit" className="btn btn-success">
          {isEdit ? 'Save Changes' : 'Create Club/Event'}
        </button>
      </form>
    </div>
  );
}
