import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';
import { auth } from '../firebase';  // Firebase auth
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);  // Get current user
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/signin');
    });
  };

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
          {user ? (
            <div className="profile-container">
              <FaUserCircle 
                className="navbar-account-icon" 
                onClick={() => setMenuOpen(!menuOpen)} 
              />
              {menuOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/signin" className="auth-link">Sign In</Link>
              <span className="divider">or</span>
              <Link to="/signup" className="auth-link signup-btn">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
