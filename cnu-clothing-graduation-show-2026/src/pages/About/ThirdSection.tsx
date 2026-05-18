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
  scroll-snap-stop: always;
  background-color: ${(props) => props.$bgColor ?? '#ffffff'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  /* 정사각형 박스 – 가로·세로 400px (필요에 따라 조정) */
  width: 400px;
  height: 400px;
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
