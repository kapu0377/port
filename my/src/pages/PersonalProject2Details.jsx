import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
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

const SubSection = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  h4 {
    font-size: 1.2em;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 0.7rem;
    
    ${media.mobile} {
      font-size: 1.1em;
    }
  }
  
  ${media.mobile} {
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;

const folderStructure = 
`src/
├── assets/          # 이미지, 아이콘, 폰트 등의 정적 리소스
├── components/      # 재사용 가능한 UI 컴포넌트
│   ├── About.jsx    # 자기소개 컴포넌트
│   ├── ThemeToggleButton.jsx  # 다크모드 전환 버튼
│   └── ...
├── pages/           # 페이지 컴포넌트
│   ├── HomePage.jsx
│   ├── SkillsPage.jsx
│   └── ...
├── context/         # React Context API를 활용한 전역 상태 관리
│   └── ThemeContext.jsx  # 테마 상태 관리
├── utils/           # 유틸리티 함수
│   ├── animations.js  # Framer Motion 애니메이션 설정
│   └── mediaQueries.js  # 반응형 미디어 쿼리 설정
├── styles/          # 전역 스타일 및 테마 설정
│   └── GlobalStyles.js  # 전역 스타일 및 다크 모드 변수
├── App.jsx          # 애플리케이션 엔트리 포인트
└── main.jsx         # React 렌더링 설정`;

export default function PersonalProject2Details() {
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
          <h2>개인 프로젝트 2: 포트폴리오 웹사이트 상세 구현 과정</h2>
          <p>React와 styled-components를 사용한 포트폴리오 웹사이트 제작 과정, 사용 기술, 디자인 결정 등을 상세히 기록합니다.</p>
        </ProjectHeader>

        <ProjectSection variants={itemVariants}>
          <h3>1. 프로젝트 구조 설계</h3>
          <p>이 포트폴리오 웹사이트를 구축하기 위해 확장성과 유지보수성을 염두에 둔 프로젝트 구조를 설계했습니다. 기능과 관심사에 따라 코드를 분리하여 명확한 구조를 갖추는 것이 목표였습니다.</p>
          
          <SubSection>
            <h4>폴더 구조</h4>
            <p>주요 폴더 구조는 다음과 같이 구성했습니다:</p>
            <SyntaxHighlighter language="bash" style={vscDarkPlus}>
              {folderStructure}
            </SyntaxHighlighter>
          </SubSection>
          
          <SubSection>
            <h4>라우팅 설계 (React Router)</h4>
            <p>React Router를 사용하여 단일 페이지 애플리케이션(SPA)의 라우팅을 구현했습니다. 주요 페이지와 중첩 라우팅을 다음과 같이 설계했습니다.</p>
            <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/projects/:projectId/details" element={<ProjectDetailExtended />} />
      </Routes>
    </BrowserRouter>
  );
}`}
            </SyntaxHighlighter>
          </SubSection>
          
          <SubSection>
            <h4>상태 관리</h4>
            <p>간단한 프로젝트 특성상 대규모 상태 관리 라이브러리(Redux 등) 대신 React의 Context API를 활용해 테마 상태 등을 관리했습니다:</p>
            <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// context/ThemeContext.jsx
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.setAttribute('data-theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};`}
            </SyntaxHighlighter>
          </SubSection>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>2. 스타일링 시스템 (styled-components)</h3>
          <p>모던하고 일관된 UI를 구현하기 위해 styled-components를 선택했으며, 테마 변경(다크/라이트 모드)을 쉽게 지원할 수 있는 스타일링 시스템을 구축했습니다.</p>
          
          <SubSection>
            <h4>GlobalStyles 설정</h4>
            <p>전체 애플리케이션에 적용되는 기본 스타일과 CSS 변수를 정의했습니다:</p>
            <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle\`
  \${reset}

  :root {
    --main-bg: #ffffff;
    --primary-color: #2c3e50; 
    --accent-color: #3498db;  
    --text-color: #333333;   
    --secondary-text-color: #757575; 
    --placeholder-bg: #e0e0e0;
    
    /* Base settings */
    color-scheme: light;
    color: var(--text-color);
    background-color: var(--main-bg);
    font-family: 'Pretendard', 'Noto Sans KR', system-ui, sans-serif;
    line-height: 1.5;
    font-weight: 400;
  }

  body[data-theme='dark'] {
    --main-bg: #1e1e1e;
    --primary-color: #ecf0f1;
    --accent-color: #5dade2;
    --text-color: rgba(255, 255, 255, 0.87);
    --secondary-text-color: #bdc3c7;
    --placeholder-bg: #424242;
    
    color-scheme: dark;
  }

  body {
    background: var(--main-bg);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
\`;

export default GlobalStyle;`}
            </SyntaxHighlighter>
          </SubSection>
          
          <SubSection>
            <h4>컴포넌트 스타일링</h4>
            <p>재사용성과 유지보수성을 고려한 컴포넌트 스타일링 접근 방식을 채택했습니다:</p>
            <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// components/ThemeToggleButton.jsx
