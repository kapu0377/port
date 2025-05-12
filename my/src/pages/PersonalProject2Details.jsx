import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { Link } from 'react-router-dom';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import { media } from '../utils/mediaQueries';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('javascript', javascript);

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
  max-height: 800px;
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

// 캐러셀 스타일 정의
const StyledSlider = styled(Slider)`
  margin: 2rem 0;

  .slick-slide img {
    display: block;
    margin: 0 auto;
    max-height: 400px;
    object-fit: contain;
  }

  .slick-dots li button:before {
    color: var(--primary-color);
    font-size: 10px;
  }

  .slick-dots li.slick-active button:before {
    color: var(--accent-color);
    opacity: 1;
  }
  
  .slick-slide > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const CarouselImageCaption = styled(ImageCaption)`
  margin-top: 0.8rem;
`;

export default function PersonalProject2Details() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
            <p>주요 폴더 구조는 다음과 같이 구성했습니다.</p>
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
  // 초기값 설정: 
  // 1. 로컬 스토리지에 저장된 테마 설정을 먼저 확인
  // 2. 저장된 설정이 없으면 시스템의 다크 모드 설정을 확인
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 로컬 스토리지에 저장된 테마가 있는지 확인
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }
    
    // 저장된 테마가 없으면 시스템 설정 확인
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // 테마 변경 시 로컬 스토리지에 저장하고 body 속성 업데이트
  useEffect(() => {
    // body 태그의 data-theme 속성을 변경하여 CSS 변수 적용
    const body = document.body;
    if (isDarkMode) {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  // 시스템 테마 변경 감지 
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 사용자가 직접 테마를 설정하지 않은 경우에만 시스템 설정 변경을 적용
    const handleSystemThemeChange = (e) => {
      // 로컬 스토리지에 사용자 설정이 없는 경우에만 시스템 설정 적용
      if (localStorage.getItem('theme') === null) {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};`}
            </SyntaxHighlighter>
          </SubSection>
          
          <SubSection>
            <h4>테마 상태 관리의 핵심 기능</h4>
            <ul>
              <li>
                <strong>초기 상태 설정:</strong> 컴포넌트가 처음 로드될 때, useState의 초기값으로 로컬 스토리지와 시스템 설정을 확인합니다. 로컬 스토리지에 저장된 테마가 있으면 그것을 사용하고, 없으면 window.matchMedia('(prefers-color-scheme: dark)').matches를 사용하여 사용자의 운영체제(OS)나 웹 브라우저 자체의 다크 모드 설정을 확인합니다.
              </li>
              <li>
                <strong>상태 변경 및 유지:</strong> 사용자가 테마 토글 버튼을 클릭하면 toggleTheme 함수가 호출되고, setIsDarkMode를 통해 isDarkMode 상태가 변경됩니다. 이 상태는 React의 useState Hook에 의해 컴포넌트의 메모리에 유지되며, 추가로 localStorage에 저장하여 페이지 새로고침이나 재방문 시에도 사용자의 설정이 유지됩니다.
              </li>
              <li>
                <strong>시스템 설정 변경 감지:</strong> 사용자가 브라우저나 OS의 다크 모드 설정을 변경할 경우, 이를 감지하여 사용자가 직접 테마를 선택하지 않은 경우에만 시스템 설정을 따르도록 구현했습니다. 이를 통해 사용자 경험을 향상시킵니다.
              </li>
            </ul>
          </SubSection>
          
          <ImageContainer>
            <ProjectImage src="/images/theme-toggle-demo.gif" alt="다크 모드와 라이트 모드 전환 데모" />
            <ImageCaption>그림 1: 포트폴리오 웹사이트의 다크 모드와 라이트 모드 전환</ImageCaption>
          </ImageContainer>
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
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>3. 애니메이션 구현 (framer-motion)</h3>
          <p>사용자 경험을 향상시키기 위해 Framer Motion 라이브러리를 활용하여 다양한 애니메이션 효과를 구현했습니다.</p>
          
          <SubSection>
            <h4>페이지 전환 애니메이션</h4>
            <p>페이지 간 부드러운 전환을 위한 애니메이션 설정을 구현했습니다.</p>
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
            <p>사용자의 스크롤에 따라 컨텐츠가 화면에 나타나는 효과를 구현했습니다.</p>
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
            <ProjectImage src="/images/scroll-animation.gif" alt="스크롤 기반 애니메이션 데모" />
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
            <ProjectImage src="/images/responsive-design.gif" alt="반응형 디자인 데모" />
            <ImageCaption>그림 3: 다양한 화면 크기에 대응하는 반응형 디자인</ImageCaption>
          </ImageContainer>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>5. 성능 최적화 및 문제 해결</h3>
          <p>웹사이트 개발 과정에서 마주친 성능 관련 문제와 이를 해결하기 위해 적용했던 최적화 과정입니다.</p>
          
          <SubSection>
            <h4>빌드 청크 크기 경고 해결 과정</h4>
            <p>
              개발 초기 npm run build 실행 시 "Some chunks are larger than 500 kB after minification" 경고가 지속적으로 발생했습니다.
              이는 빌드된 자바스크립트 파일(청크) 중 일부가 커서 초기 로딩 속도에 영향을 줄 수 있음을 의미합니다.
            </p>
            <p><strong>문제 해결 단계:</strong></p>
            <ol>
              <li>
                <strong>1차 시도 (React.lazy):</strong> React.lazy와 Suspense를 이용하여 페이지 컴포넌트들을 동적으로 로드하도록 코드를 분할했습니다. 하지만 빌드 결과, 경고는 여전히 발생했습니다.
              </li>
              <li>
                <strong>원인 분석 (rollup-plugin-visualizer):</strong> 정확한 원인 파악을 위해 번들 분석 도구(rollup-plugin-visualizer)를 사용하여 청크 내용을 시각화했습니다. 분석 결과, 코드 구문 강조 라이브러리인 react-syntax-highlighter가 사용하지 않는 언어 코드까지 모두 포함하여 큰 용량을 차지하는 핵심 원인임을 확인했습니다.
                아래 캐러셀은 최적화 단계별 번들 분석 결과를 보여줍니다.
              </li>
            </ol>

            {/* 캐러셀 위치 조정 */}
            <StyledSlider {...sliderSettings}>
              <div>
                <ProjectImage src="/images/first.png" alt="최적화 전 번들 분석 결과" />
                <CarouselImageCaption>그림 4: 최적화 전 번들 분석 결과(초기 상태)</CarouselImageCaption>
              </div>
              <div>
                <ProjectImage src="/images/second.png" alt="1차 최적화 후 (React.lazy 적용)" />
                <CarouselImageCaption>그림 5: 1차 최적화(React.lazy)후(여전히 syntax highlighter 문제 보임)</CarouselImageCaption>
              </div>
              <div>
                <ProjectImage src="/images/final.png" alt="최종 최적화 후 번들 분석 결과" />
                <CarouselImageCaption>그림 6: 최종 최적화(syntax highlighter) 후 (경고 해소)</CarouselImageCaption>
              </div>
            </StyledSlider>

            <ol start="3">
              <li>
                <strong>2차 시도(react-syntax-highlighter 최적화):</strong> 원인 분석 결과를 바탕으로, 다음과 같이 react-syntax-highlighter 라이브러리를 최적화했습니다.
                <ul>
                  <li>Prism 대신 기본 언어가 포함되지 않은 가벼운 버전인 PrismLight를 임포트했습니다.</li>
                  <li>라이브러리를 사용하는 각 파일(PersonalProject1Details.jsx 등)에서 실제로 필요한 언어(bash, jsx, javascript 등)만 개별적으로 임포트하고 SyntaxHighlighter.registerLanguage()로 등록했습니다.</li>
                </ul>
              </li>
            </ol>
            <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// 예시: PersonalProject2Details.jsx
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// ... 필요한 언어 import ...
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
// ...

