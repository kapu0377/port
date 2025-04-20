import React from 'react';
import styled from 'styled-components';
import { media } from '../utils/mediaQueries';

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export default function SkillGrid({ children }) {
  return <SkillsGrid>{children}</SkillsGrid>;
} 