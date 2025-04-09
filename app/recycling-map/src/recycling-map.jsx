import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const CenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView(location, 13);
    }
  }, [location, map]);

  return null;
};

const RecyclingMap = () => {
  const [shops, setShops] = useState([]);
  const [postcode, setPostcode] = useState('');
  const [location, setLocation] = useState([51.5074, -0.1278]); // Default to London

  // Fetch shop data from the backend
  const fetchShops = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/recycling-shops'); // Updated endpoint
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching recycling shops:', error);
    }
  };

  // Handle postcode search and convert postcode to lat/lon
  const handleSearch = async () => {
    if (postcode) {
      try {
        // Geocode the postcode using Nominatim
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: postcode,
            format: 'json',
            addressdetails: 1,
            limit: 1,
          },
        });

        // Check if the response contains any valid data
        if (response.data && response.data[0]) {
          const { lat, lon } = response.data[0];
          setLocation([parseFloat(lat), parseFloat(lon)]);
        } else {
          alert('Could not find location for the given postcode.');
        }
      } catch (error) {
        console.error('Error geocoding postcode:', error);
        alert('Error geocoding postcode.');
      }
    }
  };

  // Fetch shops when the component mounts
  useEffect(() => {
    fetchShops();
  }, []);

  // Handle opening Google Maps with directions
  const handleShowDirections = (shopLat, shopLon) => {
    const userLat = location[0];
    const userLon = location[1];

    // Google Maps Directions URL
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${shopLat},${shopLon}&travelmode=driving`;

    window.open(directionsUrl, '_blank');
  };

  return (
    <div className="app-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter postcode"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {/* Map */}
      <div className="map-container">
        <MapContainer center={location} zoom={13} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <CenterMap location={location} />
          {/* Markers */}
          {shops.map((shop) => (
            <Marker
              key={shop.id}
              position={[shop.latitude, shop.longitude]}
              icon={new L.Icon({
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            >
              <Popup>
                <div className="popup-content">
                  <h3>{shop.name}</h3>
                  <p>{shop.timings}</p>
                  <p>{shop.address}</p>
                  <button
                    onClick={() => handleShowDirections(shop.latitude, shop.longitude)}
                    className="directions-button">
                    Show Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default RecyclingMap;