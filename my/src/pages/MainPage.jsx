import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { media } from '../utils/mediaQueries';

const MainPageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px); 
  padding: 2rem;
  text-align: center;

  ${media.tablet} {
    min-height: calc(100vh - 120px);
    padding: 1.5rem;
  }

  ${media.mobile} {
    min-height: calc(100vh - 100px);
    padding: 1rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 2rem;

  ${media.tablet} {
    font-size: 2.5rem;
  }

  ${media.mobile} {
    font-size: 2rem;
  }
`;

const NavLinkContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;

  ${media.mobile} {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ServiceLink = styled(motion(Link))`
  background-color: var(--main-bg);
  color: var(--primary-color);
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid var(--placeholder-bg);
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--hover-bg);
    color: var(--accent-color);
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  ${media.tablet} {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const transition = {
  duration: 0.5,
  ease: 'easeInOut',
};

export default function MainPage() {
  return (
    <MainPageContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={transition}
    >
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...transition }}
      >
        환영합니다!
      </Title>
      <NavLinkContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, staggerChildren: 0.1 }}
      >
        <ServiceLink 
          to="/portfolio"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          포트폴리오
        </ServiceLink>
        <ServiceLink 
          to="/diary" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          다이어트 일기
        </ServiceLink>
        <ServiceLink 
          to="/blog" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          블로그
        </ServiceLink>
        <ServiceLink 
          to="/server-management" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          나의 서버 관리
        </ServiceLink>
      </NavLinkContainer>
    </MainPageContainer>
  );
} 