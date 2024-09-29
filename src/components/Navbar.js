import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import FontAwesome for a cleaner profile icon
import './Navbar.css';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-title">SOCRAT.IQ</Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/problems">Problems</Link>
          <Link to="/discuss">Discuss</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="navbar-account">
          <FaUserCircle className="navbar-account-icon" /> {/* Correct profile icon */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
