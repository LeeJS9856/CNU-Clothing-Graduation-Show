import { COLORS } from '@/constants/colors';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const KR = {
  title: '2026 전남대학교 의류학과 졸업전시회',
  subtitle: '<결 : 시작과 동시에 축적될 방향>',
  location: '전남대학교 컨벤션홀',
  date: '26.06.10 - 26.06.16',
  time: '10:00 - 18:00',
};

const EN = {
  title: '2026 CNU Clothing Exhibition',
  subtitle1: '<GYEOL : The Direction That Begins and Continues',
  subtitle2: 'to Accumulate>',
  location: 'Chonnam National University Convention Hall',
  date: '26.06.10 - 26.06.16',
  time: '10:00 - 18:00',
};

const SecondSection = () => {
  const [visible, setVisible] = useState(false);
  const secRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (secRef.current) observer.observe(secRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={secRef}>

      <Wrapper $visible={visible}>
        <ContentArea>
          <TextBlock>
            <Title>{KR.title}</Title>
            <Subtitle>{KR.subtitle}</Subtitle>
            <Detail>{KR.location}</Detail>
            <Detail>{KR.date}</Detail>
            <Detail>{KR.time}</Detail>
          </TextBlock>

          <TextBlock className="eng">
            <Title>{EN.title}</Title>
            <Subtitle>{EN.subtitle1}</Subtitle>
            <Subtitle>{EN.subtitle2}</Subtitle>
            <Detail>{EN.location}</Detail>
            <Detail>{EN.date}</Detail>
            <Detail>{EN.time}</Detail>
          </TextBlock>
        </ContentArea>
      </Wrapper>
    </Section>
  );
};

const fadeIn = keyframes`
  from { opacity:0; transform:translateY(20px);}
  to   { opacity:1; transform:translateY(0);}
`;

/* 전체 섹션 – 스냅, 배경, 중앙 정렬 */
const Section = styled.section`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;


/* Wrapper – 좌·우 2컬럼, 오른쪽에 내용, 왼쪽은 빈 공간 */
const Wrapper = styled.div<{ $visible: boolean }>`
  width: 100%;
  max-width: 1280px;
  height: 100%;
  padding: 80px 60px;
  display: grid;
  opacity: ${p => (p.$visible ? 1 : 0)};
  transition: opacity 0.8s ease;
  align-items: center;
`;

/* 우측 내용 영역 – 텍스트 전체를 오른쪽 정렬 */
const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;          /* 오른쪽 정렬 핵심 */
  gap: 48px;
  animation: ${fadeIn} 1.2s ease-out;
`;

/* 텍스트 블럭 – 한국어와 영어 각각 하나씩 */
const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  line-height: 1.4;

  &.eng {
    font-family: 'serif';
    font-style: italic;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: ${COLORS.brand.primary};
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: ${COLORS.brand.primary};
`;

const Detail = styled.p`
  font-size: 15px;
  margin: 0;
`;

export default SecondSection;
