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

export default AboutPage;
