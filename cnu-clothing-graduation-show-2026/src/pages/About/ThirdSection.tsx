import styled from 'styled-components';
import map from '@/assets/images/main_poster.png';
const ThirdSection = () => {
  return (
    <Section>
      <ImageWrapper>
        <img src={map} alt="지도" />
      </ImageWrapper>
    </Section>
  );
};

/* ── 레이아웃 스타일 ── */
const Section = styled.section<{ $bgColor?: string }>`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 90%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default ThirdSection;
