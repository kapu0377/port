import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { media } from '../utils/mediaQueries';

const projectVariants = {
  initial: { opacity: 0, scale: 0.95, y: 40 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, y: 40, transition: { duration: 0.4, ease: 'easeIn' } },
};

const ProjectsContainer = styled(motion.section)`
  padding-top: 2rem;
  padding-bottom: 2rem;
  min-height: calc(100vh - 60px);
  padding-left: 1rem;
  padding-right: 1rem;

  h2 {
    font-size: 2.5em;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 2rem;
    text-align: center;
    
    ${media.tablet} {
      font-size: 2em;
      margin-bottom: 1.5rem;
    }
    
    ${media.mobile} {
      font-size: 1.8em;
      margin-bottom: 1rem;
    }
  }
`;

const TableOfContents = styled.nav` 
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--placeholder-bg);
  border-radius: 8px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  ${media.tablet} {
    padding: 0.8rem;
    max-width: 90%;
  }
  
  ${media.mobile} {
    padding: 0.6rem;
    max-width: 100%;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.3em;
    color: var(--primary-color);
    
    ${media.mobile} {
      font-size: 1.1em;
      margin-bottom: 0.8rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 1rem;
    
    ${media.mobile} {
      margin-bottom: 0.8rem;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1.1em;
  font-weight: 700;
  transition: color 0.2s;
  
  ${media.mobile} {
    font-size: 1em;
  }

  &:hover {
    color: var(--accent-color);
    text-decoration: underline;
  }
`;

export default function Projects() {
  return (
    <ProjectsContainer
      variants={projectVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2>
        🚀 나의 프로젝트 여정
      </h2>

      <TableOfContents>
        <h3>프로젝트 목차</h3>
        <ul>
          <li>
            <StyledLink to="/projects/personal-1">개인 프로젝트 1: 클라우드 기반 개인 서버 구축 & 호스팅 솔루션</StyledLink>
          </li>
          <li>
            <StyledLink to="/projects/personal-2">개인 프로젝트 2: 인터랙티브 포트폴리오 웹사이트 개발</StyledLink>
          </li>
          <li>
            <StyledLink to="/projects/team-1">팀 프로젝트 1: EZPZ - 쉽고 안전한 여행을 위한 항공 플랫폼</StyledLink>
          </li>
          <li>
            <StyledLink to="/projects/team-2">팀 프로젝트 2: work out - 함께 운동하며 건강한 라이프스타일을 공유하는 플랫폼</StyledLink>
          </li>
        </ul>
      </TableOfContents>
    </ProjectsContainer>
  );
} 