import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleButton = styled.button\`
  background: transparent;
  border: none;
  color: var(--primary-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: var(--placeholder-bg);
  }
  
  svg {
    font-size: 1.2rem;
  }
\`;

export default function ThemeToggleButton() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
}`}
            </SyntaxHighlighter>
          </SubSection>
          
          <ImageContainer>
            <ProjectImage src="/images/theme-toggle-demo.png" alt="다크 모드와 라이트 모드 전환 데모" />
            <ImageCaption>그림 1: 포트폴리오 웹사이트의 다크 모드와 라이트 모드 전환</ImageCaption>
          </ImageContainer>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>3. 애니메이션 구현 (framer-motion)</h3>
          <p>사용자 경험을 향상시키기 위해 Framer Motion 라이브러리를 활용하여 다양한 애니메이션 효과를 구현했습니다.</p>
          
          <SubSection>
            <h4>페이지 전환 애니메이션</h4>
            <p>페이지 간 부드러운 전환을 위한 애니메이션 설정을 구현했습니다:</p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
{`// utils/animations.js
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};`}
            </SyntaxHighlighter>
          </SubSection>
          
          <SubSection>
            <h4>스크롤 기반 애니메이션</h4>
            <p>사용자의 스크롤에 따라 컨텐츠가 화면에 나타나는 효과를 구현했습니다:</p>
            <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// components/Section.jsx
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function Section({ children, index = 0 }) {
  const { ref, inView } = useInView({ 
    triggerOnce: true,
    threshold: 0.2
  });

  const initialX = index % 2 === 0 ? -200 : 200;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: initialX }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
      transition={{ 
        duration: 0.8, 
        ease: "anticipate",
        ...(index === 0 && { delay: 0.5 })
      }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </motion.section>
  );
}`}
            </SyntaxHighlighter>
          </SubSection>
          
          <ImageContainer>
            <ProjectImage src="/images/scroll-animation.png" alt="스크롤 기반 애니메이션 데모" />
            <ImageCaption>그림 2: 스크롤에 따른 컨텐츠 등장 애니메이션</ImageCaption>
          </ImageContainer>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>4. 반응형 디자인 구현</h3>
          <p>모든 디바이스에서 최적의 사용자 경험을 제공하기 위해 체계적인 반응형 디자인 시스템을 구현했습니다.</p>
          
          <SubSection>
            <h4>미디어 쿼리 시스템</h4>
            <p>일관된 반응형 디자인을 위한 브레이크포인트 시스템을 구축했습니다:</p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
{`// utils/mediaQueries.js
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px'
};

