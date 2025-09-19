// src/pages/admin/TshirtForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TshirtForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav    = useNavigate();

  const [form, setForm] = useState({
    name: '', description: '', img: '', price: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    axios.get(`/api/tshirts/${id}`)
      .then(r => setForm({
        name: r.data.name,
        description: r.data.description,
        img: r.data.img,
        price: r.data.price
      }))
      .catch(e => {
        console.error(e);
        setError('Failed to load product.');
      });
  }, [id, isEdit]);

  const change = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError('');
  };

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isEdit) {
        await axios.put(`/api/tshirts/${id}`, form);
      } else {
        await axios.post('/api/tshirts', form);
      }
      nav('/admin/tshirts');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Save failed.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <h2 className="mt-4">
        {isEdit ? 'Edit Product' : 'New Product'}
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={submit} className="mt-3">
        {['name','description','img','price'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              name={field}
              type={field === 'price' ? 'number' : 'text'}
              className="form-control"
              required
              value={form[field]}
              onChange={change}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Save Changes' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
