import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import FourthSection from './FourthSection';
const AboutPage = () => {
  return (
    <SafeProvider>
      <ScrollContainer>
        {/* ── 첫 번째 섹션 (분리됨) ── */}
        <FirstSection />

        <SecondSection />
        <ThirdSection />
        <FourthSection />
      </ScrollContainer>
    </SafeProvider>
  );
};

/* ── 전체 레이아웃 스타일 ── */

const SafeProvider = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
  ${responsiveStyle({
    mobile: css`padding: 0 16px;`,
    desktop: css`padding: 0 40px;`,
  })}
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Section = styled.section<{ $bgColor?: string }>`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background-color: ${props => props.$bgColor || 'transparent'};
  display: flex;
  flex-direction: column;
`;

const SectionMain = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CenterLabel = styled.span` font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem; `;
const BigTitle = styled.h2` font-size: clamp(3rem, 8vw, 5rem); font-weight: 900; margin-bottom: 20px; `;
const Desc = styled.p` font-size: 1.2rem; opacity: 0.7; `;

export default AboutPage;
