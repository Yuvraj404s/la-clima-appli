import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import sunAnimation from '../animations/Animation.json'; // Add your animation JSON file

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
`;

const BackgroundBlur = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5); /* Black blur background */
  filter: blur(20px);
  z-index: 1;
`;

const AnimationContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: sunAnimation, // Add sun or cloud animation here
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const AnimatedComponent = () => (
  <Container>
    <BackgroundBlur />
    <AnimationContainer>
      <Lottie options={defaultOptions} height={400} width={400} />
    </AnimationContainer>
  </Container>
);

export default AnimatedComponent;
