import { useEffect, useRef, useState } from 'react';
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
          {/* 타이틀 및 텍스트 영역 */}
          <TextContent $isVisible={isVisible}>
            <MainTitle className="animate-1">
              결: 시작과 동시에<br />축적될 방향
            </MainTitle>
            <DescriptionBox className="animate-2">
              <KRText>
                한 올의 실이 모여 결을 이루듯, 각자의 시간과 시선이 축적되어 하나의 흐름을 만들어낸다. 
                본 전시는 각기 다른 시선과 과정을 통해 형성된 방향성과 축적될 미래를 조명한다. 
              </KRText>
              <ENText>
                As a single strand of thread gathers to form a grain, each person’s time and perspective accumulate.
              </ENText>
            </DescriptionBox>
          </TextContent>

          {/* 이미지 영역 */}
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

/* ── 애니메이션 ── */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 모바일에서 텍스트가 넘쳐 스크롤이 생기는 것 방지 */
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
  ${responsiveStyle({
    mobile: css`font-size: 20px;`,
    desktop: css`font-size: 45px;`,
  })}
  text-decoration: none;
`;

const SectionMain = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${responsiveStyle({
    mobile: css`padding: 0 20px 40px;`, // 모바일 하단 여백 확보
    desktop: css`padding: 0;`,
  })}
`;

const SplitGrid = styled.div`
  display: grid;
  width: 100%;
  ${responsiveStyle({
    mobile: css`
      grid-template-columns: 1fr; 
      gap: 32px;
      align-content: center; /* 중앙 정렬 */
    `,
    desktop: css`
      grid-template-columns: 6fr 4fr; 
      gap: 60px;
    `,
  })}
`;

const TextContent = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  
  .animate-1, .animate-2 {
    opacity: 0;
    ${({ $isVisible }) => $isVisible && css`
      animation: ${fadeInUp} 0.8s ease forwards;
    `}
  }
  .animate-1 { animation-delay: 0.2s; }
  .animate-2 { animation-delay: 0.4s; }
`;

const MainTitle = styled.h1`
  font-weight: 800;
  color: ${COLORS.brand.primary};
  line-height: 1.3;
  ${responsiveStyle({
    mobile: css`
      font-size: 24px; 
      margin-bottom: 16px;
      text-align: center; /* 모바일은 가시성을 위해 중앙 정렬 */
    `,
    desktop: css`
      font-size: 36px; 
      margin-bottom: 40px;
      text-align: left;
    `,
  })}
`;

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  ${responsiveStyle({
    mobile: css`gap: 12px; align-items: center;`,
    desktop: css`gap: 24px; max-width: 600px;`,
  })}
`;

const KRText = styled.p`
  line-height: 1.7;
  color: ${COLORS.text?.main || '#1a1a1a'};
  word-break: keep-all;
  font-weight: 500;
  ${responsiveStyle({
    mobile: css`font-size: 0.9rem; text-align: center;`,
    desktop: css`font-size: 1.1rem; text-align: left;`,
  })}
`;

const ENText = styled.p`
  line-height: 1.6;
  color: ${COLORS.text?.secondary || '#666'};
  font-style: italic;
  font-family: serif;
  ${responsiveStyle({
    mobile: css`font-size: 0.8rem; text-align: center;`,
    desktop: css`font-size: 0.95rem; text-align: left;`,
  })}
`;

const ImageArea = styled.div<{ $isVisible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  .animate-3 {
    opacity: 0;
    ${({ $isVisible }) => $isVisible && css`
      animation: ${fadeInUp} 1s ease forwards;
      animation-delay: 0.7s;
    `}
  }
`;

const PosterImage = styled.img`
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
  ${responsiveStyle({
    mobile: css`
      height: 35vh; /* 화면 높이의 35%로 제한하여 텍스트 공간 확보 */
      max-width: 80%;
    `,
    desktop: css`
      width: 100%;
      max-height: 65vh;
    `,
  })}
`;

export default FirstSection;
