import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TestimonialForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav    = useNavigate();

  const [form, setForm]   = useState({ author:'', quote:'', avatarUrl:'' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    axios.get('/api/testimonials')
      .then(res => {
        const t = res.data.find(x => x._id === id);
        if (t) setForm({ author:t.author, quote:t.quote, avatarUrl:t.avatarUrl });
        else  setError('Not found');
      })
      .catch(() => setError('Load failed'));
  }, [id, isEdit]);

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isEdit) await axios.put(`/api/testimonials/${id}`, form);
      else        await axios.post('/api/testimonials', form);
      nav('/admin/testimonials');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Save failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth:600 }}>
      <h2 className="mt-4">{isEdit ? 'Edit' : 'New'} Testimonial</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            name="author"
            value={form.author}
            onChange={change}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quote</label>
          <textarea
            name="quote"
            value={form.quote}
            onChange={change}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Avatar URL (optional)</label>
          <input
            name="avatarUrl"
            value={form.avatarUrl}
            onChange={change}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Save Changes' : 'Create Testimonial'}
        </button>
      </form>
    </div>
  );
}
