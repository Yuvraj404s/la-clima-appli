import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  background: rgba(96, 187, 196, 0.4);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 2000px;
  max-height: 70vh;  /* Ensure the modal doesn't exceed 80% of the viewport height */
  margin: auto;
  overflow-y: scroll;  /* Enable vertical scrolling if content overflows */
  color: #00FFFF;
  font-family: 'Arial', sans-serif;

  /* Hide the scrollbar */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Optional: just to hide the scrollbar completely */
  }
  
  /* Centering the modal */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: #2f747a;
  text-align: center;
`;

const WeatherDetail = styled.p`
  font-size: 2rem;
  margin: 10px 0;
  color: #2f747a;
  text-align: center;
`;

const Button = styled.button`
  background-color: #4B79A1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin: 10px;

  &:hover {
    background-color: #2a506d;
  }
`;

const SavedMessage = styled.p`
  color: green;
  font-weight: bold;
  text-align: center;
`;

const WeatherCard = ({ place, date, time, weatherDetails }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (weatherDetails) {
      setModalIsOpen(true); // Automatically open the modal when weatherDetails are available
    }
  }, [weatherDetails]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const saveWeather = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/weather/save', weatherDetails);
      if (response.status === 200) {
        setSaved(true);
      } else {
        console.error('Failed to save weather data');
      }
    } catch (error) {
      console.error('Error saving weather data:', error);
    }
  };

  return (
    <div>
      <StyledModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Title>{place}</Title>
        <WeatherDetail>Date: {date}</WeatherDetail>
        <WeatherDetail>Time: {time}</WeatherDetail>
        <WeatherDetail>Temperature: {weatherDetails.tempC} °C</WeatherDetail>
        <WeatherDetail>Weather: {weatherDetails.condition}</WeatherDetail>
        <WeatherDetail>Humidity: {weatherDetails.humidity}%</WeatherDetail>
        <WeatherDetail>Precipitation: {weatherDetails.precipitation} mm</WeatherDetail>
        <WeatherDetail>Wind Speed: {weatherDetails.windSpeed} kph</WeatherDetail>
        <WeatherDetail>UV Index: {weatherDetails.uvIndex}</WeatherDetail>
        <WeatherDetail>Air Quality Index: {weatherDetails.aqi}</WeatherDetail>
        <WeatherDetail>Pressure: {weatherDetails.pressure} mb</WeatherDetail>
        <WeatherDetail>Cloud Cover: {weatherDetails.cloud}%</WeatherDetail>
        <WeatherDetail>Feels Like: {weatherDetails.feelslikeC} °C</WeatherDetail>
        <WeatherDetail>Heat Index: {weatherDetails.heatindexC} °C</WeatherDetail>
        <WeatherDetail>Dew Point: {weatherDetails.dewpointC} °C</WeatherDetail>
        <WeatherDetail>Visibility: {weatherDetails.visKm} km</WeatherDetail>
        <WeatherDetail>Day/Night: {weatherDetails.day}</WeatherDetail>
        <WeatherDetail>Weekday: {weatherDetails.weekday}</WeatherDetail>
        {/* Display more weather details here */}
        <Button onClick={saveWeather}>Save to Database</Button>
        {saved && <SavedMessage>Weather data saved!</SavedMessage>}
        <Button onClick={closeModal}>Close</Button>
      </StyledModal>
    </div>
  );
};

export default WeatherCard;
