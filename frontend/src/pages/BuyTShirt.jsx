import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

export default function BuyTShirt() {
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [tshirts, setTshirts] = useState([]);

  useEffect(() => {
    axios.get('/api/tshirts')
      .then(res => setTshirts(
        res.data.map(t => ({
          id: t._id,
          name: t.name,
          description: t.description,
          img: t.img,
          price: t.price
        }))
      ))
      .catch(err => console.error('Error fetching t-shirts:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`/api/tshirts/${id}`);
      setTshirts(ts => ts.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting t-shirt:', err);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>T-Shirt Shop</h2>
        {user?.role === 'admin' && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/buy-tshirt/new')}
          >
            + New T-Shirt
          </button>
        )}
      </div>

      <div className="row">
        {tshirts.map(t => (
          <div key={t.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={t.img} className="card-img-top" alt={t.name} />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{t.name}</h5>
                <p className="card-text">{t.description}</p>
                
                {user?.role === 'admin' && (
                  <div className="mt-auto d-flex justify-content-between mb-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-info"
                      onClick={() => navigate(`/buy-tshirt/${t.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}

                <p className="card-text"><strong>${t.price.toFixed(2)}</strong></p>

                <button
                  type="button"
                  className="btn btn-primary mt-auto"
                  onClick={() => addItem(t)}
                >
                  Add to Cart
                </button>
              </div>

              <div className="p-3">
                <ReviewList productId={t.id} type="tshirt" />
                {user && <ReviewForm productId={t.id} type="tshirt" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
