import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import Layout from '@/components/layout/Layout';
import { COLORS } from '@/constants/colors';

const WORKS = [
  { id: 1, title: '작품명', artist: '김지원' },
  { id: 2, title: '작품명', artist: '배서영' },
  { id: 3, title: '작품명', artist: '양서경' },
];

const DigitalClothingPage = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Content>
        <CategoryTitle>의복구성</CategoryTitle>

        <SubTabBar>
          <SubTab
            $isActive={false}
            onClick={() => navigate('/works/clothing/real')}
          >
            실물제작
          </SubTab>
          <SubTab $isActive={true}>디지털 클로딩</SubTab>
        </SubTabBar>

        <WorksGrid>
          {WORKS.map((work) => (
            <WorkCard key={work.id}>
              <Thumbnail />
              <WorkTitle>{work.title}</WorkTitle>
              <ArtistName>{work.artist}</ArtistName>
            </WorkCard>
          ))}
        </WorksGrid>
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${responsiveStyle({
    mobile: css`padding: 0 0 40px;`,
    desktop: css`padding: 0 0 80px;`,
  })}
`;

const CategoryTitle = styled.h2`
  font-weight: 700;
  color: ${COLORS.brand.primary};
  line-height: 1;
  text-align: left;

  ${responsiveStyle({
    mobile: css`
      font-size: 18px;
      margin-bottom: 16px;
    `,
    desktop: css`
      font-size: 27px;
      margin-bottom: 32px;
    `,
  })}
`;

const SubTabBar = styled.div`
  display: flex;
  align-items: center;

  ${responsiveStyle({
    mobile: css`
      gap: 16px;
      margin-bottom: 32px;
    `,
    desktop: css`
      gap: 32px;
      margin-bottom: 56px;
    `,
  })}
`;

const SubTab = styled.span<{ $isActive: boolean }>`
  color: ${COLORS.brand.primary};
  cursor: pointer;
  line-height: 1;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};
  text-decoration: ${({ $isActive }) => ($isActive ? 'underline' : 'none')};
  text-underline-offset: 6px;
  transition: opacity 0.2s;

  ${responsiveStyle({
    mobile: css`font-size: 13px;`,
    desktop: css`font-size: 18px;`,
  })}

  &:hover {
    opacity: 0.7;
  }
`;

const WorksGrid = styled.div`
  display: grid;
  width: 100%;

  ${responsiveStyle({
    mobile: css`
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    `,
    desktop: css`
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    `,
  })}
`;

const WorkCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const Thumbnail = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  background-color: ${COLORS.gray.light};
  ${responsiveStyle({
    mobile: css`margin-bottom: 8px;`,
    desktop: css`margin-bottom: 16px;`,
  })}
`;

const WorkTitle = styled.h3`
  color: ${COLORS.brand.primary};
  font-weight: 700;
  line-height: 1.2;

  ${responsiveStyle({
    mobile: css`
      font-size: 12px;
      margin-bottom: 4px;
    `,
    desktop: css`
      font-size: 18px;
      margin-bottom: 8px;
    `,
  })}
`;

const ArtistName = styled.p`
  color: ${COLORS.text.secondary};
  font-weight: 400;
  line-height: 1.2;

  ${responsiveStyle({
    mobile: css`font-size: 11px;`,
    desktop: css`font-size: 14px;`,
  })}
`;

export default DigitalClothingPage;