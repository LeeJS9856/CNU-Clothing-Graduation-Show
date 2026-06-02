import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import Layout from '@/components/layout/Layout';
import { COLORS } from '@/constants/colors';
import type { Work } from '@/types/work';
import { BRANDING_WORKS } from '@/data/works/branding';
import { MEDIA_PRODUCTION_WORKS } from '@/data/works/media-production';
import { CLOTHING_REAL_WORKS } from '@/data/works/clothing-real';
import { CLOTHING_DIGITAL_WORKS } from '@/data/works/clothing-digital';
import { TRADITIONAL_WORKS } from '@/data/works/traditional';
import { FASHION_DESIGN_WORKS } from '@/data/works/fashion-design';
import { SMART_TEXTILE_WORKS } from '@/data/works/smart-textile';

const CATEGORY_WORKS: Record<string, Work[]> = {
  'branding': BRANDING_WORKS,
  'media-production': MEDIA_PRODUCTION_WORKS,
  'clothing-real': CLOTHING_REAL_WORKS,
  'clothing-digital': CLOTHING_DIGITAL_WORKS,
  'traditional': TRADITIONAL_WORKS,
  'fashion-design': FASHION_DESIGN_WORKS,
  'smart-textile': SMART_TEXTILE_WORKS,
};

const CATEGORY_LABELS: Record<string, string> = {
  'branding': '브랜딩',
  'media-production': '미디어제작',
  'clothing-real': '의복구성',
  'clothing-digital': '의복구성',
  'traditional': '전통복식',
  'fashion-design': '패션디자인',
  'smart-textile': '스마트 텍스타일',
};

const CATEGORY_LIST_PATHS: Record<string, string> = {
  'branding': '/works/branding',
  'media-production': '/works/media-production',
  'clothing-real': '/works/clothing/real',
  'clothing-digital': '/works/clothing/digital',
  'traditional': '/works/traditional',
  'fashion-design': '/works/fashion-design',
  'smart-textile': '/works/smart-textile',
};

const WorkDetailPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { category = '', id = '' } = useParams<{ category: string; id: string }>();
  const works = CATEGORY_WORKS[category] ?? [];
  const numericId = Number(id);
  const currentWork = works.find((w) => w.id === numericId);
  const isClothing = category === 'clothing-real' || category === 'clothing-digital';
  const categoryLabel = CATEGORY_LABELS[category] ?? '';
  const categoryListPath = CATEGORY_LIST_PATHS[category] ?? '/works';

  const handleBack = () => navigate(categoryListPath);

  const images = currentWork?.images ?? [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [category, numericId]);

  const thumbnailListRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const updateFades = useCallback(() => {
    const el = thumbnailListRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setShowTopFade(scrollTop > 1);
    setShowBottomFade(scrollTop + clientHeight < scrollHeight - 1);
  }, []);

  useEffect(() => {
    updateFades();
    window.addEventListener('resize', updateFades);
    return () => window.removeEventListener('resize', updateFades);
  }, [updateFades, images]);

  return (
    <Layout>
      <Content>
        {categoryLabel && (
          <CategoryTitle $compact={isClothing}>{categoryLabel}</CategoryTitle>
        )}
        {isClothing && (
          <SubTabBar>
            <SubTab
              $isActive={category === 'clothing-real'}
              onClick={() => navigate('/works/clothing/real')}
            >
              실물제작
            </SubTab>
            <SubTab
              $isActive={category === 'clothing-digital'}
              onClick={() => navigate('/works/clothing/digital')}
            >
              디지털 클로딩
            </SubTab>
          </SubTabBar>
        )}

        <BackButton onClick={handleBack} aria-label="뒤로가기">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 4 L8 12 L16 20"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </BackButton>

        {!currentWork ? (
          <NotFound>작품을 찾을 수 없습니다.</NotFound>
        ) : (
          <>
            <DetailLayout>
              <ImageColumn>
                <ThumbnailList
                  ref={thumbnailListRef}
                  onScroll={updateFades}
                  $showTopFade={showTopFade}
                  $showBottomFade={showBottomFade}
                >
                  {images.map((src, index) => (
                    <ThumbnailItem
                      key={index}
                      $isActive={index === selectedImageIndex}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <ThumbnailImg
                        src={src}
                        alt={`${currentWork.title} ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </ThumbnailItem>
                  ))}
                </ThumbnailList>

                <MainImageWrapper>
                  {images[selectedImageIndex] ? (
                    <MainImage
                      src={images[selectedImageIndex]}
                      alt={currentWork.title}
                      decoding="async"
                    />
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

const CategoryTitle = styled.h2<{ $compact: boolean }>`
  font-weight: 700;
  color: ${COLORS.brand.primary};
  line-height: 1;
  text-align: left;

  ${({ $compact }) =>
    $compact
      ? responsiveStyle({
          mobile: css`
            font-size: 18px;
            margin-bottom: 16px;
          `,
          desktop: css`
            font-size: 27px;
            margin-bottom: 32px;
          `,
        })
      : responsiveStyle({
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

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${COLORS.brand.primary};
  padding: 0;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${responsiveStyle({
    mobile: css`
      width: 24px;
      height: 24px;
      margin-bottom: 24px;
    `,
    desktop: css`
      width: 32px;
      height: 32px;
      margin-bottom: 40px;
    `,
  })}

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
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
  container-type: inline-size;

  ${responsiveStyle({
    mobile: css`
      --thumb-gap: 12px;
      gap: var(--thumb-gap);
      width: 100%;
    `,
    desktop: css`
      --thumb-gap: 20px;
      gap: var(--thumb-gap);
      flex: 1;
    `,
  })}
`;

const FADE_SIZE = '48px';

const buildMask = (top: boolean, bottom: boolean): string => {
  const start = top ? `transparent 0, black ${FADE_SIZE}` : 'black 0';
  const end = bottom ? `black calc(100% - ${FADE_SIZE}), transparent 100%` : 'black 100%';
  return `linear-gradient(to bottom, ${start}, ${end})`;
};

const ThumbnailList = styled.div<{ $showTopFade: boolean; $showBottomFade: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: var(--thumb-gap);
  width: calc((100% - var(--thumb-gap) * 3.828) / 6);
  max-height: calc(((100cqw - var(--thumb-gap) * 3.828) / 6) * 1.414 * 5 + var(--thumb-gap) * 4);
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  mask-image: ${({ $showTopFade, $showBottomFade }) => buildMask($showTopFade, $showBottomFade)};
  -webkit-mask-image: ${({ $showTopFade, $showBottomFade }) => buildMask($showTopFade, $showBottomFade)};
  transition: mask-image 0.2s ease, -webkit-mask-image 0.2s ease;
`;

const ThumbnailItem = styled.div<{ $isActive: boolean }>`
  width: 100%;
  aspect-ratio: 1 / 1.414;
  flex-shrink: 0;
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

const MainImageWrapper = styled.div`
  flex: 1;
  min-width: 0;
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
      max-width: 480px;
    `,
  })}
`;

const WorkTitle = styled.h3`
  color: ${COLORS.brand.primary};
  font-weight: 700;
  line-height: 1.3;
  text-align: left;

  ${responsiveStyle({
    mobile: css`font-size: 16px;`,
    desktop: css`font-size: 20px;`,
  })}
`;

const Description = styled.p`
  color: ${COLORS.text.secondary};
  line-height: 1.6;
  white-space: pre-line;
  text-align: left;

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
