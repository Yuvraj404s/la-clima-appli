// BackgroundVideo.js
import React from 'react';
import './BackgroundVideo.css'; // Create a separate CSS file for styling
import WelcomeText from './WelcomeText';
import Footer from './Footer';

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="background-video">
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <WelcomeText />
      <Footer />
    </div>
  );
};

export default BackgroundVideo;
