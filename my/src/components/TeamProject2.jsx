import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { Link } from 'react-router-dom';
import { media } from '../utils/mediaQueries';
import { FaUsers, FaDumbbell, FaComments, FaVideo, FaUserShield, FaReact, FaDatabase, FaServer, FaTools } from 'react-icons/fa';
import { SiSpringboot, SiMysql, SiWebrtc, SiThymeleaf } from "react-icons/si";
import { PreviewBox, PreviewFrame } from '../styles/GlobalStyles';

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
    min-width: 20px; 
  }
`;

const GoalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const GoalItem = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .icon-wrapper {
    font-size: 2.5rem;
    color: var(--accent-color);
    margin-right: 1.5rem;
    flex-shrink: 0;
  }

  .text-wrapper {
    h4 {
      font-size: 1.2em;
      font-weight: 600;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 0.95em;
      color: var(--secondary-text-color);
      line-height: 1.5;
    }
  }
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .icon-wrapper {
    font-size: 3rem;
    color: var(--accent-color); 
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.1em;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 0.9em;
    color: var(--secondary-text-color);
    line-height: 1.4;
    word-break: keep-all;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;

  li {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.6;
    
    &:before {
      content: "•";
      color: var(--accent-color);
      font-weight: bold;
      position: absolute;
      left: 0;
      top: 0.1em;
    }
  }

  strong {
    font-weight: 600;
    color: var(--primary-color); 
    margin-right: 0.5em;
  }
`;

