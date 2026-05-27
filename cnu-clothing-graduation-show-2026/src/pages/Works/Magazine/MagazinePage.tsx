import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import Layout from '@/components/layout/Layout';
import { COLORS } from '@/constants/colors';
import { MAGAZINE_WORKS } from '@/data/works/magazine';

const CATEGORY = 'magazine';

const MagazinePage = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Content>
        <CategoryTitle>매거진</CategoryTitle>

        <WorksGrid>
          {MAGAZINE_WORKS.map((work) => (
            <WorkCard
              key={work.id}
              onClick={() => navigate(`/works/${CATEGORY}/${work.id}`)}
            >
              <ThumbnailWrapper>
                {work.image ? (
                  <ThumbnailImg src={work.image} alt={work.title} />
                ) : (
                  <ThumbnailPlaceholder />
                )}
              </ThumbnailWrapper>
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
      gap: 16px;
    `,
    desktop: css`
      grid-template-columns: repeat(3, 1fr);
      gap: 60px;
    `,
  })}
`;

const WorkCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  max-width: 240px;
  cursor: pointer;
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1.414;
  overflow: hidden;
  cursor: pointer;
  ${responsiveStyle({
    mobile: css`margin-bottom: 8px;`,
    desktop: css`margin-bottom: 16px;`,
  })}
`;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.gray.light};
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

export default MagazinePage;
