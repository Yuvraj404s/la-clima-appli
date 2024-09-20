import React, { useState } from 'react';
import MapComponent from './MapComponent';
import WeatherCard from './WeatherCard';
import Footer from './Footer';
import FormWrapper from './FormWrapper'; // Import the FormWrapper component
import styled from 'styled-components';
import axios from 'axios';

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const HomePage = () => {
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (place) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/weather/city?place=${place}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  
  const handleMarkerClick = async (location) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/weather/location?lat=${location.lat}&lng=${location.lng}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <HomePageWrapper>
      <MapComponent onMarkerClick={handleMarkerClick} />
      {weatherData && (
        <WeatherCard
          place={weatherData.placeName}
          date={weatherData.dateTime.split(' ')[0]}
          time={weatherData.dateTime.split(' ')[1]}
          weatherDetails={weatherData}
        />
      )}
      <FormWrapper onSubmit={handleSubmit} />
      <Footer />
    </HomePageWrapper>
  );
};

export default HomePage;
