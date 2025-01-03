import React, { useState } from "react";

const RewardsRedemption = () => {
  // States for managing views, redeemed items, points, and confirmation modal
  const [currentView, setCurrentView] = useState("redeem"); // Tracks the current active tab
  const [redeemed, setRedeemed] = useState([]); // Stores a history of redeemed or recycled items
  const [points, setPoints] = useState(500); // User's current points
  const [confirmItem, setConfirmItem] = useState(null); // Stores the item selected for confirmation

  // Card Component - A reusable UI container
  const Card = ({ children, className }) => (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );

  // Button Component - A reusable button with styles
  const Button = ({ children, onClick, variant = "default", disabled = false, className }) => {
    const baseStyle = "rounded-lg px-4 py-2 font-medium focus:outline-none transition";
    const variantStyle =
      variant === "default"
        ? "bg-cyan-500 text-white hover:bg-cyan-600" // Default button style
        : "bg-white text-cyan-500 border border-cyan-500 hover:bg-cyan-100"; // Outline button style
    const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : ""; // Disabled button style
    return (
      <button
        className={`${baseStyle} ${variantStyle} ${disabledStyle} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };

  // Items available for redemption
  const redeemItems = [
    { id: 1, name: "Seaweed Shopping Bag", points: 250, description: "1 bag" },
    { id: 2, name: "Food Container", points: 150, description: "1 container" },
    { id: 3, name: "Small Packet", points: 50, description: "5 packets" }
  ];

  // Items available for recycling
  const recycleItems = [
    { id: 4, name: "Plastic Bottles", points: 10, description: "Should be emptied and clean" },
    { id: 5, name: "Plastic Bags", points: 5, description: "Should be clean" }
  ];

  // Handles redeeming an item
  const handleRedeem = (item) => {
    if (points >= item.points) {
      // Deduct points and add item to redeemed list
      setPoints(points - item.points);
      setRedeemed([
        {
          ...item,
          date: new Date().toLocaleDateString(), // Add redemption date
          type: "redeem" // Specify action type
        },
        ...redeemed
      ]);
    }
    setConfirmItem(null); // Close confirmation modal
  };

  // Handles recycling an item
  const handleRecycle = (item) => {
    // Add points and add item to redeemed list
    setPoints(points + item.points);
    setRedeemed([
      {
        ...item,
        date: new Date().toLocaleDateString(), // Add recycling date
        type: "recycle" // Specify action type
      },
      ...redeemed
    ]);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-green-100">
      {/* Header Section */}
      <header className="flex items-center justify-between px-8 py-6">
        <h1 className="text-cyan-500 text-3xl font-light">Rewards Redemption</h1>
        <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-green-300">
          {/* Points Display */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="#0868ac"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="text-lg font-semibold text-black">{points} points</span>
        </div>
      </header>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {/* Tabs to switch views */}
        <Button
          onClick={() => setCurrentView("redeem")}
          variant={currentView === "redeem" ? "default" : "outline"}
          className={currentView === "redeem" ? "bg-cyan-500 text-white" : ""}
        >
          Redeem Rewards
        </Button>
        <Button
          onClick={() => setCurrentView("recycle")}
          variant={currentView === "recycle" ? "default" : "outline"}
          className={currentView === "recycle" ? "bg-cyan-500 text-white" : ""}
        >
          Recycle & Earn
        </Button>
        <Button
          onClick={() => setCurrentView("history")}
          variant={currentView === "history" ? "default" : "outline"}
          className={currentView === "history" ? "bg-cyan-500 text-white" : ""}
        >
          History
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto px-8">
        {/* Redeem View */}
        {currentView === "redeem" && (
          <div className="space-y-4">
            {redeemItems.map((item) => (
              <Card key={item.id} className="border border-cyan-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm">• {item.points} points</p>
                  </div>
                  <Button
                    onClick={() => setConfirmItem(item)} // Open confirmation modal
                    disabled={points < item.points} // Disable if insufficient points
                  >
                    Redeem now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Recycle View */}
        {currentView === "recycle" && (
          <div className="space-y-4">
            {recycleItems.map((item) => (
              <Card key={item.id} className="border border-cyan-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm">+ {item.points} points</p>
                  </div>
                  <Button onClick={() => handleRecycle(item)}>Recycle now</Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* History View */}
        {currentView === "history" && (
          <Card className="border border-cyan-200">
            <div className="space-y-4">
              {redeemed.length > 0 ? (
                redeemed.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p>
                        {item.name} {item.type === "redeem" ? "redeemed" : "recycled"}
                      </p>
                      <p className="text-sm text-gray-500">• {item.date}</p>
                    </div>
                    <p className="text-sm">
                      {item.type === "redeem" ? "-" : "+"} {item.points} points
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No history yet.</p>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Confirm Redemption</h3>
            <p className="text-sm mb-6">
              Are you sure you want to redeem the <b>{confirmItem.name}</b> for{" "}
              <b>{confirmItem.points} points</b>?
            </p>
            <div className="flex justify-end gap-4">
              <Button onClick={() => setConfirmItem(null)} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => handleRedeem(confirmItem)}>Confirm Redemption</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsRedemption;
