import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `nav-link ${location.pathname === path ? 'active' : ''}`;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">E-Commerce Store</Link>
      <div className="nav-links">
        <Link to="/" className={linkClass('/')}>Products</Link>
        <Link to="/orders" className={linkClass('/orders')}>Orders</Link>
      </div>
    </nav>
  );
}

export default Navbar;
