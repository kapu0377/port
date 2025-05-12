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
          <h2>팀 프로젝트 1: 상세 구현 과정</h2>
          <p>Spring Boot + React 웹사이트 프로젝트의 상세 구현 내용, 기술적 선택 이유, 팀 내 역할 분담 등을 기록합니다.</p>
        </ProjectHeader>

        <ProjectSection variants={itemVariants}>
          <h3>프로젝트 아키텍처</h3>
          <p>[시스템 구성도, 기술 스택 선정 이유 등 설명]</p>
          {/* <ImageContainer>
            <ProjectImage src="/path/to/architecture1.png" alt="프로젝트 1 아키텍처" />
            <ImageCaption>프로젝트 아키텍처 및 기술 스택 구성도</ImageCaption>
          </ImageContainer> */}
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>회원 가입 기능</h3>

          <p>사용자는 이메일, 비밀번호, 이름을 입력하여 가입할 수 있습니다. 비밀번호는 안전하게 해싱되어 저장됩니다.</p>

          <h4>작동 순서 및 화면</h4>
          <p>1. 사용자가 가입 폼에 정보를 입력합니다.</p>
          <ImageContainer>
            <ProjectImage src="/images/signup-step1.png" alt="회원가입 1단계" />
            <ImageCaption>회원가입 1단계: 사용자 정보 입력 화면</ImageCaption>
          </ImageContainer>
          
          <p>2. '가입하기' 버튼을 누르면 유효성 검사를 거칩니다.</p>
          <ImageContainer>
            <ProjectImage src="/images/signup-step2.png" alt="회원가입 2단계" />
            <ImageCaption>회원가입 2단계: 유효성 검사 및 완료 화면</ImageCaption>
          </ImageContainer>
          
          {/* 만약 스크린샷이 더 많다면 캐러셀 등으로 묶기 */}

          <h4>주요 구현 코드 (React & Spring Boot)</h4>
          <p>프론트엔드에서는 React Hook Form을 사용해 유효성 검사를 처리하고, 백엔드 API를 호출합니다.</p>
          <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
            {`// React 코드 예시
const onSubmit = async (data) => {
  try {
    // axios import 필요
    await axios.post('/api/users/signup', data);
    // 가입 성공 처리 (예: 알림 표시, 로그인 페이지 이동)
    console.log('회원가입 성공!');
  } catch (error) {
    // 에러 처리 (예: 사용자에게 에러 메시지 표시)
    console.error('회원가입 실패:', error);
  }
};`}
          </SyntaxHighlighter>

          <p>백엔드에서는 Spring Security를 사용해 비밀번호를 BCrypt로 암호화하여 저장합니다.</p>
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {`// Spring Boot 코드 예시
// (@RestController, @RequestMapping, @Autowired 등 필요)
@PostMapping("/signup")
public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
        return ResponseEntity
                .badRequest()
                .body("Error: Email is already in use!");
    }
    // User 엔티티, SignUpRequest DTO 정의 필요
    User user = new User(signUpRequest.getName(),
                         signUpRequest.getEmail(),
                         passwordEncoder.encode(signUpRequest.getPassword())); // PasswordEncoder 빈 등록 필요
    
    userRepository.save(user); // UserRepository 인터페이스 정의 필요

    return ResponseEntity.ok("User registered successfully!");
}`}
          </SyntaxHighlighter>
          {/* 필요시 아키텍처나 로직 다이어그램 이미지 추가 */}
          {/* <img src="/images/signup-logic.png" alt="회원가입 로직" /> */}

        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>프론트엔드 상태 관리 및 UI 구현</h3>
          <p>[React 컴포넌트 구조, 상태 관리 라이브러리(Redux/Recoil 등) 사용 이유 및 방식, 주요 UI 구현 과정]</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>데이터베이스 연동 (JPA/MyBatis)</h3>
          <p>[엔티티 설계, Repository 구현, 주요 쿼리 작성 및 최적화 경험 등]</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>협업 방식 (Git-flow, 코드 리뷰)</h3>
          <p>[팀 내에서 사용한 Git 브랜치 전략, 코드 리뷰 과정 및 효과 등]</p>
        </ProjectSection>

         <ProjectSection variants={itemVariants}>
          <h3>참고 자료 및 링크</h3>
          {/* <p>돌아가기: <StyledInternalLink to="/projects/team-1">팀 프로젝트 1 개요</StyledInternalLink></p> */}
           {/* 외부 링크 필요시 StyledLink 사용 */}
        </ProjectSection>

        {/* 필요한 만큼 섹션 추가 */}

      </ContentWrapper>
    </ProjectDetailContainer>
  );
} 