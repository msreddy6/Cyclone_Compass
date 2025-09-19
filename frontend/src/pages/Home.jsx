// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import 'bootstrap/js/dist/carousel';
import './Home.css';

export default function Home() {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState([]);

  const features = [
    { title: 'Life At ISU',     link: '/lifeatisu',    img: '/images/iastate.jpg' },
    { title: 'Campus Map',      link: '/campus-map',   img: '/images/campus.jpg' },
    { title: 'Dorm Explorer',   link: '/dorm-explorer',img: '/images/dorm.jpg' },
    { title: 'Dining Guide',    link: '/dining-guide', img: '/images/dining.jpg' },
    { title: 'Clubs & Events',  link: '/clubs-events', img: '/images/events.jpg' },
    { title: 'Shop T-Shirts',   link: '/buy-tshirt',   img: '/images/tshirts.png' },
  ];

  // Fetch testimonials from backend
  useEffect(() => {
    axios.get('/api/testimonials')
      .then(res => setTestimonials(res.data))
      .catch(err => console.error('Error loading testimonials:', err));
  }, []);

  return (
    <div className="home-page">
      {/* Login / Welcome */}
      <div className="text-end mb-4">
        {user ? (
          <span>
            Welcome back,&nbsp;
            <strong>{user.username}</strong>!
          </span>
        ) : (
          <Link to="/login" className="btn btn-outline-primary">
            Login
          </Link>
        )}
      </div>

      {/* Carousel */}
      <div id="homeCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          {['/slider/1.jpg', '/slider/2.jpg', '/slider/3.jpg'].map((src, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
              <img
                src={src}
                className="d-block w-100 carousel-img"
                alt={`slide ${i + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
        </button>
      </div>

      {/* Feature Boxes */}
      <div className="container features-grid mb-5">
        <div className="row g-3">
          {features.map((f) => (
            <div key={f.title} className="col-6 col-md-4">
              <Link to={f.link} className="feature-card">
                <div
                  className="feature-bg"
                  style={{ backgroundImage: `url(${f.img})` }}
                />
                <div className="overlay">
                  <h5>{f.title}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <h2 className="text-center mb-4">Testimonials</h2>
      <div className="container testimonials-grid mb-5">
        <div className="row g-4">
          {testimonials.map((t) => (
            <div key={t._id} className="col-12 col-md-4">
              <div className="card testimonial-card h-100 text-center p-3">
                <div className="avatar mb-3">
                  {t.avatarUrl
                    ? <img src={t.avatarUrl} alt={t.author} className="avatar-img" />
                    : <FaUserCircle className="avatar-icon" />
                  }
                </div>
                <h5 className="mb-1">{t.author}</h5>
                <p className="text-muted mb-2">{new Date(t.createdAt).toLocaleDateString()}</p>
                <p className="testimonial-text">{t.quote}</p>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <p className="text-center text-muted">No testimonials available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
