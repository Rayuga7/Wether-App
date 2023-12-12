import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TestComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const apiKey = '2d5ceda6716d42c59c063018231112'; // Replace with your actual WeatherAPI key

  const fetchData = async () => {
    try {
      if (city.trim() === '') {
        // Don't make a request if the city is empty
        return;
      }

      setLoading(true);

      // Fetch current weather data
      const currentWeatherResponse = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );

      // Fetch forecast data
      

      setWeatherData(currentWeatherResponse.data.current);
      setLoading(false);
      console.log(currentWeatherResponse.data.location.name);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    fetchData();
  };

  return(
    <div>
       <div className="form-group">
            <label htmlFor="cityInput">Enter City:</label>
            <input
              type="text"
              id="cityInput"
              className="form-control"
              value={city}
              onChange={handleCityChange}
              placeholder="City Name"
            />
          </div>
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
    </div>
  )
};

export default TestComponent;