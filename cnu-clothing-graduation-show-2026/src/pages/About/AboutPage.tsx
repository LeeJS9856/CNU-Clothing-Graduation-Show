import React from 'react';
import styled, { css } from 'styled-components';
import { useResponsive } from '@/hooks/useResponsive';
import { responsiveStyle } from '@/styles/responsive';
import Navigation from '@/components/layout/Navigation'
import { COLORS } from '@/constants/colors'

const AboutPage = (): React.JSX.Element => {
  const device = useResponsive();
  const isMounted = React.useMemo(() => typeof window !== 'undefined', []);

  return (
    <SafeProvider>
      <Header>
        <BrandText href={`/`}>결: 시작과 동시에 축적될 방향</BrandText>
        <Navigation />
      </Header>

      <Content>
        <Title>
          {isMounted && (device === 'mobile' ? '📱 모바일' : '🖥️ 데스크톱')}
        </Title>
      </Content>
    </SafeProvider>
  );
};

const SafeProvider = styled.div`
  width: 100%;
  max-width: 1280px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  ${responsiveStyle({
    mobile: css` padding: 0 16px; `,
    desktop: css` padding: 0 40px; `,
  })}
`;

const Header = styled.header`
  width: 100%;
  ${responsiveStyle({
    mobile: css` padding-top: 32px; `,
    desktop: css` padding-top: 60px; `,    

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
  text-decoration:none;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #ccc;
`;

export default AboutPage;
