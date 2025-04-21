import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { Link } from 'react-router-dom';
import { media } from '../utils/mediaQueries';

const ProjectDetailContainer = styled(motion.div)` 
  padding: 4rem 1rem;
  margin: 0 auto;
  max-width: 960px;
  color: var(--text-color);
  
  ${media.tablet} {
    padding: 3rem 1rem;
  }
  
  ${media.mobile} {
    padding: 2rem 0.8rem;
  }
`;

const ContentWrapper = styled(motion.div)``;

const ProjectHeader = styled(motion.header)` 
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--placeholder-bg);

  h2 { font-size: 2.5em; font-weight: 600; color: var(--primary-color); margin-bottom: 0.5rem; }
  p { font-size: 1.1em; color: var(--secondary-text-color); }
`;

const ProjectSection = styled(motion.section)` 
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5em; font-weight: 600; color: var(--primary-color);
    margin-bottom: 1rem; padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--placeholder-bg);
  }
`;

const StyledLink = styled.a`
  color: var(--accent-color);
  text-decoration: underline;
  &:hover { opacity: 0.8; }
`;

const TechStackList = styled.ul`
  list-style: none; 
  padding-left: 0;
  margin-bottom: 1.5rem;

  li {
    margin-bottom: 0.7rem;
    display: flex;
    align-items: flex-start;
  }

  strong { 
    font-weight: 600;
    color: var(--primary-color); 
    margin-right: 0.5em;
    min-width: 20px; 
  }
`;

const StyledInternalLink = styled(Link)`
  display: inline-block; 
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--placeholder-bg);
  color: var(--primary-color);
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: var(--accent-color);
    color: var(--main-bg); 
    opacity: 1; 
  }
`;

export default function TeamProject2() {
  return (
    <ProjectDetailContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <ContentWrapper
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        custom={0.5} 
      >      
        <ProjectHeader variants={itemVariants}>
          <h2>팀 프로젝트 2: Spring Boot 기반 웹 서비스</h2>
          <p>Spring Boot를 사용하여  등을 구현했습니다.</p>
        </ProjectHeader>

        <ProjectSection variants={itemVariants}>
          <h3>프로젝트 목표</h3>
          <p>...</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>주요 기능</h3>
          <ul>
            <li>기능 1...</li>
            <li>기능 2...</li>
            <li>기능 3...</li>
          </ul>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>기술 스택</h3>
          <TechStackList>
            <li><strong>Backend:</strong>Spring Boot, Java, ...</li>
            <li><strong>Frontend:</strong>...</li>
            <li><strong>Database:</strong>...</li>
            <li><strong>Infra/DevOps:</strong>...</li>
          </TechStackList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>나의 역할 및 기여</h3>
          <p>...</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>결과 및 배운 점</h3>
          <p>...</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>관련 링크</h3>
          <p><StyledLink href="#github-repo-url" target="_blank" rel="noopener noreferrer">GitHub Repository</StyledLink></p>
        </ProjectSection>
        
        <ProjectSection variants={itemVariants}>
          <h3>상세 구현 과정</h3>
          <StyledInternalLink to="/projects/team-2/details">
            Spring Boot 기반 웹 서비스 구현 과정 상세보기
          </StyledInternalLink>
        </ProjectSection>
      </ContentWrapper>
    </ProjectDetailContainer>
  );
} 