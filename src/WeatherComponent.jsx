// WeatherComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WeatherComponent.css';

const WeatherComponent = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState('');
    const apiKey = API_KEY; // Replace with your actual API key

    const fetchData = async () => {
        try {
            if (city.trim() === '') {
                // Don't make a request if the city is empty
                return;
            }

            setLoading(true);

            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            );

            // Convert temperature from Kelvin to Celsius
            const tempCelsius = response.data.main.temp - 273.15;

            // Update the weather data with the converted temperature
            setWeatherData({
                ...response.data,
                main: {
                    ...response.data.main,
                    temp: tempCelsius,
                },
            });

            setLoading(false);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setLoading(false);
        }
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSearch = () => {
        // Trigger the search only when the button is clicked
        fetchData();
    };

    const getWeatherIconUrl = (iconCode) => {
        return `https://openweathermap.org/img/w/${iconCode}.png`;
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
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

                        <button onClick={handleSearch} className="btn btn-primary" id='cityInputButton' >
                            Search
                        </button>
                    </div>

                    {loading ? (
                        <div className='loading' >
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <>
                            {weatherData ? (
                                <div className='weather-card'> 
                                    <div className="mt-3">
                                        <div className='CityNameStatus' >
                                        <h3>{weatherData.name}</h3>
                                        <img
                                            src={getWeatherIconUrl(weatherData.weather[0].icon)}
                                            alt="Weather Icon"
                                        />
                                        </div>
                                        <p>Temperature: {weatherData.main.temp.toFixed(2)} &deg;C</p>
                                        <p>Weather: {weatherData.weather[0].description}</p>

                                        <p>Humidity: {weatherData.main.humidity}%</p>
                                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                                    </div>
                                </div>
                            ) : (
                                <div className='statusWeather'>
                                    <p>No weather data available</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div >
    );
};

export default WeatherComponent;
