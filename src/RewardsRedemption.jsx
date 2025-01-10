import React, { useState } from "react";

const RewardsRedemption = () => {
  // State to track the current view (redeem, recycle, or history)
  const [currentView, setCurrentView] = useState("redeem");

  // State to track redeemed/recycled items for history
  const [redeemed, setRedeemed] = useState([]);

  // State to track the user's current points
  const [points, setPoints] = useState(500);

  // State to track the currently selected item for confirmation
  const [confirmItem, setConfirmItem] = useState(null);

  // Reusable card component for displaying items
  const Card = ({ children, className }) => (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );

  // Reusable button component with styling and behavior for different variants
  const Button = ({ children, onClick, variant = "default", disabled = false, className }) => {
    const baseStyle = "rounded-lg px-4 py-2 font-medium focus:outline-none transition";
    const variantStyle =
      variant === "default"
        ? "bg-cyan-500 text-white hover:bg-cyan-600" // Default button styling
        : "bg-white text-cyan-500 border border-cyan-500 hover:bg-cyan-100"; // Outline button styling
    const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : ""; // Styling for disabled buttons
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

  // List of items available for redemption
  const redeemItems = [
    { id: 1, name: "Seaweed Shopping Bag", points: 250, description: "1 bag" },
    { id: 2, name: "Food Container", points: 150, description: "1 container" },
    { id: 3, name: "Small Packet", points: 50, description: "5 packets" }
  ];

  // List of items available for recycling
  const recycleItems = [
    { id: 4, name: "Plastic Bottles", points: 10, description: "Should be emptied and clean" },
    { id: 5, name: "Plastic Bags", points: 5, description: "Should be clean" }
  ];

  // Handles redeeming an item
  const handleRedeem = (item) => {
    if (points >= item.points) {
      // Deduct the item's points from the user's total
      setPoints(points - item.points);

      // Add the redeemed item to the history
      setRedeemed([
        {
          ...item,
          date: new Date().toLocaleDateString(), // Add the current date
          type: "redeem" // Mark it as a redemption
        },
        ...redeemed // Keep the previous history
      ]);
    }
    setConfirmItem(null); // Close the confirmation modal
  };

  // Handles recycling an item
  const handleRecycle = (item) => {
    // Add the item's points to the user's total
    setPoints(points + item.points);

    // Add the recycled item to the history
    setRedeemed([
      {
        ...item,
        date: new Date().toLocaleDateString(), // Add the current date
        type: "recycle" // Mark it as recycling
      },
      ...redeemed // Keep the previous history
    ]);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-green-100">
      {/* Header Section */}
      <header className="flex items-center justify-between px-8 py-6">
        <h1 className="text-cyan-500 text-3xl font-light">Rewards Redemption</h1>
        {/* Display the user's current points */}
        <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-green-300">
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

      {/* Navigation Section */}
      <div className="flex justify-center gap-4 mb-8">
        {/* Tabs to switch between views */}
        <Button
          onClick={() => setCurrentView("redeem")}
          variant={currentView === "redeem" ? "default" : "outline"}
        >
          Redeem Rewards
        </Button>
        <Button
          onClick={() => setCurrentView("recycle")}
          variant={currentView === "recycle" ? "default" : "outline"}
        >
          Recycle & Earn
        </Button>
        <Button
          onClick={() => setCurrentView("history")}
          variant={currentView === "history" ? "default" : "outline"}
        >
          History
        </Button>
      </div>

      {/* Content Section */}
      <div className="flex-grow overflow-y-auto px-8">
        {/* Redeem View */}
        {currentView === "redeem" && (
          <div className="space-y-4">
            {redeemItems.map((item) => (
              <Card key={item.id} className="border border-cyan-200">
                <div className="flex justify-between items-center">
                  {/* Display item details */}
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm">• {item.points} points</p>
                  </div>
                  {/* Redeem button */}
                  <Button
                    onClick={() => setConfirmItem(item)}
                    disabled={points < item.points}
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
                  {/* Display item details */}
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm">+ {item.points} points</p>
                  </div>
                  {/* Recycle button */}
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
                    {/* Display redeemed/recycled item details */}
                    <div>
                      <p>
                        {item.name} {item.type === "redeem" ? "redeemed" : "recycled"}
                      </p>
                      <p className="text-sm text-gray-500">• {item.date}</p>
                    </div>
                    {/* Points with color based on type */}
                    <p
                      className={`text-sm font-semibold ${
                        item.type === "redeem" ? "text-[#0868ac]" : "text-[#a8ddb5]"
                      }`}
                    >
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
              {/* Cancel button */}
              <Button onClick={() => setConfirmItem(null)} variant="outline">
                Cancel
              </Button>
              {/* Confirm button */}
              <Button onClick={() => handleRedeem(confirmItem)}>Confirm Redemption</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsRedemption;
