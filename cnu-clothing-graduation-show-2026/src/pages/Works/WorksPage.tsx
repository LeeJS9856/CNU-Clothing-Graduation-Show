import React from 'react';
import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import Layout from '@/components/layout/Layout';
import { COLORS } from '@/constants/colors';

const CATEGORIES = [
  '브랜딩',
  '매거진',
  '의복구성',
  '전통복식',
  '패션디자인',
  '스마트 텍스타일',
];

const WorksPage = (): React.JSX.Element => {
  return (
    <Layout>
      <Content>
        <CategoryList>
          {CATEGORIES.map((category) => (
            <CategoryItem key={category}>
              {category}
            </CategoryItem>
          ))}
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

const CategoryItem = styled.li`
  font-weight: 700;
  color: ${COLORS.brand.primary};
  cursor: pointer;
  transition: opacity 0.2s;
  line-height: 1;               /* 줄 높이 타이트하게 */

  ${responsiveStyle({
    mobile: css`font-size: 28px;`,
    desktop: css`font-size: 52px;`,
  })}

  &:hover {
    opacity: 0.6;
  }
`;

export default WorksPage;