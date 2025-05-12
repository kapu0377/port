import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa'; 

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem; 
  padding: 0.5rem;
  color: var(--primary-color); 
  display: flex; 
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--accent-color); 
  }

  &:focus {
    outline: none; 
  }
  &:focus-visible {
     box-shadow: 0 0 0 2px var(--accent-color); 
     border-radius: 50%;
  }
`;

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? <FaMoon /> : <FaSun />} 
    </ToggleButton>
  );
} 