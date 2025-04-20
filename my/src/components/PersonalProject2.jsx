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
    min-width: 120px;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    
    &:before {
      content: "•";
      color: var(--accent-color);
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
`;

export default function PersonalProject2() {
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
          <h2>개인 프로젝트 2: 포트폴리오 웹사이트</h2>
          <p>React와 styled-components를 사용하여 제작한 개인 포트폴리오 웹사이트입니다. 자기소개, 기술 스택, 프로젝트 경험 등을 인터랙티브하게 보여주는 것을 목표로 합니다.</p>
        </ProjectHeader>

        <ProjectSection variants={itemVariants}>
          <h3>프로젝트 목표</h3>
          <p>이 포트폴리오 웹사이트는 단순히 내 경력과 프로젝트를 나열하는 것을 넘어, 웹 개발에 대한 나의 열정과 역량을 직접 보여줄 수 있는 살아있는 포트폴리오를 만드는 것이 목표였습니다. 특히 다음 요소들에 중점을 두었습니다:</p>
          <FeatureList>
            <li>개발자로서 나의 기술적 역량을 시각적으로 효과적으로 전달</li>
            <li>모든 디바이스에서 최적의 사용자 경험을 제공하는 반응형 디자인</li>
            <li>직관적인 네비게이션과 인터랙티브한 UI 요소로 사용자 참여 유도</li>
            <li>다크 모드와 라이트 모드를 지원하여 사용자 선호도 반영</li>
            <li>페이지 전환 애니메이션과 인터랙션으로 세련된 사용자 경험 제공</li>
            <li>프로젝트 상세 내용을 명확하고 체계적으로 전달</li>
          </FeatureList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>주요 기능</h3>
          <FeatureList>
            <li><strong>자기소개 섹션</strong> - 개발자로서의 정체성, 핵심 역량, 연락처 정보 제공</li>
            <li><strong>기술 스택 상세 소개</strong> - 프론트엔드, 백엔드, 도구 등 분야별 기술 역량 시각화</li>
            <li><strong>프로젝트 갤러리</strong> - 개인 및 팀 프로젝트 목록과 상세 페이지 구현</li>
            <li><strong>반응형 디자인</strong> - 모바일, 태블릿, 데스크탑 등 모든 화면 크기에 최적화</li>
            <li><strong>다크 모드 지원</strong> - 사용자 선호도와 시스템 설정에 따른 테마 전환 기능</li>
            <li><strong>애니메이션 효과</strong> - 페이지 전환, 스크롤 기반 요소 등장, 상호작용 애니메이션</li>
          </FeatureList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>기술 스택</h3>
          <TechStackList>
            <li><strong>프레임워크:</strong> React - 컴포넌트 기반 UI 구성 및 상태 관리</li>
            <li><strong>스타일링:</strong> styled-components - 컴포넌트 중심 CSS-in-JS 적용</li>
            <li><strong>라우팅:</strong> React Router - SPA 내비게이션 및 라우팅 관리</li>
            <li><strong>애니메이션:</strong> Framer Motion - 부드러운 UI 애니메이션 구현</li>
            <li><strong>언어:</strong> JavaScript (ES6+) - 모던 자바스크립트 문법 활용</li>
            <li><strong>마크업:</strong> HTML5, Semantic HTML - 접근성 및 SEO 최적화</li>
            <li><strong>빌드 도구:</strong> Vite - 빠른 개발 서버 및 최적화된 빌드 제공</li>
          </TechStackList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>구현 과정 및 배운 점</h3>
          <p>이 프로젝트를 통해 React 환경에서 컴포넌트 구조를 효율적으로 설계하는 방법과 styled-components를 활용한 테마 관리 시스템을 깊이 이해할 수 있었습니다. 특히 다크 모드 구현 과정에서 전역 테마 상태 관리와 CSS 변수를 활용한 동적 스타일링 기법을 학습했습니다.</p>
          <p>또한 Framer Motion을 사용한 애니메이션 구현 과정에서 사용자 경험을 해치지 않으면서도 시각적으로 매력적인 인터페이스를 구성하는 균형점을 찾는 것이 중요함을 깨달았습니다. 반응형 디자인 구현에서는 다양한 기기에서 일관된 사용자 경험을 제공하기 위한 레이아웃 설계 방법을 습득했습니다.</p>
          <p>마지막으로, React Router를 활용한 SPA 라우팅 구현 과정에서 효율적인 코드 분할(code splitting)과 지연 로딩(lazy loading) 기법을 적용하여 초기 로딩 시간을 최적화하는 방법을 배웠습니다.</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>관련 링크</h3>
          <p><StyledLink href="https://github.com/username/portfolio-website" target="_blank" rel="noopener noreferrer">GitHub Repository</StyledLink></p>
          <p><StyledLink href="https://username.github.io/portfolio" target="_blank" rel="noopener noreferrer">라이브 데모</StyledLink></p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>상세 구현 과정</h3>
          <StyledInternalLink to="/projects/personal-2/details">
            포트폴리오 웹사이트 제작 과정 상세보기
          </StyledInternalLink>
        </ProjectSection>
      </ContentWrapper>
    </ProjectDetailContainer>
  );
} 