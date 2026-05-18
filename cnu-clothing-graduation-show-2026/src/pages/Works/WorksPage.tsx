import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import Layout from '@/components/layout/Layout';
import { COLORS } from '@/constants/colors';

type SubCategory = {
  label: string;
  path: string;
};

type Category = {
  label: string;
  path?: string;            // 단일 페이지인 경우 직접 이동
  subCategories?: SubCategory[]; // 하위 카테고리가 있는 경우 hover 시 노출
};

const CATEGORIES: Category[] = [
  { label: '브랜딩', path: '/works/branding' },
  { label: '매거진', path: '/works/magazine' },
  {
    label: '의복구성',
    subCategories: [
      { label: '실물제작', path: '/works/clothing/real' },
      { label: '디지털 클로딩', path: '/works/clothing/digital' },
    ],
  },
  { label: '전통복식', path: '/works/traditional' },
  { label: '패션디자인', path: '/works/fashion-design' },
  { label: '스마트 텍스타일', path: '/works/smart-textile' },
];

const WorksPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const handleCategoryClick = (category: Category) => {
    // 하위 카테고리가 있으면 직접 라우팅하지 않음 (hover 메뉴에서 선택)
    if (category.subCategories) return;
    if (category.path) navigate(category.path);
  };

  return (
    <Layout>
      <Content>
        <CategoryList>
          {CATEGORIES.map((category) => {
            const isHovered = hoveredLabel === category.label;
            const hasSub = !!category.subCategories;

            return (
              <CategoryRow
                key={category.label}
                onMouseEnter={() => setHoveredLabel(category.label)}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                <CategoryItem onClick={() => handleCategoryClick(category)}>
                  {category.label}
                </CategoryItem>

                {hasSub && (
                  <SubCategoryWrapper $isVisible={isHovered}>
                    {category.subCategories!.map((sub) => (
                      <SubCategoryItem
                        key={sub.label}
                        onClick={() => navigate(sub.path)}
                      >
                        {sub.label}
                      </SubCategoryItem>
                    ))}
                  </SubCategoryWrapper>
                )}
              </CategoryRow>
            );
          })}
        </CategoryList>
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
`;

const CategoryList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${responsiveStyle({
    mobile: css`gap: 24px;`,
    desktop: css`gap: 48px;`,
  })}
`;

const CategoryRow = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${responsiveStyle({
    mobile: css`gap: 8px;`,
    desktop: css`gap: 16px;`,
  })}
`;

const CategoryItem = styled.span`
  font-weight: 700;
  color: ${COLORS.brand.primary};
  cursor: pointer;
  transition: opacity 0.2s;
  line-height: 1;

  ${responsiveStyle({
    mobile: css`font-size: 24px;`,
    desktop: css`font-size: 36px;`,
  })}

  &:hover {
    opacity: 0.6;
  }
`;

const SubCategoryWrapper = styled.div<{ $isVisible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  max-height: ${({ $isVisible }) => ($isVisible ? '80px' : '0px')};
  transition: opacity 0.25s ease, max-height 0.25s ease;
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};

  ${responsiveStyle({
    mobile: css`gap: 16px;`,
    desktop: css`gap: 32px;`,
  })}
`;

const SubCategoryItem = styled.span`
  font-weight: 500;
  color: ${COLORS.brand.primary};
  cursor: pointer;
  transition: opacity 0.2s;
  line-height: 1;

  ${responsiveStyle({
    mobile: css`font-size: 14px;`,
    desktop: css`font-size: 20px;`,
  })}

  &:hover {
    text-decoration: underline;
    font-weight: 700;
  }
`;

export default WorksPage;