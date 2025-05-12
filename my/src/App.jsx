import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from './styles/GlobalStyles';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ThemeToggleButton from './components/ThemeToggleButton';
import { useEffect, lazy, Suspense } from 'react';

const MainPage = lazy(() => import('./pages/MainPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const PersonalProject1Details = lazy(() => import('./pages/PersonalProject1Details'));
const PersonalProject2Details = lazy(() => import('./pages/PersonalProject2Details'));
const TeamProject1Details = lazy(() => import('./pages/TeamProject1Details'));
const TeamProject2Details = lazy(() => import('./pages/TeamProject2Details'));


const PersonalProject1 = lazy(() => import('./components/PersonalProject1'));
const PersonalProject2 = lazy(() => import('./components/PersonalProject2'));
const TeamProject1 = lazy(() => import('./components/TeamProject1'));
const TeamProject2 = lazy(() => import('./components/TeamProject2'));

const Header = styled.header`
  padding: 1rem 2rem;
  background-color: var(--main-bg);
  border-bottom: 1px solid var(--placeholder-bg);
  position: sticky; 
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-grow: 1;
  max-width: 1200px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavLinkStyle = `
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--accent-color);
  }

  &.active {
    color: var(--accent-color);
    font-weight: 700;
  }
`;

const StyledRouterLink = styled(NavLink)`
  ${NavLinkStyle}

  &.my-portfolio-link.active {
    color: var(--primary-color) !important;
    font-weight: bold !important;
    pointer-events: auto;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  color: var(--primary-color);
  font-size: 1.2rem;
`;

function AppContent() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.key]);

  return (
    <>
      <Header>
        <HeaderContent>
          <Nav>
            <StyledRouterLink
              to="/"
              end
              className="my-portfolio-link"
              style={{ fontWeight: 'bold', fontSize: '1.2rem' }}
              onClick={e => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              MyPortfolio
            </StyledRouterLink>
            <StyledRouterLink to="/skills">Skills</StyledRouterLink>
            <StyledRouterLink to="/projects">Projects</StyledRouterLink>
          </Nav>
          <ThemeToggleButton />
        </HeaderContent>
      </Header>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner>로딩 중...</LoadingSpinner>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainPage/>} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/personal-1" element={<PersonalProject1 />} />
            <Route path="/projects/personal-1/details" element={<PersonalProject1Details />} />
            <Route path="/projects/personal-2" element={<PersonalProject2 />} />
            <Route path="/projects/personal-2/details" element={<PersonalProject2Details />} />
            <Route path="/projects/team-1" element={<TeamProject1 />} />
            <Route path="/projects/team-1/details" element={<TeamProject1Details />} />
            <Route path="/projects/team-2" element={<TeamProject2 />} />
            <Route path="/projects/team-2/details" element={<TeamProject2Details />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <GlobalStyle />
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}
