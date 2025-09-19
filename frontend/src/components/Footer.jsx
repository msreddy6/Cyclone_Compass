import React from 'react';

const Footer = () => (
  <footer className="bg-light text-center py-3">
    <div className="container">
      <span className="text-muted">
        &copy; {new Date().getFullYear()} Cyclone Compass. All rights reserved.
      </span>
    </div>
  </footer>
);

export default Footer;
