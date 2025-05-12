import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const LanguageButton = styled.button`
  background: ${props => props.isActive ? 'var(--accent-color)' : 'transparent'};
  color: ${props => props.isActive ? '#fff' : 'var(--text-color)'};
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  margin-right: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isActive ? 'var(--accent-color)' : 'rgba(52, 152, 219, 0.1)'};
  }
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <SwitcherContainer>
      <LanguageButton 
        isActive={i18n.language === 'ko'} 
        onClick={() => changeLanguage('ko')}
      >
        한국어
      </LanguageButton>
      <LanguageButton 
        isActive={i18n.language === 'en'} 
        onClick={() => changeLanguage('en')}
      >
        English
      </LanguageButton>
      <LanguageButton 
        isActive={i18n.language === 'ja'} 
        onClick={() => changeLanguage('ja')}
      >
        日本語
      </LanguageButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher; 