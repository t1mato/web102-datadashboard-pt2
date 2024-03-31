import React, { useState, useEffect } from 'react'
import './App.css'
import BreweryInfo from './Components/BreweryInfo'

function App() {
  const API_KEY = import.meta.env.VITE_APP_API_KEY
  const [searchInput, setSearchInput] = useState("")
  const [filteredData, setFilteredData] = useState([])

  const [breweries, setBreweries] = useState(null)

    useEffect(() => {
        const fetchAllBreweries = async () => {
            const response = await fetch(
              "https://api.openbrewerydb.org/v1/breweries"
            )
            const json = await response.json()
            setBreweries(json)
          }
          fetchAllBreweries().catch(console.error)
    }, [])


  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = breweries.filter((brew) => 
        Object.values(brew)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredData(filteredData);
    } else {
      setFilteredData(breweries);
    }
  };

  return (
    <>
      <div className="whole-page">
        <div className="header">
        <h1>Brewery Finder 🍻</h1>
        <h4>Find a brewery by its name, city, state, or type!</h4>
        
        <input
            type="text"
            placeholder="Search..."
            onChange={(inputString) => searchItems(inputString.target.value)}
          />
        </div>

        <br></br>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>State</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {searchInput.length > 0
              ? (filteredData.map((brew) => (
                  <BreweryInfo
                    id={brew.id}
                    name={brew.name}
                    city={brew.city}
                    state={brew.state}
                    type={brew.brewery_type}
                  />
              )))
              : (breweries && breweries.map((brew) => (
                  <BreweryInfo
                    id = {brew.id}
                    name={brew.name}
                    city={brew.city}
                    state={brew.state}
                    type={brew.brewery_type}
                  />
              )))
            }
          </tbody>
        </table>

      </div>
    </>
  )
}

export default App
