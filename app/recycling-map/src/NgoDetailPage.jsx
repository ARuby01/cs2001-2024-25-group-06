"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import "./Ngo.css";

function NgoDetailPage() {
  const { id } = useParams()
  const [ngo, setNgo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchNgoDetails = async () => {
      try {
        // Fetch a specific NGO by its ID
        const response = await fetch(`http://localhost:8080/api/ngos/${id}`)

        if (!response.ok) {
          throw new Error(`NGO with ID ${id} not found`)
        }

        const data = await response.json()
        setNgo(data)
      } catch (error) {
        console.error("Error fetching NGO details:", error)
        setError(error.message)

        // Fallback to mock data if API is not available
        const mockNgo = mockNgos.find((n) => n.id === id)
        if (mockNgo) {
          setNgo(mockNgo)
          setError(null)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNgoDetails()
  }, [id])

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (error || !ngo) {
    return (
      <div className="app">
        <div className="ngo-detail">
          <div className="ngo-detail-content">
            <Link to="/" className="back-link">
              <ArrowLeft size={16} style={{ marginRight: "8px" }} />
              Back to NGO List
            </Link>
            <h1 className="ngo-detail-title">NGO Not Found</h1>
            <p>The NGO you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="ngo-detail">
        <div className="ngo-detail-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} style={{ marginRight: "8px" }} />
            Back to NGO List
          </Link>

          <h1 className="ngo-detail-title">{ngo.name}</h1>

          <div className="ngo-meta">
            {ngo.founded && (
              <div className="ngo-meta-item">
                <h3>Founded</h3>
                <p>{ngo.founded}</p>
              </div>
            )}

            {ngo.location && (
              <div className="ngo-meta-item">
                <h3>Location</h3>
                <p>{ngo.location}</p>
              </div>
            )}

            {ngo.website && (
              <div className="ngo-meta-item">
                <h3>Website</h3>
                <a href={ngo.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </div>
            )}
          </div>

          {ngo.mission && (
            <div className="ngo-section">
              <h2>Mission</h2>
              <p>{ngo.mission}</p>
            </div>
          )}

          <div className="ngo-section">
            <h2>Description</h2>
            <p>{ngo.description}</p>
          </div>

          {ngo.initiatives && ngo.initiatives.length > 0 && (
            <div className="ngo-section">
              <h2>Key Initiatives</h2>
              <ul className="initiatives-list">
                {ngo.initiatives.map((initiative, index) => (
                  <li key={index}>{initiative}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
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

export default NgoDetailPage



