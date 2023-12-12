
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './ApiComponent.css' 

  const ApiComponent = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState('');
    const apiKey = '2d5ceda6716d42c59c063018231112'; 



    const [favoriteCities, setFavoriteCities] = useState(() => {
      const storedCities = localStorage.getItem('favoriteCities');
      return storedCities ? JSON.parse(storedCities) : [];
    });

  

    const fetchData = async () => {
      try {
        if (city.trim() === '') {
          
          return;
        }

        setLoading(true);

       
        const currentWeatherResponse = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );

        
        const forecastResponse = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`
        );

        setWeatherData(currentWeatherResponse.data.current);
        setCityData(currentWeatherResponse.data.location);
        setForecastData(forecastResponse.data.forecast);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setWeatherData(null);
        setCityData(null);
        setForecastData(null);
        setLoading(false);
        
        
      }
    };

    const handleCityChange = (event) => {
      setCity(event.target.value);
    };

    const handleSearch = () => {
      fetchData();
    };
    const isCityInFavorites = (cityName) => {
      return favoriteCities.includes(cityName);
    };
  
      const handleAddToFavorites = () => {
      if (cityData && !isCityInFavorites(cityData.name)) {
        const newFavoriteCities = [...favoriteCities, cityData.name];
        setFavoriteCities(newFavoriteCities);
        localStorage.setItem('favoriteCities', JSON.stringify(newFavoriteCities));
        setAlertMessage('City added to favorites successfully!');
        setAlertType('alert-success');
      } else {
        setAlertMessage('City is already in favorites.');
        setAlertType('alert-danger');
      }
  
      
      setTimeout(() => {
        setAlertMessage('');
        setAlertType('');
      }, 2000);
    };
  

    return (
      <div className="container mt-5" id='all'>
         {alertMessage && (
        <div className={`alert ${alertType}`}>
          {alertMessage}
        </div>
      )}
        <div className="card">
          <div className="card-header ">
            <h2>Weather Information</h2>
          </div>
          <div className="card-body">
            <div className='search-bar'>


              <input
                type="text"
                id="cityInput"
                className="form-control"
                value={city}
                onChange={handleCityChange}
                placeholder="City Name"
              />

              <button onClick={handleSearch} className="btn btn-primary" id='cityInputButton'>
                Search
              </button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {weatherData ? (
                  <div className="mt-3">
                    <div className='CityNameStatus' >
                      <h3> {cityData.name}</h3>
                      <img
                        src={weatherData.condition.icon}
                        alt="Weather Icon"
                      />
                    </div>
                    <div className='weatherInfo'>
                      <p>Temperature: {weatherData.temp_c} &deg;C</p>
                      <p>Weather: {weatherData.condition.text}</p>

                      <p>Humidity: {weatherData.humidity}%</p>
                      <p>Wind Speed: {weatherData.wind_kph} km/h</p>
                      <button onClick={handleAddToFavorites} className="btn btn-secondary" id='cityInputButton'>
                        Add to  Favorites
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>No weather data available</p>
                )}
                {forecastData && (
                  <div className="mt-3">
                    <h3>Weather Forecast</h3>
                    <div className='forcast-div' >
                      {forecastData.forecastday.map((day, index) => (
                        <div key={index} className='card ' >
                          <div className='card-content' >
                            <img
                              src={day.day.condition.icon}
                              alt="Weather Icon"
                              className='card-img-top'
                              id='cloudstatus'
                            />
                            <div className='card-body'>
                              <h4> {day.date}</h4>
                              <p>Temperature: {day.day.avgtemp_c} &deg;C</p>
                              <p>Weather: {day.day.condition.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default ApiComponent;
