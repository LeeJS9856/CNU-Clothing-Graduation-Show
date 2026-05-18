import React from 'react';
import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { COLORS } from '@/constants/colors';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SafeProvider>
      <Header>
        <BrandText href="/">결: 시작과 동시에 축적될 방향</BrandText>
        <Navigation />
      </Header>
      
      <MainContent>
        {children}
      </MainContent>

      <Footer />
    </SafeProvider>
  );
};

const SafeProvider = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  ${responsiveStyle({
    mobile: css`padding: 0 16px;`,
    desktop: css`padding: 0 40px;`,
  })}
`;

const Header = styled.header`
  width: 100%;
  ${responsiveStyle({
    mobile: css`padding-top: 32px; padding-bottom: 24px;`,
    desktop: css`padding-top: 60px; padding-bottom: 40px;`,
  })}
`;

const BrandText = styled.a`
  display: block;
  text-align: left;
  font-weight: 700;
  color: ${COLORS.brand.primary};
  ${responsiveStyle({
    mobile: css`font-size: 30px;`,
    desktop: css`font-size: 45px;`,
  })}
  text-decoration: none;
`;

const MainContent = styled.main`
  flex: 1; /* 컨텐츠가 적어도 푸터를 바닥으로 밀어내도록 함 */
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;

export default Layout;
