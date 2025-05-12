import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { Link } from 'react-router-dom';
import { media } from '../utils/mediaQueries';
import { FaBan, FaParking, FaLuggageCart, FaClipboardList, FaReact, FaServer, FaDatabase, FaTools } from 'react-icons/fa';
import { SiSpringboot, SiMariadb } from "react-icons/si";
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

const ProjectHeader = styled(motion.header)` // 아이템
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

export default function TeamProject1() {
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
          <h2>팀 프로젝트 1: EZPZ - 쉽고 안전한 여행을 위한 항공 플랫폼</h2>
          <p>'EZPZ'(Easy Peasy)는 급증하는 항공 여행 수요와 높아진 안전 규정 관심 속에서, 복잡한 항공 정보를 사용자가 쉽게 이해하고 활용하도록 돕는 웹 플랫폼입니다. 여행 준비부터 공항 이용까지 필요한 정보를 통합 제공하여 안전하고 편리한 여행을 지원합니다.</p>
        </ProjectHeader>

        <ProjectSection variants={itemVariants}>
          <h3>프로젝트 목표</h3>
          <GoalGrid>
            <GoalItem>
              <div className="icon-wrapper"><FaBan /></div>
              <div className="text-wrapper">
                <h4>금지물품 정보 제공</h4>
                <p>복잡한 기내 반입 금지 규정을 쉽게 검색하고 시각화된 데이터로 제공하여 실수를 방지합니다.</p>
              </div>
            </GoalItem>
            <GoalItem>
              <div className="icon-wrapper"><FaParking /></div>
              <div className="text-wrapper">
                <h4>실시간 주차 정보</h4>
                <p>여러 공항의 분산된 주차 정보를 실시간으로 통합 제공하여 공항 이용 편의성을 높입니다.</p>
              </div>
            </GoalItem>
            <GoalItem>
              <div className="icon-wrapper"><FaLuggageCart /></div>
              <div className="text-wrapper">
                <h4>개인 맞춤 체크리스트</h4>
                <p>사용자별 여행 스타일에 맞춰 필요한 물품 목록을 관리하며 안전 관련 필수품을 놓치지 않도록 돕습니다.</p>
              </div>
            </GoalItem>
            <GoalItem>
              <div className="icon-wrapper"><FaClipboardList /></div>
              <div className="text-wrapper">
                <h4>커뮤니티 및 FAQ</h4>
                <p>여행객 간 정보 교류(팁, 후기)를 활성화하고 `FAQ`를 통해 기본적인 궁금증을 해소하는 공간을 제공합니다.</p>
              </div>
            </GoalItem>
          </GoalGrid>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>주요 기능</h3>
          <FeatureList>
            <li><strong>메인 홈페이지:</strong> 캐러셀 배너, 핵심 기능(항공편 조회, 금지물품 검색) 빠른 접근, 검색 순위, 부가 정보(유튜브, 이미지, 주차 현황, 최신글) 제공</li>
            <li><strong>로그인/회원가입:</strong> 기본 인증, 비밀번호 이중 확인 및 암호화, `Token` 기반 로그인 유지</li>
            <li><strong>금지 물품:</strong> 카테고리별 분류, 도표를 이용한 시각화, 사용자 검색 기능, 검색 기록 저장 및 조회</li>
            <li><strong>게시판:</strong> 게시글 `CRUD`, 댓글 기능, 게시글 검색, `FAQ` 제공, 본인 확인 로직</li>
            <li><strong>주차 현황:</strong> 오픈 `API` 연동 실시간 정보, 주차 요금, 공항 홈페이지/지도 연동, 만족도 평가</li>
            <li><strong>체크리스트:</strong> 개인 맞춤형 리스트 생성/관리 (카테고리/아이템 `CRUD`), 편집 모드, 전체 상태 초기화</li>
            <li><strong>회원 정보 관리:</strong> 회원 정보 수정 (이메일 수정 불가), 회원 탈퇴 (비밀번호 확인, 관련 데이터 연쇄 삭제)</li>
          </FeatureList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>기술 스택</h3>
          <TechGrid>
            <TechItem>
              <div className="icon-wrapper"><FaReact /></div> 
              <h4>Frontend</h4>
              <p>`Node.js`, `JavaScript`, `React`</p>
            </TechItem>
            <TechItem>
              <div className="icon-wrapper"><SiSpringboot /></div>
              <h4>Backend</h4>
              <p>`Spring Boot`, `Spring Security`, `JPA`/`Hibernate`</p>
            </TechItem>
            <TechItem>
              <div className="icon-wrapper"><SiMariadb /></div>
              <h4>Database</h4>
              <p>`MariaDB`</p>
            </TechItem>
            <TechItem>
              <div className="icon-wrapper"><FaTools /></div> 
              <h4>Dev tool</h4>
              <p>`VS Code`, `IntelliJ IDEA`</p>
            </TechItem>
          </TechGrid>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>나의 역할 및 기여</h3>
          <FeatureList>
            <li>홈페이지 `UI`/`UX` 설계</li>
            <li>로그인/회원가입 기능 구현</li>
            <li>백엔드 `JWT` 토큰 인증 설정</li>
            <li>기내 반입 가능 여부 조회 기능 구현</li>
            <li>일간/주간/월간 카테고리 검색 순위 기능 구현</li>
          </FeatureList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>결과 및 배운 점</h3>
          <p>EZPZ 프로젝트를 통해 항공 여행객들이 겪는 정보 접근성 문제와 안전 염려를 해소하기 위한 통합 웹 플랫폼을 성공적으로 구축했습니다. 복잡한 규정 시각화, 실시간 데이터 연동, 개인화된 체크리스트 기능 등을 구현하며 사용자 중심의 서비스 설계의 중요성을 체감했습니다.</p>
          <LearnedPointsList>
            <li>
              <strong>체계적인 프로젝트 관리 경험</strong> 요구사항 분석부터 `Usecase` 정의, `ERD` 설계, `WBS` 기반 작업 분담까지 프로젝트 전 과정 경험
            </li>
            <li>
              <strong>협업 능력 향상</strong> 팀원들과의 소통 및 `Git`을 활용한 버전 관리를 통한 효과적인 협업 수행
            </li>
            <li>
              <strong>풀스택 개발 역량 강화</strong> `Spring Boot`(`Backend`)와 `React`(`Frontend`)를 함께 사용하여 웹 서비스 전체 구조 이해 및 개발 경험 확보
            </li>
            <li>
              <strong>문제 해결 능력 증진</strong> `API` 설계 및 연동 과정 등에서 발생한 다양한 기술적 문제들을 직접 진단하고 해결
            </li>
             <li>
              <strong>사용자 중심 설계 이해</strong> 사용자 피드백과 사용성을 고려한 `UI`/`UX` 설계 및 기능 구현의 중요성 학습
            </li>
          </LearnedPointsList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>관련 링크</h3>
          <p><StyledLink href="https://github.com/kapu0377/EZPZ" target="_blank" rel="noopener noreferrer">`GitHub Repository`</StyledLink></p>
          <p><StyledLink href="https://caff.pw/" target="_blank" rel="noopener noreferrer">EZPZ 플랫폼 바로가기</StyledLink></p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>상세 구현 과정</h3>
          <StyledInternalLink to="/projects/team-1/details">
            EZPZ 플랫폼 개발 상세 과정 보기
          </StyledInternalLink>
        </ProjectSection>

      </ContentWrapper>
    </ProjectDetailContainer>
  );
} 