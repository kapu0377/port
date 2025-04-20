import { FaPhone, FaEnvelope, FaGithub } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from '../utils/mediaQueries';

const AboutContainer = styled.div`
  color: var(--primary-color);
  text-align: left;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  
  ${media.tablet} {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  ${media.mobile} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const PortfolioLabel = styled.div`
  position: absolute;
  top: 1rem;
  right: 2rem;
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 15px 15px 0 15px;
  font-size: 0.9rem;
  text-align: center;
  
  ${media.mobile} {
    top: 0.5rem;
    right: 1rem;
    font-size: 0.8rem;
    padding: 0.3rem 0.8rem;
  }
`;

const NameContainer = styled(motion.div)`
  margin-bottom: 2rem;
  
  ${media.mobile} {
    margin-bottom: 1.5rem;
  }
`;

const Name = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  margin-top: 0;
  margin-bottom: 0.5rem;
  
  ${media.tablet} {
    font-size: 3.5rem;
  }
  
  ${media.mobile} {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  color: var(--text-color);
  
  ${media.tablet} {
    font-size: 1.5rem;
  }
  
  ${media.mobile} {
    font-size: 1.2rem;
  }
`;

const ContactInfo = styled(motion.div)`
  p {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
    color: var(--text-color);
    
    ${media.mobile} {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }

  svg {
    margin-right: 0.8rem;
    color: var(--primary-color);
    font-size: 1.3rem;
    
    ${media.mobile} {
      font-size: 1.1rem;
      margin-right: 0.5rem;
    }
  }

  a {
    color: var(--text-color);
    text-decoration: none;
    &:hover {
      color: var(--accent-color);
    }
  }
`;

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    },
  },
};

export default function About() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <AboutContainer>
        <NameContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Subtitle variants={itemVariants}>나날이 발전하는 개발자</Subtitle>
          <Name variants={itemVariants}>xxx</Name>
        </NameContainer>
        <ContactInfo
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants}><FaPhone /> +82 010-4469-0348</motion.p>
          <motion.p variants={itemVariants}><FaEnvelope /> pjoonwoo9999@gmail.com</motion.p>
          <motion.p variants={itemVariants}><FaGithub /> <a href="https://github.com/미정" target="_blank" rel="noopener noreferrer">github.com/미정</a></motion.p>
        </ContactInfo>
      </AboutContainer>
    </motion.div>
  );
}