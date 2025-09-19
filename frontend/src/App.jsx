import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home           from './pages/Home';
import CampusMap      from './pages/CampusMap';
import Login          from './pages/Login';
import Signup         from './pages/Signup';

import DormExplorer   from './pages/DormExplorer';
import DormForm       from './pages/DormForm';

import DiningGuide    from './pages/DiningGuide';
import DiningForm     from './pages/DiningForm';

import ClubsEvents    from './pages/ClubsEvents';
import ClubsForm      from './pages/ClubsForm';

import BuyTShirt      from './pages/BuyTShirt';
import Cart           from './pages/Cart';
import Checkout       from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';

import AdminLogin      from './pages/admin/AdminLogin';
import AdminDashboard  from './pages/admin/AdminDashboard';
import AdminUsers      from './pages/admin/AdminUsers';
import AdminUserForm   from './pages/admin/AdminUserForm';
import TshirtList      from './pages/admin/TshirtList';
import TshirtForm      from './pages/admin/TshirtForm';
import TestimonialList from './pages/admin/TestimonialList';
import TestimonialForm from './pages/admin/TestimonialForm';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <div className="container my-5">
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/campus-map" element={<CampusMap />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Dorm */}
              <Route path="/dorm-explorer" element={<DormExplorer />} />
              <Route path="/dorm-explorer/new" element={<DormForm />} />
              <Route path="/dorm-explorer/:id" element={<DormForm />} />

              {/* Dining */}
              <Route path="/dining-guide" element={<DiningGuide />} />
              <Route path="/dining-guide/new" element={<DiningForm />} />
              <Route path="/dining-guide/:id" element={<DiningForm />} />

              {/* Clubs & Events */}
              <Route path="/clubs-events" element={<ClubsEvents />} />
              <Route path="/clubs-events/new" element={<ClubsForm />} />
              <Route path="/clubs-events/:id" element={<ClubsForm />} />

              {/* T-Shirts */}
              <Route path="/buy-tshirt" element={<BuyTShirt />} />
              <Route path="/buy-tshirt/new" element={<TshirtForm />} />
              <Route path="/buy-tshirt/:id" element={<TshirtForm />} />

              {/* Cart & Checkout */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<PaymentSuccess />} />

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/users/:id" element={<AdminUserForm />} />
              <Route path="/admin/tshirts" element={<TshirtList />} />
              <Route path="/admin/tshirts/new" element={<TshirtForm />} />
              <Route path="/admin/tshirts/:id" element={<TshirtForm />} />

              {/* Testimonials Management */}
              <Route path="/admin/testimonials"     element={<TestimonialList />} />
              <Route path="/admin/testimonials/new" element={<TestimonialForm />} />
              <Route path="/admin/testimonials/:id" element={<TestimonialForm />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