export const media = {
  mobile: \`@media (max-width: \${breakpoints.mobile})\`,
  tablet: \`@media (max-width: \${breakpoints.tablet})\`,
  laptop: \`@media (max-width: \${breakpoints.laptop})\`,
  desktop: \`@media (max-width: \${breakpoints.desktop})\`,
  mobileUp: \`@media (min-width: \${breakpoints.mobile})\`,
  tabletUp: \`@media (min-width: \${breakpoints.tablet})\`,
  laptopUp: \`@media (min-width: \${breakpoints.laptop})\`,
  desktopUp: \`@media (min-width: \${breakpoints.desktop})\`
};`}
            </SyntaxHighlighter>
          </SubSection>
          
          <SubSection>
            <h4>반응형 컴포넌트 예시</h4>
            <p>위의 미디어 쿼리 시스템을 활용한 반응형 컴포넌트 예시입니다:</p>
            <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// components/SkillGrid.jsx
import styled from 'styled-components';
import { media } from '../utils/mediaQueries';

const SkillsGrid = styled.div\`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  \${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  \${media.tablet} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
\`;

export default function SkillGrid({ children }) {
  return <SkillsGrid>{children}</SkillsGrid>;
}`}
            </SyntaxHighlighter>
          </SubSection>
          
          <ImageContainer>
            <ProjectImage src="/images/responsive-design.png" alt="반응형 디자인 데모" />
            <ImageCaption>그림 3: 다양한 화면 크기에 대응하는 반응형 디자인</ImageCaption>
          </ImageContainer>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>5. 개선 사항 및 향후 계획</h3>
          <p>포트폴리오 웹사이트를 개발하면서 얻은 인사이트와 앞으로 개선하고 싶은 부분들을 정리했습니다.</p>
          
          <SubSection>
            <h4>개선 사항</h4>
            <ul>
              <li>SEO 최적화 - 메타 태그 관리 및 시맨틱 HTML 강화</li>
              <li>접근성 개선 - ARIA 속성 추가 및 키보드 네비게이션 지원 강화</li>
              <li>성능 최적화 - 이미지 최적화 및 코드 스플리팅 적용</li>
              <li>애니메이션 성능 - 큰 화면에서 복잡한 애니메이션 실행 시 가끔 발생하는 성능 이슈 해결</li>
              <li>다국어 지원 - i18n을 활용한 다국어 지원 추가</li>
            </ul>
          </SubSection>
          
          <SubSection>
            <h4>향후 계획</h4>
            <ul>
              <li>블로그 섹션 추가 - 기술 블로그 포스팅을 포트폴리오 사이트에 통합</li>
              <li>인터랙티브 기술 데모 - 각 기술 스택에 대한 인터랙티브 데모 추가</li>
              <li>백엔드 통합 - 간단한 백엔드 API를 추가하여 방문자 통계 및 연락처 폼 기능 구현</li>
              <li>PWA 전환 - 오프라인 지원 및 모바일 앱과 같은 경험 제공</li>
              <li>프로젝트 섹션 필터링 - 기술 스택 기반 프로젝트 필터링 기능 구현</li>
            </ul>
          </SubSection>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>6. 참고 자료 및 링크</h3>
          <ul>
            <li><StyledLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React 공식 문서</StyledLink></li>
            <li><StyledLink href="https://styled-components.com" target="_blank" rel="noopener noreferrer">Styled Components 문서</StyledLink></li>
            <li><StyledLink href="https://www.framer.com/motion/" target="_blank" rel="noopener noreferrer">Framer Motion 문서</StyledLink></li>
            <li><StyledLink href="https://github.com/username/portfolio-website" target="_blank" rel="noopener noreferrer">프로젝트 GitHub 저장소</StyledLink></li>
          </ul>
          
          <p style={{ marginTop: '2rem' }}>
            <StyledInternalLink to="/projects/personal-2">돌아가기: 포트폴리오 웹사이트 개요</StyledInternalLink>
          </p>
        </ProjectSection>

      </ContentWrapper>
    </ProjectDetailContainer>
  );
} 