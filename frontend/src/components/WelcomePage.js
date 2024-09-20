import React from 'react';
import AnimatedComponent from './AnimatedComponent';
import BackgroundVideo from './BackgroundVideo';

const WelcomePage = () => {
  return (
    <div>
      <BackgroundVideo />
      <div className="content">
        <AnimatedComponent />
      </div>
    </div>
  );
}

export default WelcomePage;
