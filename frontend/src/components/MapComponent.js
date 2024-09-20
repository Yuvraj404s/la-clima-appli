import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapComponent = ({ onMarkerClick }) => {
  const mapStyles = {
    height: "100%",
    width: "100%"
  };

  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }

  return (
    <LoadScript googleMapsApiKey='AIzaSyAdsVq-lxMEft3dktC5aagK1tzYu9VD7Sc'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={3}
        center={defaultCenter}
        onClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          onMarkerClick({ lat, lng });
        }}
      >
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent;
