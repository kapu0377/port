import React, { useState, useEffect, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
const About = lazy(() => import('../components/About'));
import { media } from '../utils/mediaQueries';
import { LoadingSpinner } from '../App';

const SkillsPage = lazy(() => import('./SkillsPage'));
const ProjectsPage = lazy(() => import('./ProjectsPage'));

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const SectionWrapper = styled(motion.section)`
  width: 100%;
  position: relative;
  min-height: 100vh;
  padding-top: 80px;
  box-sizing: border-box;
  margin-bottom: 4rem;
  &:last-child {
    margin-bottom: 0;
  }
  
  ${media.tablet} {
    padding-top: 60px;
    margin-bottom: 3rem;
  }
  
  ${media.mobile} {
    padding-top: 40px;
    margin-bottom: 2rem;
  }
`;

const MainPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  ${media.laptop} {
    max-width: 90%;
  }
  
  ${media.tablet} {
    max-width: 95%;
  }
`;

const Section = styled(motion.div)`
  opacity: ${props => props.$isActive ? 1 : 0};
  transition: opacity 0.5s ease;
  width: 100%;
  height: 100%;
`;

export default function MainPage() {
  const [activeSection, setActiveSection] = useState('about');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
      }
    } else {
      const aboutElement = document.getElementById('about');
      if (aboutElement && window.scrollY === 0) {
        // setActiveSection('about');
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      let currentSection = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 300 && 
            window.scrollY < sectionTop + sectionHeight - 300) {
          currentSection = section.getAttribute('id');
        }
      });
      
      if (currentSection !== activeSection && currentSection !== '') {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return (
    <MainPageContainer>
      <SectionWrapper
        id="about"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <Section $isActive={activeSection === 'about'}>
          <Suspense fallback={<LoadingSpinner>컨텐츠 준비 중</LoadingSpinner>}>
            <About/>
          </Suspense>
        </Section>
      </SectionWrapper>
      
      <SectionWrapper
        id="skills"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Section $isActive={activeSection === 'skills'}>
          <Suspense fallback={<LoadingSpinner>컨텐츠 준비 중</LoadingSpinner>}>
            <SkillsPage />
          </Suspense>
        </Section>
      </SectionWrapper>
      
      <SectionWrapper
        id="projects"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Section $isActive={activeSection === 'projects'}>
          <Suspense fallback={<LoadingSpinner>컨텐츠 준비 중</LoadingSpinner>}>
            <ProjectsPage />
          </Suspense>
        </Section>
      </SectionWrapper>
    </MainPageContainer>
  );
} 