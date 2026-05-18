import React, { useRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import video from '@/assets/videos/sample.mp4';

const FilmTab = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <TabContainer>
      <VideoWrapper onClick={handleVideoClick}>
        <StyledVideo
          ref={videoRef}
          src={video}
          preload="metadata"
          playsInline
          muted 
          controls
        />
      </VideoWrapper>

      <InfoBox>
        <BrandName>GYEOL</BrandName>
        <ExhibitionTitle>
          2026 Clothing Graduation Exhibition Film
        </ExhibitionTitle>
      </InfoBox>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const VideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  cursor: pointer;
  overflow: hidden;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoBox = styled.div`
  margin-top: 12px;
  text-align: left;
`;

const BrandName = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 900;
  color: ${COLORS.primary};
`;

const ExhibitionTitle = styled.p`
  margin: 4px 0 0 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.primary};
  opacity: 0.85;
`;

export default FilmTab;
