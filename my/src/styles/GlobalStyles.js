import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --main-bg: #ffffff;
    --primary-color: #2c3e50; 
    --accent-color: #3498db;  
    --text-color: #333333;   
    --secondary-text-color: #757575; 
    --placeholder-bg: #e0e0e0;
    --button-bg: #f9f9f9;
    --button-border: transparent;
    --section-padding: 2rem;
    --border-radius: 8px;
    --shadow-sm: 0 2px 5px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 10px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.12);
    --content-max-width: 1200px;
    --container-padding: 1rem;

    /* Base settings */
    color-scheme: light;
    color: var(--text-color);
    background-color: var(--main-bg);
    font-family: 'Pretendard', 'Noto Sans KR', system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body[data-theme='dark'] {
    --main-bg: #1e1e1e;
    --primary-color: #ecf0f1;
    --accent-color: #5dade2;
    --text-color: rgba(255, 255, 255, 0.87);
    --secondary-text-color: #bdc3c7;
    --placeholder-bg: #424242;
    --button-bg: #333;
    --button-border: #555;
    color-scheme: dark;
  }

  /* Apply base font styles to body */
  body {
    background: var(--main-bg);
    color: var(--text-color);
    font-family: inherit; /* Inherit from :root */
    min-width: 320px;
    min-height: 100vh;
    line-height: inherit; /* Inherit from :root */
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  /* Global container styles */
  #root {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0; /* 컨테이너 패딩 제거 */
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Apply consistent box-sizing */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* 표준 컨테이너 클래스 */
  .container {
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  /* 섹션 스타일 표준화 */
  section {
    padding: var(--section-padding) 0;
    width: 100%;
  }

  /* 카드 및 컴포넌트 스타일 표준화 */
  .card {
    background: var(--main-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }

  /* Base styles for links and buttons using CSS variables */
  a {
    color: var(--primary-color);
    transition: color 0.2s;
    text-decoration: none; /* More common reset than inherit */
    font-weight: 500;
  }

  a:hover {
    color: var(--accent-color);
  }

  /* 네비게이션 스크롤 링크용 클래스 */
  .nav-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;
  }
  .nav-link:hover {
    color: var(--accent-color);
  }
  .nav-link.active {
    color: var(--accent-color);
    font-weight: 700;
  }

  button {
    border-radius: 8px;
    border: 1px solid var(--button-border);
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--button-bg);
    color: var(--primary-color);
    cursor: pointer;
    transition: border-color 0.25s, color 0.2s, background-color 0.2s;
  }

  button:hover {
    color: var(--accent-color);
    border-color: var(--accent-color);
  }

  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  /* 타이포그래피 설정 표준화 */
  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-color);
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: 600;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  /* 반응형 미디어 쿼리 */
  @media (max-width: 1200px) {
    :root {
      --section-padding: 1.5rem;
      --container-padding: 1rem;
    }
  }

  @media (max-width: 768px) {
    :root {
      --section-padding: 1.25rem;
      --container-padding: 0.75rem;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.75rem;
    }
    
    h3 {
      font-size: 1.5rem;
    }
    
    h4 {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    :root {
      --section-padding: 1rem;
      --container-padding: 0.5rem;
    }
    
    h1 {
      font-size: 1.75rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    h3 {
      font-size: 1.25rem;
    }
    
    h4 {
      font-size: 1.1rem;
    }
  }
`;

const PreviewBox = styled.div`
  margin: 2rem 0;
  border: 1px solid var(--placeholder-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  background: var(--main-bg);
  width: 100%;
`;

const PreviewFrame = styled.iframe`
  width: 100%;
  min-height: 500px;
  border: none;
  background: var(--main-bg);

  @media (max-width: 768px) {
    min-height: 400px;
  }

  @media (max-width: 480px) {
    min-height: 300px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
`;

const Section = styled.section`
  padding: var(--section-padding) 0;
  width: 100%;
`;

const Card = styled.div`
  background: var(--main-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }
`;

export { PreviewBox, PreviewFrame, ContentContainer, Section, Card };
export default GlobalStyle; 