import React from 'react';
import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import { COLORS } from '@/constants/colors';

const Footer = () => {
  return (
    <FooterContainer>
      <Inner>
        {/* 왼쪽 섹션 */}
        <LeftSection>
          <MainTitle>결: 시작과 동시에 축적될 방향</MainTitle>
          <InfoList>
            <InfoItem>전시 기간 : 2026년 6월 10일 ~ 2026년 6월 16일</InfoItem>
            <InfoItem>전시 장소 : 전남대학교 컨벤션 홀</InfoItem>
          </InfoList>
        </LeftSection>

        <RightSection>
          <SectionGroup>
            <SectionTitle>Contact</SectionTitle>
            <InfoList>
              <InfoItem>광주광역시 북구 용봉로 77</InfoItem>
              <InfoItem>전남대학교 의류학과</InfoItem>
              <InfoItem>Tel: 062-530-1540</InfoItem>
            </InfoList>
          </SectionGroup>

          <SectionGroup>
            <SectionTitle>Links</SectionTitle>
            <InfoList>
              <InfoLink href="https://fashion.jnu.ac.kr/" target="_blank">
                전남대학교 의류학과
              </InfoLink>
              <InfoLink href="https://www.instagram.com/" target="_blank">
                Instagram
              </InfoLink>
            </InfoList>
          </SectionGroup>
        </RightSection>
      </Inner>
      <CopyRight>© 2026 Chonnam National University. All rights reserved.</CopyRight>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
  border-top: 1px solid ${COLORS.background.grey};
  ${responsiveStyle({
    mobile: css`padding: 40px 0 60px;`,
    desktop: css`padding: 60px 0 80px;`,
  })}
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${responsiveStyle({
    mobile: css`
      flex-direction: column;
      gap: 40px;
    `,
    desktop: css`
      flex-direction: row;
    `,
  })}
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
`;

const MainTitle = styled.h3`
  font-size: 18px;
  font-weight: 700; /* 제목 굵게 */
  color: ${COLORS.text.main};
  margin: 0;
`;

const RightSection = styled.div`
  display: flex;
  gap: 80px;
  text-align: left;

  ${responsiveStyle({
    mobile: css`
      flex-direction: column;
      gap: 32px;
    `,
    desktop: css`
      flex-direction: row;
    `,
  })}
`;

const SectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${COLORS.black};
  margin: 0;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoItem = styled.p`
  font-size: 14px;
  font-weight: 400; /* 내용 얇게 */
  color: ${COLORS.text.grey};
  margin: 0;
  line-height: 1.6;
`;

const InfoLink = styled.a`
  font-size: 14px;
  font-weight: 400; /* 내용 얇게 */
  color: ${COLORS.text.grey};
  text-decoration: none;
  line-height: 1.6;

  &:hover {
    color: ${COLORS.brand.primary};
    text-decoration: underline;
  }
`;

const CopyRight = styled.p`
  margin-top: 60px;
  font-size: 12px;
  font-weight: 400;
  color: ${COLORS.text.grey};
  opacity: 0.6;
`;

export default Footer;
