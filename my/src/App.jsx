import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ThemeToggleButton from './components/ThemeToggleButton';
import { useEffect, lazy, Suspense, useState, useCallback } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

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

const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));

const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const MyPage = lazy(() => import('./pages/MyPage'));
const DietPage = lazy(() => import('./pages/DietDiaryPage'));

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
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.7rem 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-grow: 1;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const UserActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 0.7rem;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const UserName = styled.span`
  color: var(--primary-color);
  font-weight: 500;
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

const ActionsRow = styled.div`
  display: flex;
  gap: 0.8rem;
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
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ActionButton = styled.button`
  ${NavLinkStyle}
  background: none;
  border: none;
  padding: 0;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/my-api';

  const checkLoginStatus = useCallback(async () => {
    setIsCheckingLogin(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/status`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
        if (data.isLoggedIn && data.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      } else {
        console.error('로그인 상태 확인 실패:', response.statusText);
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('로그인 상태 확인 중 네트워크 오류 또는 기타 문제:', error);
      setIsLoggedIn(false);
      setCurrentUser(null);
    } finally {
      setIsCheckingLogin(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    checkLoginStatus();
    const handleRouteChange = () => {
      checkLoginStatus();
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [checkLoginStatus]);

  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setIsLoggedIn(false);
        setCurrentUser(null);
        console.log('로그아웃 성공');
      } else {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        console.error('로그아웃 실패:', errorData.message);
      }
    } catch (error) {
      console.error('로그아웃 중 네트워크 오류 또는 기타 문제:', error);
    }
  }, [API_BASE_URL]);
  
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

  if (isCheckingLogin) {
    return <LoadingSpinner>로그인 상태 확인 중...</LoadingSpinner>;
  }

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
            {(location.pathname.startsWith('/portfolio') || 
              location.pathname.startsWith('/skills') || 
              location.pathname.startsWith('/projects')) && (
              <>
                <StyledRouterLink to="/skills">Skills</StyledRouterLink>
                <StyledRouterLink to="/projects">Projects</StyledRouterLink>
              </>
            )}
          </Nav>
          <UserActions>
            {isLoggedIn && currentUser ? (
              <>
                <UserName>{currentUser.username}님</UserName>
                <StyledRouterLink to="/mypage">마이페이지</StyledRouterLink>
                <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
                <ThemeToggleButton />
              </>
            ) : (
              <>
                <StyledRouterLink to="/login">로그인</StyledRouterLink>
                <StyledRouterLink to="/register">회원가입</StyledRouterLink>
                <ThemeToggleButton />
              </>
            )}
          </UserActions>
        </HeaderContent>
      </Header>
      
      <PageTransitionContainer>
        <Suspense fallback={<LoadingSpinner>컨텐츠 준비 중</LoadingSpinner>}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.key}>
              <Route path="/" element={<LazyRoute component={MainPage} />} />
              <Route path="/portfolio" element={<LazyRoute component={PortfolioPage} />} />
              <Route path="/skills" element={<LazyRoute component={SkillsPage} />} />
              <Route path="/projects" element={<LazyRoute component={ProjectsPage} />} />
              <Route path="/login" element={<LazyRoute component={LoginPage} API_BASE_URL={API_BASE_URL} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
              <Route path="/register" element={<LazyRoute component={RegisterPage} API_BASE_URL={API_BASE_URL} />} />
              <Route 
                path="/mypage" 
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <LazyRoute component={MyPage} currentUser={currentUser} API_BASE_URL={API_BASE_URL} />
                  </ProtectedRoute>
                } 
              />
              <Route path="/diary" element={<Navigate to="/diet" replace />} />
              <Route 
                path="/diet" 
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <LazyRoute component={DietPage} currentUser={currentUser} API_BASE_URL={API_BASE_URL} />
                  </ProtectedRoute>
                } 
              />
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
