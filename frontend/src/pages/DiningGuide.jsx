import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

export default function DiningGuide() {
  const { user } = useAuth();
  const [diningList, setDiningList] = useState([]);

  useEffect(() => {
    axios.get('/api/dining')
      .then(res => {
        const formatted = res.data.map(d => ({
          id: d._id,
          name: d.name,
          description: d.description,
          img: d.img
        }));
        setDiningList(formatted);
      })
      .catch(err => console.error('Error fetching dining:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this dining center?')) return;
    try {
      await axios.delete(`/api/dining/${id}`);
      setDiningList(diningList.filter(d => d.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dining Guide</h2>
        {user?.role === 'admin' && (
          <Link to="/dining-guide/new" className="btn btn-primary">+ New Dining</Link>
        )}
      </div>

      <div className="row">
        {diningList.map(d => (
          <div key={d.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={d.img} className="card-img-top" alt={d.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{d.name}</h5>
                <p className="card-text">{d.description}</p>

                {user?.role === 'admin' && (
                  <div className="mt-auto d-flex justify-content-between">
                    <Link to={`/dining-guide/${d.id}`} className="btn btn-sm btn-info">Edit</Link>
                    <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger">Delete</button>
                  </div>
                )}
              </div>

              <div className="p-3">
                <ReviewList productId={d.id} type="dining" />
                {user && <ReviewForm productId={d.id} type="dining" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
