import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import placeholderIcon from '/placeholder.png'
import "leaflet/dist/leaflet.css";
import axios from 'axios';

function BreweryMap() {
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await axios.get('https://api.openbrewerydb.org/breweries');
        setBreweries(response.data.filter(brewery => isInUS(brewery)));
      } catch (error) {
        console.error('Error fetching breweries:', error);
      }
    };

    fetchBreweries();
  }, []);

  const isInUS = brewery => {
    // Check if the brewery is within the bounding box of the US
    const { latitude, longitude } = brewery;
    return latitude >= 24.396308 && latitude <= 49.384358 && longitude >= -125.0 && longitude <= -66.93457;
  };

  const customIcon = new Icon({
    iconUrl: placeholderIcon,
    iconSize: [32, 32]
  })

  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      scrollWheelZoom={false} // Disable zooming with the scroll wheel
      style={{ height: '500px', width: '100%', position: 'relative' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {breweries.map(brewery => (
        <Marker key={brewery.id} position={[brewery.latitude, brewery.longitude]} icon={customIcon}>
          <Popup>
            <div>
              <h3>{brewery.name}</h3>
              <p>{brewery.city}, {brewery.state}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default BreweryMap;