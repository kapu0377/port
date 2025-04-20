import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { Link } from 'react-router-dom';
import { media } from '../utils/mediaQueries';

const ProjectDetailContainer = styled(motion.div)` // 페이지 전환용
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

const ProjectHeader = styled(motion.header)` // 아이템
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--placeholder-bg);

  h2 { font-size: 2.5em; font-weight: 600; color: var(--primary-color); margin-bottom: 0.5rem; }
  p { font-size: 1.1em; color: var(--secondary-text-color); }
`;

const ProjectSection = styled(motion.section)` // 아이템
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

export default function TeamProject1() {
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
          <h2>팀 프로젝트 1: Spring Boot + React 웹사이트</h2>
          <p>Spring Boot를 백엔드로, React를 프론트엔드로 사용하여 개발한 웹사이트입니다. 팀원들과 협업하여 기능을 구현하고 배포했습니다.</p>
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
          <p>Backend: Spring Boot, Java, Spring Data JPA/MyBatis, MySQL/Oracle, Spring Security...</p>
          <p>Frontend: React, JavaScript/TypeScript, Redux/Recoil, Axios, styled-components/MUI...</p>
          <p>DevOps: Git, Docker, Jenkins, AWS/GCP...</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>나의 역할 및 기여</h3>
          {/* 예: 백엔드 API 개발 (어떤 기능?), 프론트엔드 UI/UX 구현 (어떤 페이지?), DB 설계, 테스트 코드 작성, 배포 담당 등 구체적으로 */}
          <p>...</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>결과 및 배운 점</h3>
          {/* 예: 프로젝트 완료 및 시연 결과, 팀 협업 과정에서의 경험(코드 리뷰, Git-flow 등), 기술적 도전 과제 및 해결 과정, 성능 개선 경험 등 */}
          <p>...</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>관련 링크</h3>
          {/* GitHub 레포지토리 및 라이브 데모(있다면) 주소 기입 */}
          <p><StyledLink href="{/* GitHub Repository URL */}" target="_blank" rel="noopener noreferrer">GitHub Repository</StyledLink></p>
        </ProjectSection>

        {/* 상세 구현 과정 링크 섹션 추가 */} 
        <ProjectSection variants={itemVariants}>
          <h3>상세 구현 과정</h3>
          <StyledInternalLink to="/projects/team-1/details">
            Spring Boot + React 웹사이트 구현 과정 상세보기
          </StyledInternalLink>
        </ProjectSection>

      </ContentWrapper>
    </ProjectDetailContainer>
  );
} 