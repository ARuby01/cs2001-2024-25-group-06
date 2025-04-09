import React, { useState, useEffect } from "react";
import "./RewardsRedemption.css";  // Reuse the existing styles

const Achievements = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const userId = 1;

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.username);
        setPoints(data.points);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const achievements = [
    {
      title: "Recycling Warrior",
      requiredPoints: 100,
      image: "/images/bronze-medal.svg",
    },
    {
      title: "Recycling Hero",
      requiredPoints: 500,
      image: "/images/silver-shield.jpg",
    },
    {
      title: "Recycling Champion",
      requiredPoints: 1000,
      image: "/images/gold-trophy.jpg",
    },
  ];

  return (
    <div className="app-container">  {/* same container used in Rewards Redemption */}
      {/* 
        Use the existing .top-header grid:
        - .top-left is empty, so .top-center truly centers the heading
        - .top-right holds points
      */}
      <div className="top-header">
        <div className="top-left"></div>

        <div className="top-center">
          <h1 className="app-title" style={{ fontSize: "36px", margin: 0 }}>
            Achievements
          </h1>
        </div>

        <div className="top-right">
          <div className="points-container">
            <span>{points} points</span>
          </div>
        </div>
      </div>

      {/* 
        Reuse .map-container and .reward-card styles from RewardsRedemption.css 
        so the achievements list looks consistent with your other pages
      */}
      <div className="map-container">
        {achievements.map((achieve, idx) => {
          const unlocked = points >= achieve.requiredPoints;
          return (
            <div
              key={idx}
              className="reward-card"
              style={{
                // Dim the card if not unlocked
                opacity: unlocked ? 1 : 0.4,
              }}
            >
              <div className="reward-left">
                <img
                  src={achieve.image}
                  alt={achieve.title}
                  className="reward-image"
                />
                <div className="reward-info">
                  <h3>{achieve.title}</h3>
                  <p>
                    {unlocked
                      ? `Achieved with ${achieve.requiredPoints} points`
                      : `Unlock at ${achieve.requiredPoints} points`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
