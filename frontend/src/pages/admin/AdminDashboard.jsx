import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/admin/login');
  };

  return (
    <div className="container">
      <h2 className="mt-4">Admin Dashboard</h2>
      <p className="text-muted">
        Welcome, <strong>{user?.username}</strong>
      </p>
      <div className="list-group mt-3">
        <Link className="list-group-item" to="/admin/users">
          Manage Users
        </Link>
        <Link className="list-group-item" to="/admin/testimonials">
          Manage Testimonials
        </Link>
    
    
      </div>
      <button className="btn btn-danger mt-4" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
