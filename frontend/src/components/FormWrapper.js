import React, { useState } from 'react';
import styled from 'styled-components';

const FormWrapperContainer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 123, 255, 0.3); /* Light blue background with transparency */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
`;

const InputField = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  width: 200px;

  &:hover {
    background-color: #d4deda; 
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: rgba(93, 199, 157, 0.8); 
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4ba07e; 
  }
`;

const FormWrapper = ({ onSubmit }) => {
  const [place, setPlace] = useState('');

  const handleInputChange = (e) => {
    setPlace(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(place);
  };

  return (
    <FormWrapperContainer>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          value={place}
          onChange={handleInputChange}
          placeholder="Enter place name"
        />
        <SubmitButton type="submit">Get Weather</SubmitButton>
      </form>
    </FormWrapperContainer>
  );
};

export default FormWrapper;
