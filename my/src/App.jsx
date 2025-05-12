import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ThemeToggleButton from './components/ThemeToggleButton';
import { useEffect, lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

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
  width: 100%;
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

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  color: var(--accent-color);
  font-size: 1.1rem;

  &::after {
    content: '';
    width: 30px;
    height: 30px;
    border: 2px solid var(--accent-color);
    border-radius: 50%;
    border-top-color: transparent;
    margin-left: 10px;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LazyRoute = ({ component, ...props }) => {
  const Component = component;
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner>컨텐츠 준비 중</LoadingSpinner>}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

const PageTransitionContainer = styled.div`
  .page-exit {
    opacity: 0;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;

function AppContent() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.key]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      import('./pages/PersonalProject1Details').catch(() => {});
      import('./pages/PersonalProject2Details').catch(() => {});
      import('./pages/TeamProject1Details').catch(() => {});
      import('./pages/TeamProject2Details').catch(() => {});
      import('./components/PersonalProject1').catch(() => {});
      import('./components/PersonalProject2').catch(() => {});
      import('./components/TeamProject1').catch(() => {});
      import('./components/TeamProject2').catch(() => {});
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

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
      
      <PageTransitionContainer>
        <Suspense fallback={<LoadingSpinner>컨텐츠 준비 중</LoadingSpinner>}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.key}>
              <Route path="/" element={<LazyRoute component={MainPage} />} />
              <Route path="/skills" element={<LazyRoute component={SkillsPage} />} />
              <Route path="/projects" element={<LazyRoute component={ProjectsPage} />} />
              <Route path="/projects/personal-1" element={<LazyRoute component={PersonalProject1} />} />
              <Route path="/projects/personal-1/details" element={<LazyRoute component={PersonalProject1Details} />} />
              <Route path="/projects/personal-2" element={<LazyRoute component={PersonalProject2} />} />
              <Route path="/projects/personal-2/details" element={<LazyRoute component={PersonalProject2Details} />} />
              <Route path="/projects/team-1" element={<LazyRoute component={TeamProject1} />} />
              <Route path="/projects/team-1/details" element={<LazyRoute component={TeamProject1Details} />} />
              <Route path="/projects/team-2" element={<LazyRoute component={TeamProject2} />} />
              <Route path="/projects/team-2/details" element={<LazyRoute component={TeamProject2Details} />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </PageTransitionContainer>
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
        <GlobalStyles />
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}
