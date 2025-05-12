import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { Link } from 'react-router-dom';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import { media } from '../utils/mediaQueries';
import { PreviewBox, PreviewFrame } from '../styles/GlobalStyles';
import ClickableGif from '../components/ClickableGif';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('java', java);

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
  
  h4 {
    font-size: 1.3em;
    font-weight: 600;
    color: var(--primary-color);
    margin: 1.5rem 0 1rem;
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

const ArchitectureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

const CodeStructure = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: monospace;
  white-space: pre-wrap;
  line-height: 1.5;
  font-size: 0.9em;
  
  ${media.mobile} {
    padding: 1rem;
    font-size: 0.8em;
  }
`;

const TechItem = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed var(--placeholder-bg);
  
  &:last-child {
    border-bottom: none;
  }
  
  strong {
    color: var(--primary-color);
    font-weight: 600;
    display: block;
    margin-bottom: 0.5rem;
  }
`;

const Feature = styled.div`
  margin-bottom: 2rem;
  
  h4 {
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.5rem;
      color: var(--accent-color);
    }
  }
`;

export default function TeamProject1Details() {
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
          <h2>팀 프로젝트 1: EZPZ 상세 구현 과정</h2>
          <p>여행자를 위한 종합 정보 플랫폼 EZPZ의 기술적 설계, 구현 과정, 그리고 주요 기능에 대한 상세 설명입니다.</p>
        </ProjectHeader>

        <ProjectSection variants={itemVariants}>
          <h3>프로젝트 아키텍처</h3>
          <p>EZPZ 프로젝트는 `React` 프론트엔드와 `Spring Boot` 백엔드로 구성된 웹 애플리케이션으로, 여행자에게 필요한 다양한 정보와 기능을 제공합니다.</p>
          
          <h4>기술 스택 선정 이유</h4>
          <TechItem>
            <strong>프론트엔드: `React.js`</strong>
            <p>컴포넌트 기반 개발로 재사용성을 높이고, 가상 DOM을 통해 효율적인 렌더링이 가능합니다. `Context API`를 활용하여 복잡한 상태 관리 라이브러리 없이도 전역 상태를 관리할 수 있었습니다.</p>
          </TechItem>
          <TechItem>
            <strong>백엔드: `Spring Boot`</strong>
            <p>강력한 의존성 주입과 보안 기능(`Spring Security`)을 활용하여 안전한 인증 시스템을 구축할 수 있었습니다. 또한 `JPA`/`Hibernate`를 통해 객체 지향적인 데이터 접근이 가능했습니다.</p>
          </TechItem>
          <TechItem>
            <strong>데이터베이스: `MariaDB`</strong>
            <p>오픈소스이면서도 `MySQL`과 높은 호환성을 제공하여 개발 환경에 적합했습니다. 관계형 데이터베이스로 데이터 무결성을 보장하고 복잡한 쿼리 처리에 적합했습니다.</p>
          </TechItem>
          
          <h4>시스템 아키텍처</h4>
          <p>EZPZ는 클라이언트-서버 아키텍처를 기반으로 구성되었으며, 프론트엔드와 백엔드가 `REST API`를 통해 통신합니다.</p>
          <CodeStructure>
{`[ 클라이언트 요청 ] ----> [ React 프론트엔드 ] ---- (HTTP 요청, 필요시 JSON 데이터 포함) ----> [ Spring Boot 백엔드 (REST API 제공) ]
                                       ▲                                                                      │
                                       │                                                                      ▼
    (HTTP 응답, JSON 데이터) <--------- ┘                                                               [ 데이터베이스 (MariaDB) ]`}
          </CodeStructure>
          
          <h4>코드 구조</h4>
          <CodeStructure>
{`/src
├── api/              # API 호출 관련 모듈
│   ├── authApi.jsx   # 인증 관련 API
│   ├── boardApi.jsx  # 게시판 관련 API
│   └── ...
├── components/       # UI 컴포넌트
│   ├── layout/       # 레이아웃 컴포넌트
│   ├── checklist/    # 체크리스트 관련 컴포넌트
│   └── ...
├── contexts/         # Context API 관련 파일
│   └── AuthContext.jsx # 인증 관련 Context
├── pages/            # 페이지 단위 컴포넌트
├── utils/            # 유틸리티 함수
├── App.jsx           # 메인 앱 컴포넌트 (라우팅)
└── index.js          # 진입점`}
          </CodeStructure>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>인증 시스템 구현</h3>
          <p>EZPZ 플랫폼은 `JWT`(JSON Web Token) 기반의 인증 시스템을 구현하여 사용자 계정 관리와 보안을 강화했습니다.</p>

          <h4>인증 흐름</h4>
          <p>1. 사용자가 로그인 정보(이메일, 비밀번호)를 입력합니다.</p>
          <p>2. 서버에서 비밀번호를 검증하고 JWT 토큰을 발급합니다.</p>
          <p>3. 클라이언트는 토큰을 `localStorage`에 저장하고 이후 `API` 요청 시 헤더에 포함합니다.</p>
          <p>4. 서버는 요청된 토큰의 유효성을 검증하고 리소스 접근을 허용합니다.</p>

          <h4>JWT 인증 처리 상세 흐름</h4>
          <CodeStructure>
{`1️⃣ 설정 및 초기화
  - JwtProperties: JWT 비밀키, 토큰 만료 시간 등 설정 로드
  - SecurityConfig: Stateless 모드 설정, JWT 필터 등록, URL 접근 권한 설정

2️⃣ 로그인 및 토큰 발급 과정
  - 클라이언트 → 서버: 로그인 요청 (username/password)
  - 인증 성공 시:
    - Access Token(단기) + Refresh Token(장기) 생성
    - Refresh Token은 DB에 사용자 정보와 함께 저장
    - 두 토큰 모두 클라이언트에 반환

3️⃣ API 요청 처리
  - 클라이언트: Authorization 헤더에 'Bearer {AccessToken}' 포함
  - JwtAuthenticationFilter:
    - 토큰 추출 → 유효성 검증 → 사용자 정보 추출
    - SecurityContext에 인증 정보 설정
  - 인증 성공 시 요청 처리 진행

4️⃣ 토큰 재발급
  - Access Token 만료 시 클라이언트가 재발급 요청
  - 서버는 Username 추출 → DB의 Refresh Token 확인
  - 유효한 Refresh Token 확인 시 새 Access Token 발급
  - 선택적으로 Refresh Token도 갱신 (Token Rotation)

5️⃣ 로그아웃
  - 클라이언트 요청 시 해당 사용자의 DB 내 Refresh Token 삭제
  - 클라이언트 측 토큰 삭제`}
          </CodeStructure>

          <h4>JWT 구현에 대한 고찰 및 개선점</h4>
          <p>프로젝트에서 채택한 `Refresh Token` 서버 단독 저장 방식에 대한 장단점과 향후 개선 방향을 정리했습니다.</p>
          
          <TechItem>
            <strong>현재 방식의 장점</strong>
            <p>보안성 측면에서 가장 큰 이점을 제공합니다. `Refresh Token`이 클라이언트에 노출되지 않아 XSS 공격으로 인한 토큰 탈취 위험을 원천 차단할 수 있습니다. 또한 서버에서 토큰의 생성부터 폐기까지 전체 생명주기를 직접 관리할 수 있어 사용자 세션을 완전히 제어할 수 있습니다.</p>
          </TechItem>
          
          <TechItem>
            <strong>개선이 필요한 부분</strong>
            <p>`Access Token` 재발급 메커니즘의 복잡성이 가장 큰 고민입니다. 클라이언트에는 `Refresh Token` 정보가 없기 때문에, 서버는 만료된 `Access Token`에서 사용자 식별 정보를 추출해야 합니다. 만약 `Access Token`이 손상되었다면 재발급 자체가 실패할 수 있는 잠재적 위험이 있습니다.</p>
          </TechItem>
          
          <TechItem>
            <strong>향후 개선 방안</strong>
            <p>로그인 시 `Refresh Token`은 여전히 DB에 저장하되, 해당 토큰을 식별할 수 있는 고유 ID만을 `HttpOnly` 쿠키로 클라이언트에 제공하는 방식을 고려중입니다. 이렇게 하면 `Access Token` 상태와 무관하게 안전하게 `Refresh Token`을 조회할 수 있습니다. 추가로 보안 강화를 위해 `Refresh Token Rotation`을 도입하여 재발급 시 기존 토큰을 무효화하는 방식도 검토중입니다.</p>
          </TechItem>
          
          <TechItem>
            <strong>추가 고려사항</strong>
            <p>DB 의존성이 높아지는 점을 고려하여 DB 보안 강화와 최적화가 필요합니다. `Access Token`의 유효 기간을 짧게 유지하고, 토큰에 담는 정보는 최소화하는 정책을 유지하는 것도 중요합니다. 클라이언트에서의 토큰 저장 방식(메모리, 세션 스토리지)에 대한 보안성도 지속적으로 검토할 필요가 있습니다.</p>
          </TechItem>

          <h4>주요 구현 코드 (프론트엔드)</h4>
          <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, register, logout } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 토큰이 있으면 사용자 정보 불러오기
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserData = async () => {
    // 사용자 정보 가져오는 API 호출
    // ...
    setLoading(false);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ... 회원가입, 로그아웃 등 구현 ...

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);`}
          </SyntaxHighlighter>

          <h4>백엔드 인증 처리</h4>
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`// SecurityConfig.java 
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll() // /api/auth/** 경로는 인증 없이 접근 허용
                        .anyRequest().permitAll() // 나머지 요청은 일단 모두 허용 (추후 필요시 .authenticated() 등으로 변경)
                )
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS); // 세션 사용 안 함 (JWT 사용)

        // JWT 필터를 UsernamePasswordAuthenticationFilter 앞에 추가
        http.addFilterBefore(
                new JwtAuthenticationFilter(tokenProvider, customUserDetailsService),
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 비밀번호 암호화에 BCrypt 사용
    }
}`}
          </SyntaxHighlighter>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>JWT 인증 시스템</h3>
          <p>EZPZ 프로젝트는 안전한 사용자 인증을 위해 `JWT`(JSON Web Token) 기반의 인증 시스템을 구현했습니다.</p>
          
          <h4>JWT 인증 구조</h4>
          <CodeStructure>
{`JWT 인증 시스템 아키텍처
├── AccessToken (단기 토큰)
│   ├── 유효기간: 30분
│   └── 저장위치: 브라우저 메모리(localStorage)
└── RefreshToken (장기 토큰)
    ├── 유효기간: 7일
    └── 저장위치: 데이터베이스 및 쿠키

