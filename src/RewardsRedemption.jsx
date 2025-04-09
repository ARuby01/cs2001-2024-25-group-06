import React, { useState, useEffect } from "react";

const RewardsRedemption = () => {
  // State to store user data
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const userId = 1; // Hardcoded user ID (you can make this dynamic later)

  // Fetch user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data.username);
        setPoints(data.points);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // List of available rewards
  const redeemItems = [
    { id: 1, name: "Seaweed Shopping Bag", points: 250, description: "1 bag" },
    { id: 2, name: "Food Container", points: 150, description: "1 container" },
    { id: 3, name: "Small Packet", points: 50, description: "5 packets" }
  ];

  // Handle reward redemption (update points in database)
  const handleRedeem = async (item) => {
    if (points >= item.points) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${userId}/updatePoints?points=${points - item.points}`,
          { method: "PUT" }
        );

        if (!response.ok) {
          throw new Error("Failed to update points");
        }

        // Update points in UI
        setPoints(points - item.points);
      } catch (error) {
        console.error("Error updating points:", error);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-green-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <h1 className="text-cyan-500 text-3xl font-light">Rewards Redemption</h1>
        {/* Display Username */}
        {user && <h2 className="text-xl font-semibold">Welcome, {user}!</h2>}
        {/* Points Display */}
        <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-green-300">
          <span className="text-lg font-semibold text-black">{points} points</span>
        </div>
      </header>

      {/* Rewards Section */}
      <div className="flex-grow overflow-y-auto px-8">
        {redeemItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md border border-cyan-200 flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-sm">• {item.points} points</p>
            </div>
            <button
              onClick={() => handleRedeem(item)}
              disabled={points < item.points}
              className={`px-4 py-2 rounded-lg font-medium ${
                points < item.points ? "bg-gray-300 cursor-not-allowed" : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
            >
              Redeem now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsRedemption;