const MeHighlight = styled.li`
  margin-bottom: 1rem;
  position: relative;
  line-height: 1.6;
  background-color: rgba(53, 152, 219, 0.1);
  border-left: 3px solid var(--accent-color);
  padding: 1rem 1rem 1rem 2rem;
  border-radius: 0 4px 4px 0;
  
  &:before {
    content: "★";
    color: var(--accent-color);
    font-weight: bold;
    position: absolute;
    left: 0.75rem;
    top: 1rem;
  }
  
  strong {
    font-weight: 700;
    color: var(--accent-color); 
    margin-right: 0.5em;
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

const CodeBlock = styled.pre`
  background-color: var(--placeholder-bg);
  border-radius: 6px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: monospace;
  white-space: pre-wrap;
  overflow-x: auto;
  font-size: 0.9rem;
  
  ${media.mobile} {
    padding: 0.8rem;
    font-size: 0.8rem;
  }
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
  
  ul {
    list-style-type: disc;
    padding-left: 1.2rem;
    margin-bottom: 1rem;
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }
  
  ${media.mobile} {
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;

export default function TeamProject2() {
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
          <h2>팀 프로젝트 2: WORK OUT - 운동 커뮤니티 플랫폼</h2>
        </ProjectHeader>

        <ProjectSection variants={itemVariants}>
          <h3>개발 팀원</h3>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem' }}>
            <li>🧑‍💻 박무성 - 회원 시스템 전반(로그인, 회원가입, 정보수정 등)과 관련 화면 설계</li>
            <li>🧑‍💻 이솔 - 자유게시판과 댓글, 리스트 상세보기 등 커뮤니티 기능 중심 구현</li>
            <li>🧑‍💻 박재휘 - 운동정보 게시판, 메인페이지, 댓글 등 정보 공유와 `UI` 설계</li>
            <li style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>👨‍💻 박준우 (본인) - Q&A 게시판 전체, 게시판 레이아웃 통일, 프로젝트 종료후 `UI`/`UX` 개선, `WebSocket`/`WebRTC` 기반 실시간 화상통화 기능 추가 구현 등</li>
          </ul>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>프로젝트 목표</h3>
          <GoalGrid>
            <GoalItem>
              <div className="icon-wrapper"><FaDumbbell /></div>
              <div className="text-wrapper">
                <h4>운동 정보 공유</h4>
                <p>실제로 운동을 하면서 궁금했던 점, 팁, 루틴, 식단 등 다양한 정보를 나눌수있는는 공간을 만들고 싶었습니다.</p>
              </div>
            </GoalItem>
            <GoalItem>
              <div className="icon-wrapper"><FaComments /></div>
              <div className="text-wrapper">
                <h4>커뮤니티 활성화</h4>
                <p>운동을 하다 보면 혼자만의 고민이 생기기 마련인데, 자유롭게 소통할 수 있는 게시판과 전문가에게 Q&A를 통해 물어보고 도움을 받을 수 있는 공간을 만들고 싶었습니다.</p>
              </div>
            </GoalItem>
            <GoalItem>
              <div className="icon-wrapper"><FaVideo /></div>
              <div className="text-wrapper">
                <h4>실시간 화상 트레이닝</h4>
                <p>직접 만나지 않아도 온라인에서 트레이너와 소통하거나, 친구와 함께 운동할 수 있도록 `WebRTC` 기반 화상통화 기능을 구현하였습니다.</p>
              </div>
            </GoalItem>
            <GoalItem>
              <div className="icon-wrapper"><FaUserShield /></div>
              <div className="text-wrapper">
                <h4>안전한 회원 시스템</h4>
                <p>커뮤니티가 커질수록 보안이 중요하다고 생각해서, `Spring Security`로 인증/권한 관리를 꼼꼼히 신경 썼습니다.</p>
              </div>
            </GoalItem>
          </GoalGrid>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>프로젝트 구조</h3>
          <CodeBlock>
{`
├── board - 자유게시판 관련 기능
├── exercise - 운동게시판 및 트레이닝 관련 기능
├── member - 회원 관리 기능
├── qna - Q&A 게시판 기능
├── video - 화상 통화 기능
└── security - 보안 및 인증 관련 기능`}
          </CodeBlock>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>주요 기능</h3>
          <FeatureList>
            <li><strong>회원가입 및 로그인 시스템:</strong> 단순한 인증을 넘어서, 실제로 사용자가 편하게 가입/탈퇴/정보수정까지 할 수 있도록 `UX`를 신경 썼습니다.</li>
            <li><strong>메인페이지:</strong> 각 게시판 미리보기, 최신글, 화상통화방 등 사용 흐름을 고려해 배치하였습니다.</li>
            <li><strong>운동 정보 게시판:</strong> 관리자만 글을 쓸 수 있게 권한을 분리하고, 동영상 미리보기, 키워드 검색 등 실제로 필요한 기능을 고민하였습니다.</li>
            <li><strong>자유게시판:</strong> 이미지 업로드, 댓글, 권한 관리 등 커뮤니티에서 자주 쓰는 기능을 직접 구현하였습니다.</li>
            <li><strong>Q&A 게시판:</strong> 진행 상태, 관리자 답변, `FAQ` 등 실제로 질문/답변이 활발히 오갈 수 있도록 설계하였습니다.</li>
            <li><strong>화상 통화:</strong> `WebRTC`와 `WebSocket`을 활용하여 화상통화를 구현하였습니다.</li>
          </FeatureList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>기술 스택</h3>
          <TechGrid>
            <TechItem>
              <div className="icon-wrapper"><SiSpringboot /></div>
              <h4>Backend</h4>
              <p>`Spring Boot`, `Spring Security`, `JPA`/`Hibernate`, `QueryDSL`</p>
            </TechItem>
            <TechItem>
              <div className="icon-wrapper"><SiThymeleaf /></div>
              <h4>Frontend</h4>
              <p>`Thymeleaf`, `HTML5`, `CSS3`, `JavaScript`</p>
            </TechItem>
            <TechItem>
              <div className="icon-wrapper"><SiMysql /></div>
              <h4>Database</h4>
              <p>`MariaDB`</p>
            </TechItem>
            <TechItem>
              <div className="icon-wrapper"><SiWebrtc /></div>
              <h4>통신 기술</h4>
              <p>`WebRTC`, `WebSocket`, `Spring WebMVC`</p>
            </TechItem>
          </TechGrid>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>세부 기능 설명</h3>
          <SubSection>
            <h4>1. 회원가입 및 로그인</h4>
            <ul>
              <li>아이디 중복 확인, 필수 입력값 체크 등 실제 사용자 입장에서 불편함이 없도록 신경 썼습니다.</li>
              <li>`Spring Security`로 인증/권한을 처리하고, 마이페이지에서 정보 수정/탈퇴까지 자연스럽게 연결될수 있도록 설계하였습니다.</li>
            </ul>
          </SubSection>
          <SubSection>
            <h4>2. 운동게시판</h4>
            <ul>
              <li>관리자만 글을 쓸 수 있게 권한을 분리하고, 동영상 미리보기, 키워드 검색 등 실제로 필요한 기능을 구현하였습니다.</li>
              <li>댓글 기능을 통해 사용자 간 피드백이 활발히 오갈 수 있도록 하였습니다.</li>
            </ul>
          </SubSection>
          <SubSection>
            <h4>3. 자유게시판</h4>
            <ul>
              <li>누구나 자유롭게 글을 쓰고, 이미지를 올릴 수 있도록 구현하였습니다.</li>
              <li>본인 글만 수정/삭제할 수 있게 권한을 세밀하게 나눴습니다.</li>
              <li>댓글 시스템으로 커뮤니티가 더 활발해질수 있도록 설계하였습니다.</li>
            </ul>
          </SubSection>
          <SubSection>
            <h4>4. Q&A 게시판</h4>
            <ul>
              <li>진행 상태, 관리자 답변, `FAQ` 등 실제로 질문/답변이 활발히 오갈 수 있도록 설계하였습니다.</li>
              <li>관리자는 완료 상태를 변경할수있게 하여 관리가 용이하도록 설계하였습니다.</li>
            </ul>
          </SubSection>
          <SubSection>
            <h4>5. 화상 통화 시스템</h4>
            <ul>
              <li>`WebRTC`와 `WebSocket`을 사용하여 구현하였으며, 이를통해 실시간 연결의 어려움에 대하여 알 수 있었습니다.</li>
              <li>관리자만 방을 만들수 있도록 하는등 실제 서비스에서 필요한 기능을 하나씩 구현하였습니다.</li>
            </ul>
          </SubSection>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>나의 역할 및 기여</h3>
          <p>팀내에서 전체적인 `UI` 통일과 Q&A 계시판 구현을 담당하였습니다.그리고 프로젝트가 끝난후 아쉬움을 느껴 화상통화,디자인개선등을 진행하였습니다.</p>
          <LearnedPointsList>
            <li>
              <strong>`WebRTC` 직접 구현 경험</strong>
              실시간 화상 통신을 직접 구현하면서, 실시간 연결의 복잡함을 느낄수있었습니다.
            </li>
            <li>
              <strong>보안 체계 구축 경험</strong>
              `Spring Security`로 세션 인증, 권한 관리, 암호화, `CSRF`·`CORS` 정책 등 실제 서비스에 필요한 보안 요소를 하나씩 적용해봤습니다.
            </li>
            <li>
              <strong>풀스택 개발 역량 강화</strong>
              프론트와 백엔드를 모두 경험하며, 서버사이드 렌더링과 `API` 설계의 장단점을 직접 체감하였습니다.
            </li>
            <li>
              <strong>코드 품질 관리와 협업</strong>
              코드 리뷰와 문서화를 통해 팀원들과 소통하며, 유지보수성과 개발 효율을 높이는 방법을 배웠습니다.
            </li>
          </LearnedPointsList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>결과 및 배운 점</h3>
          <p>이 프로젝트를 통해 실시간 통신, 보안, 협업 등 다양한 영역에서 실무에 가까운 경험을 쌓을 수 있었습니다. 특히 `WebRTC`와 `WebSocket`의 연동, `Spring Security`, 그리고 다양한 사용자 권한에 따른 기능 제어를 직접 구현하며, 실제 서비스 개발에 필요한 역량을 키웠습니다.</p>
          <LearnedPointsList>
            <li>
              <strong>실시간 통신 기술의 현실</strong>
              `WebRTC`의 복잡함과 `WebSocket` 연동의 어려움을 직접 겪으며, 실시간 서비스의 설계와 운영에 대한 감을 잡을 수 있었습니다.
            </li>
            <li>
              <strong>보안과 사용성의 균형</strong>
              보안이 아무리 중요해도, 사용자가 불편하면 안 된다는 점을 다시 한 번 느꼈습니다. 실제로 여러 번 `UX`를 개선하였습니다.
            </li>
            <li>
              <strong>협업과 소통의 힘</strong>
              팀원들과의 소통, 코드 리뷰, 문서화가 프로젝트의 완성도를 얼마나 높여주는지 몸소 체감하였습니다.
            </li>
            <li>
              <strong>사용자 중심 개발</strong>
              실제 사용자 입장에서 기능을 설계하고, 피드백을 반영하는 과정이 가장 중요하다는 걸 배웠습니다.
            </li>
          </LearnedPointsList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>관련 링크</h3>
          <p><StyledLink href="https://github.com/kapu0377/new-workout" target="_blank" rel="noopener noreferrer">`GitHub Repository`</StyledLink></p>
        </ProjectSection>
        
        <ProjectSection variants={itemVariants}>
          <h3>상세 구현 과정</h3>
          <StyledInternalLink to="/projects/team-2/details">
            WORK OUT 프로젝트 상세 구현 과정 보기
          </StyledInternalLink>
        </ProjectSection>
      </ContentWrapper>
    </ProjectDetailContainer>
  );
} 