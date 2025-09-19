import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TestimonialSection() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('/api/testimonials')
      .then(res => setList(res.data))
      .catch(console.error);
  }, []);

  if (!list.length) return null;

  return (
    <section className="my-5">
      <h3 className="text-center mb-4">What Our Users Say</h3>
      <div className="row">
        {list.map(t => (
          <div key={t._id} className="col-md-4 mb-4">
            <div className="card h-100 text-center p-3 shadow-sm">
              {t.avatarUrl && (
                <img
                  src={t.avatarUrl}
                  alt={t.author}
                  className="rounded-circle mx-auto mb-3"
                  style={{ width: 80, height: 80, objectFit: 'cover' }}
                />
              )}
              <blockquote className="blockquote">
                <p>"{t.quote}"</p>
                <footer className="blockquote-footer mt-2">{t.author}</footer>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
