import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { Link } from 'react-router-dom';
import { media } from '../utils/mediaQueries';

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
  }

  p {
    font-size: 1.1em;
    color: var(--secondary-text-color);
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
  }
`;

const StyledLink = styled.a`
  color: var(--accent-color);
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
  }
`;

const TechStackList = styled.ul`
  list-style: none; 
  padding-left: 0;

  li {
    margin-bottom: 0.5rem;
  }

  strong { 
    font-weight: 600;
    color: var(--primary-color); 
    margin-right: 0.5em; 
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
const LearnedPointsList = styled.ul`
  list-style: none; 
  padding-left: 0; 

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

export default function PersonalProject1() {
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
          <h2>개인 프로젝트 1: 개인 서버 구축 및 호스팅</h2>
          <p>개인 학습 및 서비스 운영을 목적으로 직접 서버를 구축하고, 웹 애플리케이션 또는 서비스를 배포 및 호스팅한 경험입니다.</p>
        </ProjectHeader>
        <ProjectSection variants={itemVariants}>
          <h3>프로젝트 목표</h3>
          <p>기존에 가지고 있던 `리눅스` 및 서버 관련 지식을 실제 환경에 적용하고 확장하기 위해 이 프로젝트를 선택하였습니다. `CLI` 환경에서의 서버 구축(웹/개발 서버) 및 호스팅 전 과정을 직접 경험하며 운영 역량을 심화시키는 것을 목표로 삼았습니다.</p>
        </ProjectSection>
        <ProjectSection variants={itemVariants}>
          <h3>주요 기능</h3>
          <ul>
            <li>통합 개발 환경 제공 (`Node.js`, `Java`, `JavaScript`)</li>
            <li>`Proxmox VE` 기반 가상화 환경 구축 및 관리</li>
            <li>`Debian` `CLI` 환경에서의 서버 운영</li>
            <li>`SSH`를 통한 안전한 원격 개발 지원</li>
            <li>`Git`을 이용한 소스 코드 형상 관리</li>
            <li>`MariaDB`를 이용한 관계형 데이터베이스 관리</li>
            <li>`Caddy`를 이용한 웹 서버 구축 및 리버스 프록시 설정</li>
          </ul>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>기술 스택(`Technical Stack`)</h3>
          <TechStackList>
            <li><strong>가상화 플랫폼:</strong> `Proxmox VE` - 서버 가상화 환경 제공, VM 및 컨테이너 관리</li>
            <li><strong>운영체제:</strong> `Debian Linux` - 안정적인 `CLI` 기반 서버 운영체제</li>
            <li><strong>개발 런타임 & 언어:</strong> `Node.js`, `Java` (`JDK`), `JavaScript`</li>
            <li><strong>서버 접속/관리:</strong> `SSH` (`Secure Shell`)</li>
            <li><strong>형상 관리:</strong> `Git`</li>
            <li><strong>웹 서버:</strong> `Caddy` - 편리한 웹 서버 및 리버스 프록시 </li>
            <li><strong>데이턄베이스:</strong> `MariaDB` - 관계형 데이터베이스 </li>
            <li><strong>패키지 매니저:</strong> `npm`, `Gradle` </li>
            <li><strong>방화벽:</strong> `UFW` - 필수 서비스 포트만 허용하여 비인가 접근 제어</li>
            <li><strong>침입 방지:</strong> `Fail2ban` - `SSH` 등 주요 서비스에 대한 무차별 대입 공격(`Brute-force attack`) 자동 감지 및 차단</li>
          </TechStackList>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>결과 및 배운 점</h3>

          <p>
            <strong>결과:</strong>
            <br />
            `Proxmox` 가상화 환경 위에 `Debian` 기반의 안정적인 개인 개발 서버 구축을 완료하였습니다. 이를 통해 `Node.js`, `Java` 등 필요한 개발 스택을 언제든 구성하고 테스트할 수 있는 환경을 확보하였으며, `UFW`와 `Fail2ban`을 이용한 기본적인 서버 보안 체계를 갖추었습니다.
          </p>
          <LearnedPointsList style={{ marginTop: '2rem' }}> 
            <li>
              <strong>서버 구축 및 운영 전반 경험</strong>
              가상화 플랫폼(`Proxmox`) 설정부터 `OS` 설치(`Debian`), 네트워크 구성, 방화벽(`UFW`)/침입 차단(`Fail2ban`) 설정, 개발 환경 구축(`Node.js`, `Java` 등)까지 서버 운영의 전체 과정을 직접 수행하며 `CLI` 환경에서의 실무 역량을 크게 향상시킬 수 있었습니다.
            </li>
            <li>
              <strong>백업의 결정적 중요성 체감 (`SSD` 장애 경험)</strong>
              프로젝트 진행 중 메인 `SSD` 저장 장치에 예상치 못한 장애가 발생하여 모든 설정과 데이터를 유실하는 상황을 겪었습니다. 이로 인해 전체 서버 환경을 처음부터 다시 구축해야 했으며, 이 과정을 통해 데이터 및 시스템 설정의 정기적인 백업이 단순한 권장 사항이 아닌 필수 요소임을 뼈저리게 느꼈습니다. 이는 향후 모든 시스템 운영에서 최우선으로 고려할 사항이 되었습니다.
            </li>
            <li>
              <strong>보안 설정의 필요성 인지</strong>
              방화벽 규칙 설정(`UFW`)과 비정상 로그인 시도 차단(`Fail2ban`)을 직접 구성해보며, 외부로부터 서버를 보호하기 위한 기본적인 보안 조치의 중요성과 실제 적용 방법을 학습하였습니다.
            </li>
            <li>
              <strong>문제 해결 능력 향상</strong>
              개발 환경 설정 오류, 패키지 의존성 문제, 네트워크 설정 이슈 등 서버 운영 중에 발생하는 다양한 예기치 못한 문제들을 직접 진단하고 해결하는 과정을 통해 실질적인 트러블슈팅 능력을 기를 수 있었습니다.
            </li>
            <li>
              <strong>`CLI` 환경 숙련도 증진</strong>
              모든 과정을 `CLI` 환경 중심으로 진행하면서 터미널 명령어 사용에 익숙해지고, 시스템 리소스를 효율적으로 모니터링하고 관리하는 능력이 향상되었습니다.
            </li>
          </LearnedPointsList>
        </ProjectSection>


        <ProjectSection variants={itemVariants}>
          <h3>상세 구현 과정</h3>
          <StyledInternalLink to="/projects/personal-1/details">
            구현 과정 및 기술적 내용 상세보기
          </StyledInternalLink>
        </ProjectSection>

      </ContentWrapper>
    </ProjectDetailContainer>
  );
}