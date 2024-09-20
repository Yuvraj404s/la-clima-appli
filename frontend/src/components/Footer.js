// Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: rgba(75, 79, 77, 0.9);
  color: #fff;
  text-align: center;
  padding: 3px;
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>Designed and Developed by Tech_Marcos</p>
    </FooterContainer>
  );
};

export default Footer;
