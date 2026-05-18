import styled from 'styled-components';
import Footer from '@/components/layout/Footer';
import { COLORS } from '@/constants/colors';

const FourthSection = () => {
  return (
    <Section $bgColor="#ffffff">
      <SectionMain>
        <ContentWrapper>
          {/* 제목: 왼쪽 위에 메인 색상으로 배치 */}
          <MainTitle>졸업전시회 준비 위원회</MainTitle>
          

          {/* 4개 구역 그리드 (좌상, 우상, 좌하, 우하) */}
          <GridContainer>
            {/* 좌상 - 위원장 */}
            <CommitteeBox>
              <DeptName>위원장</DeptName>
              <NameList>이름</NameList>
            </CommitteeBox>

            {/* 우상 - 관리부 */}
            <CommitteeBox>
              <DeptName>관리부</DeptName>
              <NameList>
                <span>이름</span>
                <span>이름</span>
                <span>이름</span>
              </NameList>
            </CommitteeBox>

            {/* 좌하 - 기획부 */}
            <CommitteeBox>
              <DeptName>기획부</DeptName>
              <NameList>
                <span>이름</span>
                <span>이름</span>
                <span>이름</span>
              </NameList>
            </CommitteeBox>

            {/* 우하 - 홍보부 */}
            <CommitteeBox>
              <DeptName>홍보부</DeptName>
              <NameList>
                <span>이름</span>
                <span>이름</span>
                <span>이름</span>
                <span>이름</span>
              </NameList>
            </CommitteeBox>
          </GridContainer>

        </ContentWrapper>
      </SectionMain>
      
      {/* 하단 푸터 */}
      <Footer />
    </Section>
  );
};

/* ── 스타일 ── */
const Section = styled.section<{ $bgColor?: string }>`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const SectionMain = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${COLORS.brand.primary};
  text-align: left;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열 구조 (좌/우) */
  grid-template-rows: auto auto;    /* 2행 구조 (상/하) */
  padding: 15px 0;
  row-gap: 60px;
  column-gap: 80px;
`;

const CommitteeBox = styled.div`
  display: flex;
  align-items: flex-start; /* 상단 정렬 */
`;

const DeptName = styled.div`
    text-align: left;
    margin-right: 40px;
    font-size: 1.1rem;
    font-weight: 500;
    color: ${COLORS.primary};
    flex-shrink: 0;
`;

const NameList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  span {
    font-size: 1.1rem;
    color: ${COLORS.text.secondary};
    font-weight: 400;
    line-height: 1;
  }
`;

export default FourthSection;
