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

const LearnedPointsList = styled.ul`
  list-style: none; 
  padding-left: 0; 
  margin-top: 1.5rem;

  li {
    margin-bottom: 1.5rem; 
    line-height: 1.7; 
    padding-left: 1rem; 
    border-left: 3px solid var(--accent-color); 
  }

  li strong {
    display: block;
    font-weight: 600;
    color: var(--primary-color); 
    margin-bottom: 0.5rem; 
    font-size: 1.05em; 
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
          <p>처음에는 단순히 내 이력과 프로젝트를 정리하려고 시작했지만, 만들다 보니 "나만의 색깔"을 담고 싶다는 욕심이 생겼습니다. `React`와 `styled-components`를 활용해, 저를 좀 더 솔직하게 보여줄 수 있는 포트폴리오 웹사이트를 직접 만들어봤습니다.</p>
        </ProjectHeader>

        <ProjectSection variants={itemVariants}>
          <h3>프로젝트 목표</h3>
          <p>이 웹사이트는 단순히 경력이나 프로젝트를 나열하는 공간이 아니라, 실제로 제가 어떤 고민을 했고, 어떤 기술을 써봤으며, 어떤 시행착오를 겪었는지까지 담고 싶었습니다. "살아있는 포트폴리오"를 만들고 싶다는 생각이 컸고, 그래서 디자인, 기능, 구조 하나하나에 신경을 많이 썼습니다.</p>
          <br />
          <FeatureList>
            <li>딱딱한 이력서 느낌이 아니라, 저라는 사람을 자연스럽게 보여주고 싶었습니다.</li>
            <li>모바일, 태블릿, PC 등 어떤 환경에서도 보기 편하도록 반응형 디자인에 신경 썼습니다.</li>
            <li>처음 방문한 사람도 쉽게 탐색할 수 있도록 네비게이션과 `UI`를 단순하게 구성하였습니다.</li>
            <li>다크 모드/라이트 모드 전환은 요즘 필수라 생각해서 꼭 넣었습니다.</li>
            <li>페이지 전환이나 버튼 클릭 등, 작은 부분에도 부드러운 애니메이션을 더해 사용감이 답답하지 않도록 하였습니다.</li>
            <li>프로젝트별로 상세 내용을 쉽게 볼 수 있도록 구조를 설계하였습니다.</li>
          </FeatureList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>주요 기능</h3>
          <FeatureList>
            <li><strong>자기소개 섹션</strong> - 단순한 소개가 아니라, 저의 개발자로서의 고민과 방향성을 담으려고 하였습니다.</li>
            <li><strong>기술 스택 상세 소개</strong> - 단순히 기술을 나열하는 게 아니라, 실제로 써보며 느낀 점을 함께 정리하였습니다.</li>
            <li><strong>프로젝트 갤러리</strong> - 개인/팀 프로젝트를 한눈에 볼 수 있게 하고, 각 프로젝트의 상세 내용도 쉽게 확인할 수 있도록 하였습니다.</li>
            <li><strong>반응형 디자인</strong> - 직접 여러 기기에서 테스트하며, 화면이 깨지지 않도록 꼼꼼히 조정하였습니다.</li>
            <li><strong>다크 모드 지원</strong> - 시스템 설정과 연동되도록 구현해서, 사용자가 별도로 설정하지 않아도 자연스럽게 적용됩니다.</li>
            <li><strong>애니메이션 효과</strong> - 너무 과하지 않으면서도, 사용자가 "살아있는 사이트"라는 느낌을 받을 수 있도록 신경 썼습니다.</li>
          </FeatureList>
        </ProjectSection>
        <ProjectSection variants={itemVariants}>
          <h3>기술 스택</h3>
          <TechStackList>
            <li><strong>프레임워크:</strong> `React` - 컴포넌트 구조가 명확해서 유지보수가 편했고, 상태 관리도 간단한 편이었습니다.</li>
            <li><strong>스타일링:</strong> `styled-components` - `CSS-in-JS` 방식이 처음엔 낯설었지만, 테마 관리나 컴포넌트별 스타일 분리에 정말 유용하였습니다.</li>
            <li><strong>라우팅:</strong> `React Router` - `SPA` 구조에서 페이지 이동을 자연스럽게 처리할 수 있어 필수였습니다.</li>
            <li><strong>애니메이션:</strong> `Framer Motion` - 진입 장벽이 낮으면서도, 꽤 다양한 애니메이션을 쉽게 구현할 수 있었습니다.</li>
            <li><strong>언어:</strong> `JavaScript` (`ES6+`) - 최신 문법을 적극적으로 활용해 코드가 훨씬 깔끔해졌습니다.</li>
            <li><strong>마크업:</strong> `HTML5`, `Semantic HTML` - 접근성과 `SEO`를 고려해 태그 하나하나 신경 썼습니다.</li>
            <li><strong>빌드 도구:</strong> `Vite` - `CRA`보다 훨씬 빠르고, 번들 최적화도 잘 되어 있어 개발이 쾌적하였습니다.</li>
          </TechStackList>
        </ProjectSection>
        <ProjectSection variants={itemVariants}>
          <h3>구현 과정 및 배운 점</h3>
          <LearnedPointsList>
            <li>
              <strong>컴포넌트 설계와 테마 관리의 시행착오</strong>
              처음에는 `styled-components`의 테마 기능을 어떻게 활용해야 할지 몰라서, 여기저기서 변수 충돌이 많이 났습니다. 시행착오 끝에 전역 스타일과 컴포넌트별 스타일을 분리하는 방법을 익혔고, 다크 모드도 자연스럽게 적용할 수 있었습니다.
            </li>
            <li>
              <strong>애니메이션과 사용자 경험의 균형</strong>
              `Framer Motion`을 처음 써봤는데, 너무 과하게 쓰면 오히려 불편하다는 걸 알게 됐습니다. 적당한 선에서만 효과를 주는 게 훨씬 보기 좋다는 걸 직접 느꼈습니다.
            </li>
            <li>
              <strong>반응형 디자인의 현실적인 어려움</strong>
              `미디어 쿼리`만 잘 쓰면 다 될 줄 알았는데, 실제로는 각 기기별로 레이아웃이 미묘하게 달라져서 예상보다 시간이 오래 걸렸습니다. 직접 여러 기기에서 테스트하며, 작은 부분까지 신경 썼습니다.
            </li>
            <li>
              <strong>`SPA` 라우팅과 성능 최적화</strong>
              `코드 분할`, `lazy loading` 등으로 초기 로딩 속도를 개선하려고 노력하였습니다. 번들 크기 줄이기 위해 라이브러리도 직접 최적화해봤고, 그 과정에서 `번들 분석 도구`도 처음 써봤습니다.
            </li>
          </LearnedPointsList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>관련 링크</h3>
          <p><StyledLink href="https://github.com/kapu0377/port" target="_blank" rel="noopener noreferrer">`GitHub Repository`</StyledLink></p>
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