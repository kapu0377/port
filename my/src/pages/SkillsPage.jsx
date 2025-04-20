import { FaJava, FaGithub, FaHtml5, FaCss3Alt, FaJsSquare, FaDatabase, FaReact } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, containerVariants, itemVariants } from '../utils/animations';
import SkillGrid from '../components/SkillGrid';

const SkillsPageContainer = styled(motion.div)`
  padding-top: 4rem;
  padding-bottom: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
  text-align: left;
`;

const PageTitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
`;

const InfoSection = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;

  h3 {
    font-size: 1.2rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  li,
  p {
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  > div {
    width: 100%;
    max-width: 350px;
    text-align: center;

    @media (min-width: 769px) {
      width: auto;
      max-width: none;
      text-align: left;
    }
  }
`;

const HistorySection = styled.div`

`;

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SkillLogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  min-height: 60px;

  /* Style direct SVG children */
  > svg {
    font-size: 3rem;
    color: var(--primary-color);
    margin-right: 1rem;
  }
`;

const HtmlCssJsIconContainer = styled.div`
  /* Styles formerly from .html-css-js-icons */
  svg {
     font-size: 2.5rem;
     margin-right: 0.5rem;
     /* Ensure color is applied if not inherited */
     color: var(--primary-color); 
  }
`;

const SkillTitleIcon = styled.span`
  /* Styles formerly from .skill-title-icon */
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
`;

const StyledPlaceholderLogo = styled.div`
  /* Styles formerly from .placeholder-logo */
  width: 50px;
  height: 50px;
  background-color: #e0e0e0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #757575;
  margin-right: 1rem;
`;

const SkillDescription = styled.ul`
  list-style-type: '- ';
  padding-left: 1.2em;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-color);
  margin-top: 0;

  li {
    margin-bottom: 0.4rem;
  }
`;

const PlaceholderLogo = ({ text }) => (
  <StyledPlaceholderLogo>{text}</StyledPlaceholderLogo>
);

const skillsData = [
  {
    icon: <FaJava />, title: 'Java',
    description: [
      'Java 기본 문법 및 객체 지향 프로그래밍 이해와 활용',
      '오버 로딩과 라이딩 차이 이해 및 오버 라이딩 활용',
      '캡슐화 및 접근제어',
      '클래스의 상속, 추상 클래스와 인터페이스 차이 이해',
    ]
  },
  {
    icon: <PlaceholderLogo text="Spring" />, title: 'Spring Boot',
    description: [
      'STS 설치 및 개발 환경 구축',
      'Tomcat을 사용한 서버 구축',
      'MyBatis를 사용하여 JDBC 연결',
      'MVC패턴(모델2)로 CRUD 구현',
      'RestAPI를 사용하여 클라이언트와 서버 간의 통신 구현',
    ]
  },
  {
    icon: <FaDatabase />, title: 'Database (MySQL, Oracle)',
    description: [
      'DDL, DML, DCL의 차이 이해 및 각각의 쿼리 작성',
      '데이터베이스 생성 및 권한 부여',
      '테이블의 기본키, 외래키 등 제약조건 생성',
      '기본키와 외래키 차이 이해',
    ]
  },
  {
    icon: <FaGithub />, title: 'Git & GitHub',
    description: [
      'Source Tree를 통한 Git 업로드 및 프로젝트 버전관리',
      'GitHub를 이용한 프로젝트 협업',
    ]
  },
  {
    icon: <PlaceholderLogo text="JSP" />, title: 'JSP',
    description: [
      '서블릿의 동작 원리와 라이프 사이클 이해',
      'Session 유지 및 Cookie 활용가능',
      'Redirect를 통한 페이지지간 객체 전달',
      '표현식, 스크립틀릿 선언, JSTL 등 JSP 기본 문법 사용',
      'MVC패턴(모델1)로 CRUD 구현',
    ]
  },
  {
    icon: <FaReact />, title: 'React',
    description: [
      'React Hooks (useState, useEffect 등) 사용 경험',
      '컴포넌트 기반 아키텍처 이해 및 구현',
      'Props 및 State를 이용한 데이터 관리',
      'React Router를 사용한 라우팅 구현',
      'Styled-components 또는 CSS Modules 사용 경험',
    ]
  },
  {
    icon: <HtmlCssJsIconContainer><FaHtml5 /><FaCss3Alt /><FaJsSquare /></HtmlCssJsIconContainer>, 
    title: 'HTML/CSS/JavaScript',
    description: [
      'HTML태그, CSS선택자 속성의 이해와 활용',
      'HTML태그, CSS를 활용하여 웹 페이지 구현',
      'JavaScript 기본 문법 이해 및 활용',
      '부트스트랩 활용',
    ]
  },
];

export default function Skills() {
  return (
    <SkillsPageContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <PageTitle variants={itemVariants}>Skills</PageTitle>
      <InfoSection variants={containerVariants}>
        <HistorySection> 
          <motion.h3 variants={itemVariants}>학력사항</motion.h3>
          <motion.ul variants={itemVariants}>
            <li>2014.03 ~ 2018.02 xx고등학교</li>
            <li>2018.03 ~ 2023.02 xxx대학교</li>
          </motion.ul>
        </HistorySection>
        <HistorySection> 
          <motion.h3 variants={itemVariants}>교육이수</motion.h3>
          <motion.p variants={itemVariants}>학원수료</motion.p>
          <motion.p variants={itemVariants}>(2024.08.14 ~ 2025.03.5)</motion.p>
        </HistorySection>
      </InfoSection>

      <motion.div variants={containerVariants}>
        <SkillGrid>
          {skillsData.map((skill, index) => (
            <SkillItem key={index} variants={itemVariants}>
              <SkillLogoContainer>
                {skill.icon}
                <SkillTitleIcon>{skill.title}</SkillTitleIcon>
              </SkillLogoContainer>
              <SkillDescription>
                {skill.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </SkillDescription>
            </SkillItem>
          ))}
        </SkillGrid>
      </motion.div>
    </SkillsPageContainer>
  );
} 