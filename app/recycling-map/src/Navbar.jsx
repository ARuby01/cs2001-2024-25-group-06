import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Recycling App
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Map
            </Link>
          </li>


          <li className="nav-item">
            <Link to="/rewards" className="nav-links">
              Rewards Redemption
            </Link>
            </li>
          <li className="nav-item">
            <Link to="/NGOs" className="nav-links">
              NGOs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/education-hub" className="nav-links">
              Education Hub
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/achievements" className="nav-links">
             Achievements
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className="nav-links">
             Leaderboard
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;