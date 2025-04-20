import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import About from '../components/About';
import { pageVariants, pageTransition } from '../utils/animations';

const SectionWrapper = styled(motion.section)`
  width: 100%;
  position: relative;
  min-height: 100vh;
  padding-top: 80px;
  box-sizing: border-box;
`;

const HomePageContainer = styled(motion.div)`
`;

export default function HomePage() {
  return (
    <HomePageContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <SectionWrapper id="about">
        <About />
      </SectionWrapper>
    </HomePageContainer>  
  );
}
