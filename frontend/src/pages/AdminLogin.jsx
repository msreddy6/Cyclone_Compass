import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/mockApi';

export default function AdminLogin() {
  const [form, setForm] = useState({ username:'', password:'' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const u = await authApi.login(form);
      if (u.role !== 'admin') throw new Error('Not an admin');
      sessionStorage.setItem('admin', JSON.stringify(u));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{maxWidth:400, marginTop:50}}>
      <h2>Admin Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input name="username" className="form-control"
            value={form.username}
            onChange={e=>setForm({...form,username:e.target.value})}
            required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input name="password" type="password" className="form-control"
            value={form.password}
            onChange={e=>setForm({...form,password:e.target.value})}
            required />
        </div>
        <button className="btn btn-primary">Admin Login</button>
      </form>
    </div>
  );
}
