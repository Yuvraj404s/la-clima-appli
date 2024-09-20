import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import HomePage from './components/HomePage';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const App = () => {
  const [welcome, setWelcome] = useState(true);

  setTimeout(() => setWelcome(false), 7000);

  return (
    <AppWrapper>
      {welcome ? (
        <WelcomePage />
      ) : (
        <HomePage />
      )}
    </AppWrapper>
  );
};

export default App;