# 주요 기능
# - 로그인 시 AccessToken과 RefreshToken 발급
# - API 요청 시 AccessToken을 통한 사용자 인증
# - AccessToken 만료 시 RefreshToken을 통한 자동 재발급
# - 로그아웃 시 토큰 무효화 처리`}
          </CodeStructure>
          
          <h4>JWT 인증 흐름</h4>
          <p>JWT 기반 인증 시스템의 작동 방식은 다음과 같습니다:</p>
          <ol>
            <li>사용자가 로그인 시 서버는 사용자 정보를 검증한 후 AccessToken과 RefreshToken을 발급합니다.</li>
            <li>AccessToken은 모든 API 요청의 Authorization 헤더에 포함되어 사용자를 인증합니다.</li>
            <li>AccessToken이 만료되면 클라이언트는 RefreshToken을 사용하여 새로운 AccessToken을 요청합니다.</li>
            <li>서버는 RefreshToken의 유효성을 검증하고 새로운 AccessToken을 발급합니다.</li>
            <li>로그아웃 시 서버는 데이터베이스에서 RefreshToken을 제거하고 클라이언트는 저장된 토큰을 삭제합니다.</li>
          </ol>
          
          <h4>JWT 구현 코드</h4>
          <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// authContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { loginApi, refreshTokenApi, logoutApi } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true);
  
  // 토큰 유효성 검사
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decoded = jwt_decode(token);
      return decoded.exp * 1000 > Date.now();
    } catch (e) {
      return false;
    }
  };
  
  // 토큰 갱신
  const refreshToken = async () => {
    try {
      const response = await refreshTokenApi();
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };
  
  // 로그인
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginApi(email, password);
      const { accessToken, user } = response.data;
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || '로그인에 실패했습니다.' 
      };
    } finally {
      setLoading(false);
    }
  };
  
  // 로그아웃
  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('로그아웃 에러:', error);
    } finally {
      localStorage.removeItem('accessToken');
      setAccessToken(null);
      setCurrentUser(null);
    }
  };
  
  // 컴포넌트 마운트 시 사용자 정보 로드
  useEffect(() => {
    const loadUser = async () => {
      if (accessToken && isTokenValid(accessToken)) {
        // 액세스 토큰으로 사용자 정보 로드
        try {
          // API 호출로 사용자 정보 가져오기...
          setCurrentUser(user);
        } catch (error) {
          // 오류 시 토큰 갱신 시도
          const refreshed = await refreshToken();
          if (!refreshed) setCurrentUser(null);
        }
      } else if (accessToken) {
        // 토큰이 만료된 경우 갱신 시도
        const refreshed = await refreshToken();
        if (!refreshed) setCurrentUser(null);
      }
      setLoading(false);
    };
    
    loadUser();
  }, []);
  
  const value = {
    currentUser,
    accessToken,
    login,
    logout,
    refreshToken,
    loading
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);`}
          </SyntaxHighlighter>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>데이터베이스 설계</h3>
          <p>EZPZ 프로젝트에서는 다양한 엔티티가 관련된 복잡한 데이터 모델을 설계했습니다. `JPA`/`Hibernate`를 사용하여 객체 지향적인 데이터 접근을 구현했습니다.</p>
          
          <h4>주요 엔티티 구조</h4>
          <CodeStructure>
{`User
├── Checklist             (관계: User 1 : N Checklist)
│   └── ChecklistCategory (관계: Checklist 1 : N Category)
│       └── ChecklistItem (관계: Category 1 : N Item)
├── SearchHistory         (관계: User 1 : N SearchHistory)
└── Post                  (관계: User 1 : N Post)
    └── Comment           (관계: Post 1 : N Comment)

