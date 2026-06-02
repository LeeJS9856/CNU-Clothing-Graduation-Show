import styled, { css } from 'styled-components';
import Footer from '@/components/layout/Footer';
import { COLORS } from '@/constants/colors';
import { responsiveStyle } from '@/styles/responsive';

const FourthSection = () => {
  return (
    <Section $bgColor="#ffffff">
      <SectionMain>
        <ContentWrapper>
          <MainTitle>졸업전시회 준비 위원회</MainTitle>

          <GridContainer>
            <CommitteeBox>
              <DeptName>위원장</DeptName>
              <NameList>
                <p>김노은</p>
              </NameList>
            </CommitteeBox>

            <CommitteeBox>
              <DeptName>관리부</DeptName>
              <NameList>
                <p>박재은</p>
                <p>이유진</p>
                <p>한정효</p>
              </NameList>
            </CommitteeBox>

            <CommitteeBox>
              <DeptName>기획부</DeptName>
              <NameList>
                <p>문재은</p>
                <p>최원희</p>
              </NameList>
            </CommitteeBox>

            <CommitteeBox>
              <DeptName>홍보부</DeptName>
              <NameList>
                <p>박다미</p>
                <p>이나연</p>
                <p>정여진</p>
                <p>최영서</p>
              </NameList>
            </CommitteeBox>
          </GridContainer>
        </ContentWrapper>
      </SectionMain>

      <Footer />
    </Section>
  );
};

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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  padding: 15px 0;
  row-gap: 60px;
  column-gap: 80px;
`;

const CommitteeBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const DeptName = styled.div`
  flex: 1;
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  color: ${COLORS.primary};
  flex-shrink: 0;
`;

const NameList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;

  p {
    ${responsiveStyle({
      mobile: css`font-size: 1rem;`,
      desktop: css`font-size: 1.1rem;`,
    })}
    color: ${COLORS.text.secondary};
    font-weight: 400;
  }
`;

export default FourthSection;
