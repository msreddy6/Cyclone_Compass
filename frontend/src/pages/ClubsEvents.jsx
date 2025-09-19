import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

export default function ClubsEvents() {
  const { user } = useAuth();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get('/api/clubs')
      .then(res => {
        const formatted = res.data.map(c => ({
          id: c._id,
          name: c.name,
          description: c.description,
          img: c.img
        }));
        setClubs(formatted);
      })
      .catch(err => console.error('Error fetching clubs:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this club/event?')) return;
    try {
      await axios.delete(`/api/clubs/${id}`);
      setClubs(clubs.filter(c => c.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Clubs & Events</h2>
        {user?.role === 'admin' && (
          <Link to="/clubs-events/new" className="btn btn-primary">+ New Club/Event</Link>
        )}
      </div>

      <div className="row">
        {clubs.map(c => (
          <div key={c.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={c.img} className="card-img-top" alt={c.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{c.name}</h5>
                <p className="card-text">{c.description}</p>

                {user?.role === 'admin' && (
                  <div className="mt-auto d-flex justify-content-between">
                    <Link to={`/clubs-events/${c.id}`} className="btn btn-sm btn-info">Edit</Link>
                    <button onClick={() => handleDelete(c.id)} className="btn btn-sm btn-danger">Delete</button>
                  </div>
                )}
              </div>

              <div className="p-3">
                <ReviewList productId={c.id} type="club" />
                {user && <ReviewForm productId={c.id} type="club" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