ProhibitedItem            # 금지 물품 정보
Board                     # 게시판 정보
AirportParking            # 공항 주차 정보
JwtToken                 # JWT 토큰 정보 (액세스 토큰, 리프레시 토큰)

# 상세 설명
# - User: 사용자 정보(ID, 사용자명, 비밀번호, 이름, 전화번호, 이메일, 주소, 성별)
# - Checklist: 사용자별 체크리스트
# - ChecklistCategory: 체크리스트 카테고리
# - ChecklistItem: 체크리스트 아이템
# - ProhibitedItem: 금지 물품 정보
# - SearchHistory: 검색 기록
# - Board: 게시판 정보
# - Post: 게시글
# - Comment: 댓글
# - AirportParking: 공항 주차 정보
# - JwtToken: 사용자 인증 토큰(액세스 토큰, 리프레시 토큰, 만료 시간)`}
          </CodeStructure>

          <h4>엔티티 관계</h4>
          <p>프로젝트에서는 `JPA`와 `Hibernate`를 활용하여 객체-관계 매핑(ORM)을 구현했습니다. 주요 엔티티 간의 관계는 다음과 같습니다:</p>
          <ul>
            <li>`User-Checklist`: 일대다 관계로, 한 사용자는 여러 체크리스트를 가질 수 있습니다.</li>
            <li>`Checklist-Category`: 일대다 관계로, 하나의 체크리스트는 여러 카테고리를 가질 수 있습니다.</li>
            <li>`Category-ChecklistItem`: 일대다 관계로, 하나의 카테고리는 여러 아이템을 포함할 수 있습니다.</li>
            <li>`User-Post`: 일대다 관계로, 한 사용자는 여러 게시글을 작성할 수 있습니다.</li>
            <li>`Post-Comment`: 일대다 관계로, 하나의 게시글은 여러 댓글을 가질 수 있습니다.</li>
          </ul>
          <p>각 엔티티는 `JPA` 애노테이션을 사용하여 테이블 매핑, 컬럼 정의, 관계 설정 등을 구현했습니다. 특히 `@OneToMany`, `@ManyToOne` 애노테이션을 활용하여 양방향 관계를 설정하고, `cascade` 옵션을 통해 연관 엔티티의 생명주기를 관리했습니다.</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>주요 기능 구현</h3>
          
          <h4>1. 체크리스트 기능</h4>
          <p>사용자별 맞춤형 여행 준비물 체크리스트를 관리할 수 있는 기능입니다. 카테고리별로 구분되며 항목 추가/삭제/수정이 가능합니다.</p>
          <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// ChecklistCategory.jsx
