import React from 'react';
import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import Layout from '@/components/layout/Layout';
import { COLORS } from '@/constants/colors';

const WORKS = [
  { id: 1, title: '작품명', artist: '작가명' },
  { id: 2, title: '작품명', artist: '작가명' },
  { id: 3, title: '작품명', artist: '작가명' },
];

const FashionDesignPage = (): React.JSX.Element => {
  return (
    <Layout>
      <Content>
        <CategoryTitle>패션디자인</CategoryTitle>

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
      margin-bottom: 32px;
    `,
    desktop: css`
      font-size: 27px;
      margin-bottom: 56px;
    `,
  })}
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

export default FashionDesignPage;