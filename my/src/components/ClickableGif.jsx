import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { media } from '../utils/mediaQueries';



const GifContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; 
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: var(--placeholder-bg);
`;

const ImageStyles = `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background-color: var(--placeholder-bg);
`;

const StyledImage = styled.img`
  ${ImageStyles}
  transition: transform 0.3s ease;
  
  ${GifContainer}:hover & {
    transform: scale(1.02);
  }
`;

const ThumbnailPreview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: all 0.2s ease;
  z-index: 4;
`;

const ThumbnailImage = styled.img`
  ${ImageStyles}
  animation-play-state: paused !important;
  opacity: 0.95;
`;

const GifIndicator = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: var(--accent-color);
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  
  ${media.mobile} {
    top: 10px;
    right: 10px;
    font-size: 0.7rem;
    padding: 3px 6px;
  }
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: 500;
  opacity: ${props => (props.isPlaying ? 0 : 1)};
  transition: all 0.3s ease;
  pointer-events: ${props => (props.isPlaying ? 'none' : 'auto')};
  z-index: 5;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  svg {
    width: 80px;
    height: 80px;
    margin-bottom: 15px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    transition: transform 0.2s ease;

    ${GifContainer}:hover & {
      transform: scale(1.1);
    }
    
    ${media.mobile} {
      width: 60px;
      height: 60px;
    }
  }
  
  span {
    background-color: var(--accent-color);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    
    ${media.mobile} {
      font-size: 0.8rem;
      padding: 4px 12px;
    }
  }
`;

const PlayButton = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="var(--accent-color)" stroke="#ffffff" strokeWidth="2.5" />
    <path d="M9 7v10l8-5-8-5z" fill="#ffffff" strokeWidth="0.5" stroke="#ffffff" />
  </svg>
);

const ClickableGif = ({ 
  src, 
  alt, 
  staticSrc, 
  title,
  showControls = true, 
  showThumbnail = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  
  const staticImageSrc = staticSrc || src.replace('.gif', '.png');
  const gifTitle = title || alt;

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <GifContainer ref={containerRef} onClick={handleClick}>
      <StyledImage 
        src={isPlaying ? src : staticImageSrc} 
        alt={alt}
      />
      
      {/* 재생 오버레이 */}
      {showControls && !isPlaying && (
        <PlayOverlay isPlaying={isPlaying}>
          <PlayButton />
          <span>{gifTitle ? `${gifTitle} 재생` : '클릭하여 재생'}</span>
        </PlayOverlay>
      )}
      
      {/* 썸네일 미리보기 */}
      {showThumbnail && !isPlaying && (
        <ThumbnailPreview>
          <ThumbnailImage src={src.replace('.gif', '.png')} alt={`${alt} 미리보기`} />
          <GifIndicator>GIF</GifIndicator>
        </ThumbnailPreview>
      )}
    </GifContainer>
  );
};

export default ClickableGif; 