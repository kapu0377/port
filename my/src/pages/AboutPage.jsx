import React from 'react';
import styled from 'styled-components';
import About from '../components/About';

const SectionWrapper = styled.section`
  width: 100%;
  position: relative;
  min-height: 100vh;
  padding-top: 80px;
  box-sizing: border-box;
`;

const AboutPageContainer = styled.div``;

export default function AboutPage() {
  return (
    <AboutPageContainer>
      <SectionWrapper>
        <About />
      </SectionWrapper>
    </AboutPageContainer>
  );
} 