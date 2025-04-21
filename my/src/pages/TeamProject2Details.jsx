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

  h2 { 
    font-size: 2.5em; 
    font-weight: 600; 
    color: var(--primary-color); 
    margin-bottom: 0.5rem; 
    
    ${media.tablet} {
      font-size: 2.2em;
    }
    
    ${media.mobile} {
      font-size: 1.8em;
    }
  }
  
  p { 
    font-size: 1.1em; 
    color: var(--secondary-text-color); 
    
    ${media.mobile} {
      font-size: 1em;
    }
  }
`;

const ProjectSection = styled(motion.section)`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5em; 
    font-weight: 600; 
    color: var(--primary-color);
    margin-bottom: 1rem; 
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--placeholder-bg);
    
    ${media.mobile} {
      font-size: 1.3em;
    }
  }
  
  p { 
    margin-bottom: 1rem; 
    line-height: 1.6; 
  }
  
  ul { 
    list-style-position: inside; 
    padding-left: 1rem; 
    margin-bottom: 1rem; 
    
    ${media.mobile} {
      padding-left: 0.5rem;
    }
  }
  
  li { 
    margin-bottom: 0.5rem; 
  }
`;

const StyledLink = styled.a`
  color: var(--accent-color);
  text-decoration: underline;
  &:hover { opacity: 0.8; }
`;

const StyledInternalLink = styled(Link)`
  color: var(--accent-color);
  text-decoration: underline;
  font-weight: 500;
  &:hover { opacity: 0.8; }
`;

const ImageContainer = styled.div`
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  ${media.mobile} {
    margin: 1rem 0;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  display: block;
  margin-bottom: 0.5rem;
  max-height: 500px;
  object-fit: contain;
  
  &[src$=".gif"] {
    max-height: 400px;
    object-fit: cover;
    margin: 0 auto;
  }
  
  ${media.tablet} {
    max-height: 400px;
    
    &[src$=".gif"] {
      max-height: 350px;
    }
  }
  
  ${media.mobile} {
    max-height: 300px;
    
    &[src$=".gif"] {
      max-height: 250px;
    }
  }
`;

const ImageCaption = styled.p`
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  text-align: center;
  margin-top: 0.5rem;
  
  ${media.mobile} {
    font-size: 0.8rem;
  }
`;

export default function TeamProject2Details() {
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
      >
        <ProjectHeader variants={itemVariants}>
          <h2>팀 프로젝트 2: 상세 구현 과정</h2>
          <p>Spring Boot 기반 웹 서비스 프로젝트의 상세 구현 내용, 기술적 선택 이유, 팀 내 역할 분담 등을 기록합니다.</p>
        </ProjectHeader>

        <ProjectSection variants={itemVariants}>
          <h3>프로젝트 아키텍처</h3>
          <p>[팀 프로젝트 1과 유사하게 시스템 구성도 및 설명 추가]</p>
          {/* <img src="/path/to/architecture2.png" alt="프로젝트 2 아키텍처" style={{ maxWidth: '100%', height: 'auto' }} /> */}
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>[주요 기능 1] 구현 상세</h3>
          <p>[해당 기능의 백엔드/프론트엔드 구현 내용, 사용 기술, 어려웠던 점 등]</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>[주요 기능 2] 구현 상세</h3>
          <p>[다른 주요 기능에 대한 상세 설명]</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>데이터베이스 설계</h3>
          <p>[ERD 또는 테이블 구조 설명, 주요 쿼리 최적화 경험 등]</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>테스트 전략</h3>
          <p>[단위 테스트, 통합 테스트 등 적용한 테스트 방법론 및 도구 설명]</p>
        </ProjectSection>

         <ProjectSection variants={itemVariants}>
          <h3>참고 자료 및 링크</h3>
           {/* <p>돌아가기: <StyledInternalLink to="/projects/team-2">팀 프로젝트 2 개요</StyledInternalLink></p> */}
           {/* 외부 링크 필요시 StyledLink 사용 */}
        </ProjectSection>

        {/* 필요한 만큼 섹션 추가 */}

      </ContentWrapper>
    </ProjectDetailContainer>
  );
} 