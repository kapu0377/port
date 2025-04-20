import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

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
  }

  /* Remove text-align: center from #root */
  #root {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 0; /* Keep padding or adjust as needed */
    /* text-align: center; */ /* Removed */
  }

  /* Apply consistent box-sizing */
  *, *::before, *::after {
    box-sizing: border-box;
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

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    margin: 0; 
    color: var(--primary-color);
  }

  h2, h3, h4, h5, h6 {
    color: var(--primary-color);
  }

  /* Add other global adjustments as needed */

`;

export default GlobalStyle; 