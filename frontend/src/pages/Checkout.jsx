import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  // Calculate total
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Basic validation
  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.address.trim())  errs.address  = 'Address is required';

    const digitsOnly = form.cardNumber.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(digitsOnly)) errs.cardNumber = 'Enter 16 digits';

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry))
      errs.expiry = 'Expiry must be MM/YY';

    if (!/^\d{3,4}$/.test(form.cvv)) errs.cvv = 'CVV must be 3 or 4 digits';

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    // “Process” the order
    const orderId = Math.floor(Math.random() * 1000000);
    clearCart();
    navigate('/checkout/success', { state: { orderId } });
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ maxWidth: 600, marginTop: '2rem' }}>
        <h2 className="mt-4">Checkout</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 600, marginTop: '2rem' }}>
      <h2 className="mb-4">Checkout</h2>

      {/* Order Summary */}
      <div className="mb-4">
        <h5>Order Summary</h5>
        <ul className="list-group">
          {items.map((i) => (
            <li
              key={i.id}
              className="list-group-item d-flex justify-content-between"
            >
              {i.name} x{i.quantity}
              <span>${(i.price * i.quantity).toFixed(2)}</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </li>
        </ul>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit}>
        <h5>Shipping Details</h5>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
          />
          {errors.fullName && (
            <div className="invalid-feedback">{errors.fullName}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>

        <h5>Payment Details</h5>
        <div className="mb-3">
          <label className="form-label">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className={`form-control ${
              errors.cardNumber ? 'is-invalid' : ''
            }`}
          />
          {errors.cardNumber && (
            <div className="invalid-feedback">{errors.cardNumber}</div>
          )}
        </div>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Expiry (MM/YY)</label>
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength={5}
              className={`form-control ${errors.expiry ? 'is-invalid' : ''}`}
            />
            {errors.expiry && (
              <div className="invalid-feedback">{errors.expiry}</div>
            )}
          </div>
          <div className="col mb-3">
            <label className="form-label">CVV</label>
            <input
              type="password"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength={4}
              className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
            />
            {errors.cvv && (
              <div className="invalid-feedback">{errors.cvv}</div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Pay ${total.toFixed(2)}
        </button>
      </form>
    </div>
  );
}
