import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PaymentSuccess() {
  const { state } = useLocation();
  return (
    <div className="container text-center" style={{marginTop:50}}>
      <h2>Payment Successful!</h2>
      <p>Your order number is <strong>{state?.orderId}</strong>.</p>
      <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
    </div>
  );
}
