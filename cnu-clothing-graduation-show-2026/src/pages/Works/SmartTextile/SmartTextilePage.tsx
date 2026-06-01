import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import Layout from '@/components/layout/Layout';
import { COLORS } from '@/constants/colors';
import { SMART_TEXTILE_WORKS } from '@/data/works/smart-textile';

const CATEGORY = 'smart-textile';

const SmartTextilePage = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Content>
        <CategoryTitle>스마트 텍스타일</CategoryTitle>

        <WorksGrid>
          {SMART_TEXTILE_WORKS.map((work, index) => (
            <WorkCard
              key={work.id}
              style={{ animationDelay: `${0.2 + index * 0.07}s` }}
              onClick={() => navigate(`/works/${CATEGORY}/${work.id}`)}
            >
              <ThumbnailWrapper>
                {work.images[0] ? (
                  <ThumbnailImg src={work.images[0]} alt={work.title} />
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

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: 0.1s;

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
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease forwards;
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

export default SmartTextilePage;
