import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminUsers() {
  const [users, setUsers] = useState(null);      // null = loading
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setError('');
    setUsers(null);
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Could not load users.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`/api/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Could not delete user.');
    }
  };

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }
  if (users === null) {
    return <p className="mt-4">Loading users…</p>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2>Manage Users</h2>
        <Link to="/admin/users/new" className="btn btn-primary">
          + New User
        </Link>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th style={{ width: 150 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => navigate(`/admin/users/${u._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
