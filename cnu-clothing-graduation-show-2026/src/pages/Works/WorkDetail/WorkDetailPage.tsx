import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import Layout from '@/components/layout/Layout';
import { COLORS } from '@/constants/colors';
import type { Work } from '@/types/work';
import { BRANDING_WORKS } from '@/data/works/branding';
import { MAGAZINE_WORKS } from '@/data/works/magazine';
import { CLOTHING_REAL_WORKS } from '@/data/works/clothing-real';
import { CLOTHING_DIGITAL_WORKS } from '@/data/works/clothing-digital';
import { TRADITIONAL_WORKS } from '@/data/works/traditional';
import { FASHION_DESIGN_WORKS } from '@/data/works/fashion-design';
import { SMART_TEXTILE_WORKS } from '@/data/works/smart-textile';

const CATEGORY_WORKS: Record<string, Work[]> = {
  'branding': BRANDING_WORKS,
  'magazine': MAGAZINE_WORKS,
  'clothing-real': CLOTHING_REAL_WORKS,
  'clothing-digital': CLOTHING_DIGITAL_WORKS,
  'traditional': TRADITIONAL_WORKS,
  'fashion-design': FASHION_DESIGN_WORKS,
  'smart-textile': SMART_TEXTILE_WORKS,
};

const WorkDetailPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { category = '', id = '' } = useParams<{ category: string; id: string }>();
  const works = CATEGORY_WORKS[category] ?? [];
  const numericId = Number(id);
  const currentWork = works.find((w) => w.id === numericId);

  return (
    <Layout>
      <Content>
        <BackButton onClick={() => navigate(-1)}>{'<'}</BackButton>

        {!currentWork ? (
          <NotFound>작품을 찾을 수 없습니다.</NotFound>
        ) : (
          <>
            <DetailLayout>
              <ImageColumn>
                <ThumbnailList>
                  {works.map((work) => (
                    <ThumbnailItem
                      key={work.id}
                      $isActive={work.id === currentWork.id}
                      onClick={() => navigate(`/works/${category}/${work.id}`)}
                    >
                      {work.image ? (
                        <ThumbnailImg src={work.image} alt={work.title} />
                      ) : (
                        <ThumbnailPlaceholder />
                      )}
                    </ThumbnailItem>
                  ))}
                </ThumbnailList>

                <MainImageWrapper>
                  {currentWork.image ? (
                    <MainImage src={currentWork.image} alt={currentWork.title} />
                  ) : (
                    <MainImagePlaceholder />
                  )}
                </MainImageWrapper>
              </ImageColumn>

              <InfoColumn>
                <WorkTitle>
                  {currentWork.title} - {currentWork.artist}
                </WorkTitle>
                <Description>{currentWork.description}</Description>
              </InfoColumn>
            </DetailLayout>
          </>
        )}
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

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${COLORS.brand.primary};
  font-weight: 700;
  line-height: 1;
  padding: 0;
  align-self: flex-start;

  ${responsiveStyle({
    mobile: css`
      font-size: 18px;
      margin-bottom: 24px;
    `,
    desktop: css`
      font-size: 24px;
      margin-bottom: 40px;
    `,
  })}
`;

const NotFound = styled.div`
  color: ${COLORS.text.secondary};
  ${responsiveStyle({
    mobile: css`font-size: 14px;`,
    desktop: css`font-size: 16px;`,
  })}
`;

const DetailLayout = styled.div`
  display: flex;
  width: 100%;

  ${responsiveStyle({
    mobile: css`
      flex-direction: column;
      gap: 16px;
    `,
    desktop: css`
      flex-direction: row;
      gap: 48px;
      align-items: flex-start;
    `,
  })}
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  ${responsiveStyle({
    mobile: css`
      gap: 8px;
      width: 100%;
    `,
    desktop: css`
      gap: 16px;
      flex: 1;
    `,
  })}
`;

const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-shrink: 0;

  ${responsiveStyle({
    mobile: css`
      width: 56px;
      gap: 8px;
      max-height: 480px;
    `,
    desktop: css`
      width: 80px;
      gap: 12px;
      max-height: 640px;
    `,
  })}
`;

const ThumbnailItem = styled.div<{ $isActive: boolean }>`
  width: 100%;
  aspect-ratio: 1 / 1.414;
  cursor: pointer;
  overflow: hidden;
  border: ${({ $isActive }) =>
    $isActive ? `2px solid ${COLORS.brand.primary}` : '2px solid transparent'};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
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

const MainImageWrapper = styled.div`
  flex: 1;
  aspect-ratio: 1 / 1.414;
  overflow: hidden;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const MainImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.gray.light};
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;

  ${responsiveStyle({
    mobile: css`
      width: 100%;
    `,
    desktop: css`
      flex: 1;
      max-width: 360px;
    `,
  })}
`;

const WorkTitle = styled.h3`
  color: ${COLORS.brand.primary};
  font-weight: 700;
  line-height: 1.3;

  ${responsiveStyle({
    mobile: css`font-size: 16px;`,
    desktop: css`font-size: 20px;`,
  })}
`;

const Description = styled.p`
  color: ${COLORS.text.secondary};
  line-height: 1.6;

  ${responsiveStyle({
    mobile: css`
      font-size: 12px;
      margin-top: 8px;
    `,
    desktop: css`
      font-size: 14px;
      margin-top: 16px;
    `,
  })}
`;

export default WorkDetailPage;
