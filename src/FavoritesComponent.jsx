// FavoritesComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FavoritesComponent.css';

const FavoritesComponent = () => {
  const [favoriteWeatherData, setFavoriteWeatherData] = useState([]);
  const [favoriteCityData, setFavoriteCityData] = useState([]);

  const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities')) || [];

  const fetchDataForCity = async (city) => {
    try {
      const apiKey = '2d5ceda6716d42c59c063018231112';
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      let data = {
        name: response.data.location.name,
        temp: response.data.current.temp_c,
        humidity: response.data.current.humidity,
        windSpeed: response.data.current.wind_kph,
      };
      return data;
    } catch (error) {
      console.error(`Error fetching data for ${city}:`, error);
      return null;
    }
  };

  const fetchFavoriteWeatherData = async () => {
    const dataPromises = favoriteCities.map(city => fetchDataForCity(city));
    const favoriteWeatherData = await Promise.all(dataPromises);

    setFavoriteWeatherData(favoriteWeatherData);
  };

  const removeFromFavorites = (city) => {
    const updatedFavoriteCities = favoriteCities.filter(favCity => favCity !== city);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavoriteCities));
    fetchFavoriteWeatherData();
  };

  useEffect(() => {
    fetchFavoriteWeatherData();
  }, []);

  return (
    <div className="favorites-container">
      <h3>Favorite Cities</h3>
      <div className="favorites-cards">
        {favoriteWeatherData.map((weatherData, index) => (
          <div key={index} className="card" id='card'>
            {weatherData ? (
              <>
                <h4>{weatherData.name}</h4>
                <p>Temperature: {weatherData.temp} &deg;C</p>
                <div className="extra-info">
                  <p>Humidity: {weatherData.humidity}%</p>
                  <p>Wind Speed: {weatherData.windSpeed} km/h</p>
                  <button className="btn btn-danger" onClick={() => removeFromFavorites(favoriteCities[index])}>
                  Remove
                </button>
                </div>
                
              </>
            ) : (
              <p>Error fetching data</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesComponent;
