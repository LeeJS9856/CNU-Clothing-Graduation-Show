import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import Navigation from '@/components/layout/Navigation';
import { COLORS } from '@/constants/colors';
import subPoster from '@/assets/images/sub_poster.png';

const FirstSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 섹션이 20% 이상 보이면 애니메이션 시작
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef}>
      <Header>
        <BrandText href="/">결: 시작과 동시에 축적될 방향</BrandText>
        <Navigation />
      </Header>

      <SectionMain>
        <SplitGrid>
          {/* 왼쪽: 텍스트 영역 (6) */}
          <TextContent $isVisible={isVisible}>
            <MainTitle className="animate-1">
              결: 시작과 동시에<br />축적될 방향
            </MainTitle>
            <DescriptionBox className="animate-2">
              <KRText>
                한 올의 실이 모여 결을 이루듯, 각자의 시간과 시선이 축적되어 하나의 흐름을 만들어낸다. 
                본 전시는 각기 다른 시선과 과정을 통해 형성된 방향성과 축적될 미래를 조명한다. 
                작품들은 개인의 시간과 선택이 만들어낸 고유한 결을 담아낸다.
              </KRText>
              <ENText>
                As a single strand of thread gathers to form a grain, each person’s time and perspective accumulate to create one continuous flow. 
                This exhibition highlights the direction shaped through different perspectives and processes, as well as the future that will continue to be built upon them. 
                Each work captures the unique grain formed by individual time, choices, and experiences.
              </ENText>
            </DescriptionBox>
          </TextContent>

          {/* 오른쪽: 이미지 영역 (4) */}
          <ImageArea $isVisible={isVisible}>
            <PosterImage 
              src={subPoster} 
              alt="Gyeol Exhibition Sub Poster" 
              className="animate-3"
            />
          </ImageArea>
        </SplitGrid>
      </SectionMain>
    </Section>
  );
};

/* ── 애니메이션 정의 ── */

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  ${responsiveStyle({
    mobile: css`padding-top: 32px; padding-bottom: 24px;`,
    desktop: css`padding-top: 60px; padding-bottom: 40px;`,
  })}
`;

const BrandText = styled.a`
  display: block;
  text-align: left;
  font-weight: 700;
  color: ${COLORS.brand.primary};
  text-decoration: none;
  ${responsiveStyle({
    mobile: css`font-size: 30px;`,
    desktop: css`font-size: 45px;`,
  })}
`;

const SectionMain = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SplitGrid = styled.div`
  display: grid;
  width: 100%;
  ${responsiveStyle({
    mobile: css`grid-template-columns: 1fr; gap: 40px;`,
    desktop: css`grid-template-columns: 6fr 4fr; gap: 60px;`,
  })}
`;

/* 애니메이션을 제어하는 컨테이너 */
const TextContent = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .animate-1, .animate-2 {
    opacity: 0;
    ${({ $isVisible }) => $isVisible && css`
      animation: ${fadeInUp} 1s ease forwards;
    `}
  }

  .animate-1 { animation-delay: 0.2s; }
  .animate-2 { animation-delay: 0.5s; }
`;

const MainTitle = styled.h1`
  font-weight: 800;
  color: ${COLORS.brand.primary};
  text-align: left;
  line-height: 1.2;
  ${responsiveStyle({
    mobile: css`font-size: 24px; margin-bottom: 24px;`,
    desktop: css`font-size: 36px; margin-bottom: 40px;`,
  })}
`;

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;
`;

const KRText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${COLORS.text?.main || '#1a1a1a'};
  word-break: keep-all;
  font-weight: 500;
  text-align: left;
`;

const ENText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${COLORS.text?.secondary || '#666'};
  font-style: italic;
  font-family: serif;
  text-align: left;
`;

const ImageArea = styled.div<{ $isVisible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  .animate-3 {
    opacity: 0;
    ${({ $isVisible }) => $isVisible && css`
      animation: ${fadeInUp} 1.2s ease forwards;
      animation-delay: 0.8s;
    `}
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 65vh;
  object-fit: contain;
  /* 살짝 떠있는 듯한 효과 */
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
`;

export default FirstSection;