// 필요한 언어만 등록
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('jsx', jsx);
// ...

// ... 컴포넌트 내에서 SyntaxHighlighter 사용 ...`}
            </SyntaxHighlighter>
            <p>
              <strong>결과:</strong> react-syntax-highlighter 최적화를 적용한 결과, 관련 청크 크기가 크게 줄어들어 마침내 빌드 시 청크 크기 경고가 사라졌습니다. (그림 6 참고) 이 경험을 통해 번들 분석의 중요성과 라이브러리 최적화 방법을 학습할 수 있었습니다.
            </p>
          </SubSection>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>6. 개선 사항 및 향후 계획</h3>
          <p>포트폴리오 웹사이트를 개발하면서 얻은 인사이트와 앞으로 개선하고 싶은 부분들을 정리했습니다.</p>
          
          <SubSection>
            <h4>개선 사항</h4>
            <ul>
              <li>SEO 최적화 - 메타 태그 관리 및 시맨틱 HTML 강화</li>
              <li>접근성 개선 - ARIA 속성 추가 및 키보드 네비게이션 지원 강화</li>
              <li>성능 최적화 - 이미지 최적화 (아직 남은 최적화 항목)</li>
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
          <h3>7. 참고 자료 및 링크</h3>
          <ul>
            <li><StyledLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React 공식 문서</StyledLink></li>
            <li><StyledLink href="https://styled-components.com" target="_blank" rel="noopener noreferrer">Styled Components 문서</StyledLink></li>
            <li><StyledLink href="https://www.framer.com/motion/" target="_blank" rel="noopener noreferrer">Framer Motion 문서</StyledLink></li>
            <li><StyledLink href="https://github.com/username/portfolio-website" target="_blank" rel="noopener noreferrer">프로젝트 GitHub 저장소</StyledLink></li>
          </ul>
        </ProjectSection>
      </ContentWrapper>
    </ProjectDetailContainer>
  );
} 