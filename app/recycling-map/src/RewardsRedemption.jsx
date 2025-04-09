import React, { useState, useEffect } from "react";
import "./RewardsRedemption.css"; // Import custom CSS for styling

const RewardsRedemption = () => {
  // Store user information
  const [user, setUser] = useState(null);

  // Store user points
  const [points, setPoints] = useState(0);

  // Store the list of available rewards fetched from the backend
  const [rewards, setRewards] = useState([]);

  // Store the list of recyclable items fetched from the backend
  const [recyclables, setRecyclables] = useState([]);

  // Determine the current tab view: 'redeem' or 'recycle'
  const [currentView, setCurrentView] = useState("redeem");

  // Hold the selected reward item when confirming redemption
  const [confirmItem, setConfirmItem] = useState(null);

  // Hold the selected recycle item when uploading proof
  const [confirmRecycle, setConfirmRecycle] = useState(null);

  // Store the image file uploaded as proof for recycling
  const [selectedFile, setSelectedFile] = useState(null);

  // Store a success message to show feedback to the user
  const [successMessage, setSuccessMessage] = useState("");

  // Hardcoded userId for now (ideally dynamic in production)
  const userId = 1;

  // Fetch user data and items when the component first loads
  useEffect(() => {
    fetchUserData();
    
    // Fetch all rewards
    fetch("http://localhost:8080/api/rewards/list")
      .then((res) => res.json())
      .then(setRewards)
      .catch((err) => console.error("Error fetching rewards:", err));

    // Fetch all recyclable items
    fetch("http://localhost:8080/api/recyclable-items/list")
      .then((res) => res.json())
      .then(setRecyclables)
      .catch((err) => console.error("Error fetching recyclables:", err));
  }, []);

  // Function to fetch the current user's data
  const fetchUserData = async () => {
    const res = await fetch(`http://localhost:8080/api/users/${userId}`);
    const data = await res.json();
    setUser(data.username);
    setPoints(data.points);
  };

  // Display a success message and auto-clear it after 3 seconds
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Handle redemption confirmation and API call
  const handleRedeemConfirm = async () => {
    if (confirmItem) {
      try {
        const res = await fetch(
          `http://localhost:8080/api/rewards/redeem?userId=${userId}&rewardId=${confirmItem.rewardId}`,
          { method: "POST" }
        );
        const message = await res.text();
        await fetchUserData(); // Refresh user points
        setConfirmItem(null); // Close modal
        showSuccess(message); // Show feedback
      } catch (error) {
        console.error("Error redeeming reward:", error);
      }
    }
  };

  // Open recycle modal when user clicks 'Recycle'
  const handleRecycle = (item) => {
    setConfirmRecycle(item);
  };

  // Store the file uploaded by the user for recycling
  const handleImageUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Submit recycling proof and process backend logic
  const confirmRecycleProcess = async () => {
    if (selectedFile && confirmRecycle) {
      try {
        await fetch(
          `http://localhost:8080/api/recyclable-items/recycle?userId=${userId}&itemId=${confirmRecycle.itemId}`,
          { method: "POST" }
        );
        await fetchUserData(); // Refresh user points
        setConfirmRecycle(null); // Close modal
        setSelectedFile(null); // Clear file selection
        showSuccess(`Recycled ${confirmRecycle.itemName} and earned points!`);
      } catch (error) {
        console.error("Error processing recycling:", error);
      }
    }
  };

  // Match item names to image file paths
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
      {/* Top section with app title, user greeting, and points */}
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

      {/* Show success banner when applicable */}
      {successMessage && <div className="success-banner">{successMessage}</div>}

      {/* Tabs to switch between redeem and recycle views */}
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

      {/* Redeem view */}
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

      {/* Recycle view */}
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

      {/* Redemption Confirmation Modal */}
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

      {/* Recycle Proof Upload Modal */}
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
