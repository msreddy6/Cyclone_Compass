import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate total price
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="container">
      <h2 className="mt-4">Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.quantity}</td>
                  <td>${(i.price * i.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(i.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total: ${total.toFixed(2)}</h4>

          <button
            className="btn btn-success me-2"
            onClick={() => navigate('/checkout')}
          >
            Checkout
          </button>
          <button className="btn btn-secondary" onClick={clearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
