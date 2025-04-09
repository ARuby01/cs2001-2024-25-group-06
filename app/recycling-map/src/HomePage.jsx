"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, ExternalLink } from "lucide-react"
import "./Ngo.css";


function HomePage() {
  const [ngos, setNgos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredNgos, setFilteredNgos] = useState([])


useEffect(() => {
    const fetchNgos = async () => {
      try {
        // For development with local Spring Boot backend
        const response = await fetch("http://localhost:8080/api/ngos")
        const data = await response.json()
        setNgos(data)
        // Only set the first 8 NGOs initially
        setFilteredNgos(data.slice(0, 8))
      } catch (error) {
        console.error("Error fetching NGOs:", error)
        // Fallback to mock data if API is not available
        setNgos(mockNgos)
        // Only set the first 8 mock NGOs initially
        setFilteredNgos(mockNgos.slice(0, 8))
      } finally {
        setLoading(false)
      }
    }
  
    fetchNgos()
  }, [])

 useEffect(() => {
    if (searchQuery.trim() === "") {
      // When search is empty, show only first 8
      setFilteredNgos(ngos.slice(0, 8))
    } else {
      // When searching, show all matching results
      const query = searchQuery.toLowerCase()
      
      // Filter but ensure unique NGOs by ID
      const uniqueNgos = {};
      
      ngos.forEach(ngo => {
        if ((ngo.name.toLowerCase().includes(query) || ngo.description.toLowerCase().includes(query))) {
          // Only keep one copy of each NGO by ID
          uniqueNgos[ngo.id] = ngo;
        }
      });
      
      // Convert back to array
      setFilteredNgos(Object.values(uniqueNgos))
    }
  }, [searchQuery, ngos])

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already handled by the useEffect above
  }

  if (loading) {
    return (
      <div className="app">
        <h1>Plastic Saving NGOs</h1>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Plastic Saving NGOs</h1>

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search NGOs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <Search size={20} />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>

      {filteredNgos.length === 0 ? (
        <div className="no-results">
          <h2>No NGOs found</h2>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="ngo-grid">
          {filteredNgos.map((ngo) => (
            <div key={ngo.id} className="ngo-card">
              <div className="ngo-card-content">
                <h2 className="ngo-card-title">{ngo.name}</h2>
                <p className="ngo-card-description">{ngo.description}</p>

                {ngo.website && (
                  <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="ngo-website-link">
                    <ExternalLink size={14} style={{ marginRight: "4px" }} />
                    Visit Website
                  </a>
                )}
              </div>
              <div className="ngo-card-footer">
                <Link to={`/ngo/${ngo.id}`} className="learn-more-button">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Mock data for fallback if API is not available
const mockNgos = [
  {
    id: "1",
    name: "5 Gyres Institute",
    description: "Focuses on science, education, and community solutions to combat plastic pollution.",
    website: "https://www.5gyres.org",
    location: "Los Angeles, CA",
    founded: 2009,
    mission:
      "Empowering action against the global health crisis of plastic pollution through science, education, and advocacy.",
    initiatives: ["Research", "Education", "Community Engagement"],
  },
  {
    id: "2",
    name: "The Ocean Cleanup",
    description: "Develops advanced technologies to collect plastic debris from oceans and rivers.",
    website: "https://theoceancleanup.com",
    location: "Rotterdam, Netherlands",
    founded: 2013,
    mission: "Developing advanced technologies to rid the world's oceans of plastic.",
    initiatives: ["Ocean Cleanup System", "Interceptor", "Research"],
  },
  {
    id: "3",
    name: "Plastic Soup Foundation",
    description: "Works to reduce ocean plastic contamination through education and research.",
    website: "https://www.plasticsoupfoundation.org",
    location: "Amsterdam, Netherlands",
    founded: 2011,
    mission: "No plastic waste in our water!",
    initiatives: ["Beat the Microbead", "Ocean Clean Wash", "Plastic Health Coalition"],
  },
  {
    id: "4",
    name: "Surfrider Foundation",
    description: "Protects oceans, waves, and beaches through various initiatives.",
    website: "https://www.surfrider.org",
    location: "San Clemente, CA",
    founded: 1984,
    mission:
      "Dedicated to the protection and enjoyment of the world's ocean, waves and beaches through a powerful activist network.",
    initiatives: ["Beach Cleanups", "Ocean Friendly Restaurants", "Plastic Pollution Initiative"],
  },
  {
    id: "5",
    name: "Precious Plastic",
    description: "Provides DIY machines and guidelines to recycle plastic anywhere in the world.",
    website: "https://preciousplastic.com",
    location: "Global",
    founded: 2013,
    mission: "Boosting plastic recycling worldwide by providing tools and knowledge to the public for free.",
    initiatives: ["Machines", "Workspace", "Community", "Bazaar"],
  },
  {
    id: "6",
    name: "Plastic Pollution Coalition",
    description: "Global alliance working toward a world free of plastic pollution and its toxic impacts.",
    website: "https://www.plasticpollutioncoalition.org",
    location: "Berkeley, CA",
    founded: 2009,
    mission:
      "Working toward a world free of plastic pollution and its toxic impact on humans, animals, waterways, oceans, and the environment.",
    initiatives: ["Advocacy", "Education", "Coalition Building"],
  },
  {
    id: "7",
    name: "Surfers Against Sewage",
    description: "Campaigns to eliminate plastic pollution on UK beaches and in the marine environment.",
    website: "https://www.sas.org.uk",
    location: "Cornwall, UK",
    founded: 1990,
    mission: "Creating ocean activists everywhere to protect our ocean, beaches, waves and wildlife.",
    initiatives: ["Beach Cleans", "Plastic Free Communities", "Ocean School"],
  },
  {
    id: "8",
    name: "Marine Conservation Society",
    description: "UK charity fighting for a cleaner, better-protected, healthier ocean.",
    website: "https://www.mcsuk.org",
    location: "Ross-on-Wye, UK",
    founded: 1983,
    mission: "Working for seas full of life where nature flourishes and people thrive.",
    initiatives: ["Beachwatch", "Clean Seas", "Ocean Recovery"],
  },
]

export default HomePage