const ChecklistCategory = ({ category, items, onAddItem, onEditCategory, onDeleteCategory }) => {
  const [newItemText, setNewItemText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const handleAddItem = () => {
    if (newItemText.trim()) {
      onAddItem(category.id, newItemText);
      setNewItemText('');
    }
  };
  
  return (
    <CategoryContainer>
      <CategoryHeader>
        {isEditing ? (
          <CategoryEditForm onSubmit={/* ... */} />
        ) : (
          <>
            <CategoryTitle>{category.name}</CategoryTitle>
            <CategoryActions>
              <EditButton onClick={() => setIsEditing(true)} />
              <DeleteButton onClick={() => onDeleteCategory(category.id)} />
            </CategoryActions>
          </>
        )}
      </CategoryHeader>
      
      <ItemList>
        {items.map(item => (
          <ChecklistItem 
            key={item.id} 
            item={item} 
            onToggle={/* ... */}
            onEdit={/* ... */}
            onDelete={/* ... */}
          />
        ))}
      </ItemList>
      
      <AddItemForm>
        <input 
          value={newItemText}
          onChange={e => setNewItemText(e.target.value)}
          placeholder="새 항목 추가..."
        />
        <button onClick={handleAddItem}>추가</button>
      </AddItemForm>
    </CategoryContainer>
  );
};`}
          </SyntaxHighlighter>
          
          <ImageContainer>
            <ClickableGif 
              src="/images/checklist-demo.gif" 
              alt="체크리스트 기능" 
              staticSrc="/images/checklist-demo.png"
              title="체크리스트 기능"
            />
            <ImageCaption>그림 1: 카테고리별 여행 준비물 체크리스트 관리 기능</ImageCaption>
          </ImageContainer>
          
          <h4>2. 금지 물품 검색 기능</h4>
          <p>공항 보안 규정에 따른 기내 반입 금지 물품을 검색하고 시각화하여 보여주는 기능입니다.</p>
          <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// ProhibitedItemSearch.jsx
const ProhibitedItemSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchProhibitedItems(searchTerm);
      setSearchResults(results);
      // 검색 기록 저장 API 호출
      saveSearchHistory(searchTerm);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SearchContainer>
      <SearchInput
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="물품명을 입력하세요..."
      />
      <SearchButton onClick={handleSearch} disabled={loading}>
        {loading ? '검색 중...' : '검색'}
      </SearchButton>
      
      <ResultsContainer>
        {searchResults.map(item => (
          <ItemCard key={item.id}>
            <ItemIcon type={item.categoryCode} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemCategory>{item.category}</ItemCategory>
              <AllowedStatus allowed={item.allowed}>
                {item.allowed ? '기내 반입 가능' : '기내 반입 금지'}
              </AllowedStatus>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemDetails>
          </ItemCard>
        ))}
      </ResultsContainer>
    </SearchContainer>
  );
};`}
          </SyntaxHighlighter>
          
          <ImageContainer>
            <ClickableGif 
              src="/images/prohibited-items-demo.gif" 
              alt="금지 물품 검색 기능"
              staticSrc="/images/prohibited-items-demo.png"
              title="금지 물품 검색 기능" 
            />
            <ImageCaption>그림 2: 항공 여행 시 금지 물품 검색 및 정보 제공 기능</ImageCaption>
          </ImageContainer>
          
          <h4>3. 공항 주차 정보</h4>
          <p>공항별 실시간 주차 정보를 `API`를 통해 제공하는 기능입니다.</p>
          <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
{`// AirportParking.jsx
const AirportParking = () => {
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [parkingInfo, setParkingInfo] = useState(null);
  
  useEffect(() => {
    // 공항 목록 불러오기
    fetchAirports().then(data => {
      setAirports(data);
      if (data.length > 0) {
        setSelectedAirport(data[0].id);
      }
    });
  }, []);
  
  useEffect(() => {
    if (selectedAirport) {
      // 선택된 공항의 주차 정보 불러오기
      fetchParkingInfo(selectedAirport).then(setParkingInfo);
    }
  }, [selectedAirport]);
  
  return (
    <ParkingContainer>
      <AirportSelector 
        airports={airports} 
        selectedAirport={selectedAirport}
        onChange={setSelectedAirport}
      />
      
      {parkingInfo && (
        <ParkingInfoCard>
          <ParkingHeader>
            <h4>{parkingInfo.airportName} 주차 현황</h4>
            <LastUpdated>
              최종 업데이트: {new Date(parkingInfo.lastUpdated).toLocaleString()}
            </LastUpdated>
          </ParkingHeader>
          
          <ParkingLots>
            {parkingInfo.lots.map(lot => (
              <ParkingLot key={lot.id}>
                <LotName>{lot.name}</LotName>
                <LotStatus>
                  <StatusBar 
                    percentage={lot.occupancyRate} 
                    color={getStatusColor(lot.occupancyRate)}
                  />
                  <StatusText>
                    {lot.availableSpots}/{lot.totalSpots} 자리 남음
                    ({lot.occupancyRate}% 사용 중)
                  </StatusText>
                </LotStatus>
              </ParkingLot>
            ))}
          </ParkingLots>
          
          <ExternalLinks>
            <a href={parkingInfo.mapUrl} target="_blank" rel="noopener noreferrer">
              주차장 지도 보기
            </a>
            <a href={parkingInfo.officialUrl} target="_blank" rel="noopener noreferrer">
              공항 공식 웹사이트
            </a>
          </ExternalLinks>
        </ParkingInfoCard>
      )}
    </ParkingContainer>
  );
};`}
          </SyntaxHighlighter>
          
          <ImageContainer>
            <ClickableGif 
              src="/images/airport-parking-demo.gif" 
              alt="공항 주차 정보 기능 데모"
              staticSrc="/images/airport-parking-demo.png"
              title="공항 주차 정보" 
            />
            <ImageCaption>그림 3: 실시간 공항 주차장 정보 제공 기능</ImageCaption>
          </ImageContainer>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>프로젝트 UI 및 주요 화면</h3>
          <p>EZPZ 프로젝트의 핵심 UI 화면과 컴포넌트에 대한 설명입니다. 아래는 주요 화면의 모습과 기능입니다.</p>
          
          <h4>UI 디자인 및 화면 구성</h4>
          <p>프로젝트의 디자인은 직관적이고 사용하기 쉬운 인터페이스를 목표로 했습니다. 모바일 환경에서도 최적화된 반응형 디자인을 적용했습니다.</p>
              
          
          <h4>주요 기능 화면</h4>
          <p>아래는 프로젝트의 주요 기능의 소개입니다. 각 화면은 사용자 친화적인 UI로 설계되었습니다.</p>
          
          <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '56.25%', marginBottom: '2rem', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <iframe
              src="https://docs.google.com/presentation/d/1-FyO_2DupKncMMDPK3Bu-Wi5Lv7J9wxG/embed?start=false&loop=false&delayms=3000"
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              allowFullScreen
              title="EZPZ 프로젝트 발표 슬라이드"
            ></iframe>
          </div>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>EZPZ 체험하기</h3>
          <p>아래에서 직접 EZPZ 플랫폼을 체험해보세요. 실제 서비스의 기능을 모두 테스트해볼 수 있습니다.</p>
          
          <PreviewBox>
            <PreviewFrame
              src="https://caff.pw/"
              title="EZPZ 체험하기"
              allow="fullscreen; clipboard-read; clipboard-write"
            />
          </PreviewBox>
          
          <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
            <h4>서비스 링크</h4>
            <p>
              <StyledLink href="https://caff.pw/" target="_blank" rel="noopener noreferrer">EZPZ 서비스 바로가기</StyledLink> | 
              <StyledLink href="https://github.com/Dicaffeinonemore/EZPZ" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '1rem' }}>GitHub 저장소</StyledLink>
            </p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <h4>개발 팀원</h4>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem' }}>
              <li>🧑‍💻 박무성 - 게시판 등록/삭제/수정, 댓글 기능, 게시판 UI 구현</li>
              <li>🧑‍💻 이솔 - 공항/주차 현황 UI 구현, 주차 현황 API 연동, 항공안전 정보 구현</li>
              <li style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>👨‍💻 박준우 (본인) - 메인화면 구현, 홈페이지 UI/UX 설계, 로그인/회원가입, JWT 토큰 인증</li>
              <li>👨‍💻 천다현 - 마이페이지/체크리스트 UI, 체크리스트 추가/수정/제거, 짐꾸리기 기능</li>
              <li>👨‍💻 이승훈 - 금지물품 목록 페이지 UI, 금지물품 데이터 표시, 공항별 정보 그래프</li>
            </ul>
          </div>
        </ProjectSection>
      </ContentWrapper>
    </ProjectDetailContainer>
  );
}
