import React, { useState, useEffect } from "react";
import "./RewardsRedemption.css";

const RewardsRedemption = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [recyclables, setRecyclables] = useState([]);
  const [currentView, setCurrentView] = useState("redeem");
  const [confirmItem, setConfirmItem] = useState(null);
  const [confirmRecycle, setConfirmRecycle] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const userId = 1;

  useEffect(() => {
    fetchUserData();
    fetch("http://localhost:8080/api/rewards/list")
      .then((res) => res.json())
      .then(setRewards)
      .catch((err) => console.error("Error fetching rewards:", err));

    fetch("http://localhost:8080/api/recyclable-items/list")
      .then((res) => res.json())
      .then(setRecyclables)
      .catch((err) => console.error("Error fetching recyclables:", err));
  }, []);

  const fetchUserData = async () => {
    const res = await fetch(`http://localhost:8080/api/users/${userId}`);
    const data = await res.json();
    setUser(data.username);
    setPoints(data.points);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleRedeemConfirm = async () => {
    if (confirmItem) {
      try {
        const res = await fetch(
          `http://localhost:8080/api/rewards/redeem?userId=${userId}&rewardId=${confirmItem.rewardId}`,
          { method: "POST" }
        );
        const message = await res.text();

        await fetchUserData(); // Re-fetch updated points
        setConfirmItem(null);
        showSuccess(message); // e.g., "Successfully redeemed Seaweed Shopping Bag!"
      } catch (error) {
        console.error("Error redeeming reward:", error);
      }
    }
  };

  const handleRecycle = (item) => {
    setConfirmRecycle(item);
  };

  const handleImageUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const confirmRecycleProcess = async () => {
    if (selectedFile && confirmRecycle) {
      try {
        await fetch(
          `http://localhost:8080/api/recyclable-items/recycle?userId=${userId}&itemId=${confirmRecycle.itemId}`,
          { method: "POST" }
        );

        await fetchUserData(); // Re-fetch updated points
        setConfirmRecycle(null);
        setSelectedFile(null);
        showSuccess(`Recycled ${confirmRecycle.itemName} and earned points!`);
      } catch (error) {
        console.error("Error processing recycling:", error);
      }
    }
  };

  const getImageSrc = (name) => {
    const imageMap = {
      "Seaweed Shopping Bag": "/images/seaweed-bag.png",
      "Food Container": "/images/food-container.jpg",
      "Small Packet": "/images/small-packet.png",
      "Plastic Bottle": "/images/plastic-bottle.png",
      "Plastic Bag": "/images/plastic-bags.png",
    };
    return imageMap[name] || "/images/default.jpg";
  };

  return (
    <div className="rewards-container">
      <div className="top-header">
        <div className="top-left">
          <h1 className="app-title">Rewards Redemption</h1>
        </div>
        <div className="top-center">
          {user && <h2 className="user-greeting">Welcome, {user}!</h2>}
        </div>
        <div className="top-right">
          <div className="points-container">
            <span>{points} points</span>
          </div>
        </div>
      </div>

      {successMessage && <div className="success-banner">{successMessage}</div>}

      <div className="toggle-buttons-row">
        <button
          className={`toggle-button ${currentView === "redeem" ? "active" : ""}`}
          onClick={() => setCurrentView("redeem")}
        >
          Redeem Rewards
        </button>
        <button
          className={`toggle-button ${currentView === "recycle" ? "active" : ""}`}
          onClick={() => setCurrentView("recycle")}
        >
          Recycle & Earn
        </button>
      </div>

      {currentView === "redeem" && (
        <div className="map-container">
          {rewards.map((reward) => (
            <div key={reward.rewardId} className="reward-card">
              <div className="reward-left">
                <img
                  src={getImageSrc(reward.rewardName)}
                  alt={reward.rewardName}
                  className="reward-image"
                />
                <div className="reward-info">
                  <h3>{reward.rewardName}</h3>
                  <p>{reward.pointsRequired} points</p>
                </div>
              </div>
              <button
                onClick={() => setConfirmItem(reward)}
                disabled={points < reward.pointsRequired}
                className="directions-button redeem"
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      )}

      {currentView === "recycle" && (
        <div className="map-container">
          {recyclables.map((item) => (
            <div key={item.itemId} className="reward-card">
              <div className="reward-left">
                <img
                  src={getImageSrc(item.itemName)}
                  alt={item.itemName}
                  className="reward-image"
                />
                <div className="reward-info">
                  <h3>{item.itemName}</h3>
                  <p>+ {item.pointsPerItem} points</p>
                </div>
              </div>
              <button
                onClick={() => handleRecycle(item)}
                className="directions-button recycle"
              >
                Recycle
              </button>
            </div>
          ))}
        </div>
      )}

      {confirmItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Redemption</h3>
            <p>
              Redeem <b>{confirmItem.rewardName}</b> for{" "}
              <b>{confirmItem.pointsRequired} points</b>?
            </p>
            <div className="modal-buttons">
              <button onClick={() => setConfirmItem(null)} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleRedeemConfirm} className="confirm-button">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmRecycle && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Upload proof of recycling</h3>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div className="modal-buttons">
              <button onClick={() => setConfirmRecycle(null)} className="cancel-button">
                Cancel
              </button>
              <button
                onClick={confirmRecycleProcess}
                className="confirm-button"
                disabled={!selectedFile}
              >
                Upload &amp; Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsRedemption;
