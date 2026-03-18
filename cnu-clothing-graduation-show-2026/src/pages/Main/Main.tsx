import React from 'react';
import styled, { css } from 'styled-components';
import { responsiveCss } from '@/styles/responsive';
import { useResponsive } from '@/hooks/useResponsive';

const Main = (): React.JSX.Element => {
  const device = useResponsive();

  return (
    <SafeProvider>
      <Content>
        <Title>
          {device === 'mobile' ? '📱 모바일' : '🖥️ 데스크톱'}
        </Title>
      </Content>
    </SafeProvider>
  );
};

const SafeProvider = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  ${responsiveCss({
    mobile: css`
      padding: 20px;
    `,
    desktop: css`
      padding: 40px;
    `,
  })}
`;

const Title = styled.h1`
  font-size: 24px ;
  font-weight: bold;
`;

export default Main;
