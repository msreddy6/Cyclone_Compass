import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

export default function DormExplorer() {
  const { user } = useAuth();
  const [dorms, setDorms] = useState([]);

  // Fetch dorms from MongoDB
  useEffect(() => {
    async function fetchDorms() {
      try {
        const res = await axios.get('/api/dorms');
        const data = res.data.map(d => ({
          id: d._id,
          name: d.name,
          description: d.description,
          img: d.img
        }));
        setDorms(data);
      } catch (error) {
        console.error('Error fetching dorms:', error);
      }
    }
    fetchDorms();
  }, []);

  // Delete a dorm and refresh list
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this dorm?')) return;
    try {
      await axios.delete(`/api/dorms/${id}`);
      const res = await axios.get('/api/dorms');
      const data = res.data.map(d => ({
        id: d._id,
        name: d.name,
        description: d.description,
        img: d.img
      }));
      setDorms(data);
    } catch (error) {
      console.error('Error deleting dorm:', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dorm Explorer</h2>
        {user?.role === 'admin' && (
          <Link to="/dorm-explorer/new" className="btn btn-primary">
            + New Dorm
          </Link>
        )}
      </div>

      <div className="row">
        {dorms.map((d) => (
          <div key={d.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={d.img} className="card-img-top" alt={d.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{d.name}</h5>
                <p className="card-text">{d.description}</p>

                {user?.role === 'admin' && (
                  <div className="mt-auto d-flex justify-content-between">
                    <Link
                      to={`/dorm-explorer/${d.id}`}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="p-3">
                <ReviewList productId={d.id} type="dorm" />
                {user && <ReviewForm productId={d.id} type="dorm" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
