import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Configuration
  const API_URL = 'http://localhost:8080/api/users/list';

  // Fetch user data
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setPlayers(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError('Failed to fetch leaderboard data. Please try again later.');
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Filter and sort players by points (descending)
  const filteredPlayers = [...players]
    .filter(player =>
      player.username.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => b.points - a.points);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="leaderboard">
      <h2>Game Leaderboard</h2>
      <input
        type="text"
        placeholder="Search players..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
        aria-label="Search players"
      />

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player, index) => (
            <tr key={player.userId}>
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
