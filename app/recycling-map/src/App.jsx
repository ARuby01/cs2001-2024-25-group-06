import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import RecyclingMap from './recycling-map'; // Import the RecyclingMap component
import RewardsRedemption from './RewardsRedemption'; // Import the RewardsRedemption component
import EducationHub from './EducationHub'; // Import the EducationHub component (your new feature)
import Achievements from './Achievements';
import HomePage from './HomePage';
import NgoDetailPage from './NgoDetailPage';
import './App.css';
import Leaderboard from './Leaderboard';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Render the Navbar at the top */}
        <Routes>
          <Route path="/" element={<RecyclingMap />} /> {/* Map component */}
          <Route path="/rewards" element={<RewardsRedemption />} /> {/* Rewards Redemption component */}
          <Route path="/education-hub" element={<EducationHub />} /> {/* EducationHub component */}
          <Route path="/achievements" element={<Achievements />} /> {/* Achievements component */}
          <Route path="/NGOs" element={<HomePage />} /> {/* Achievements component */}
          <Route path="/ngo/:id" element={<NgoDetailPage />} /> {/* NGOs component */}
          <Route path="/leaderboard" element={<Leaderboard />} /> {/* Leaderboard component */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;