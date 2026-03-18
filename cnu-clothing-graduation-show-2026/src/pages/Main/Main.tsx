import React from 'react';
import styled, { css } from 'styled-components';
import { useResponsive } from '@/hooks/useResponsive';

const Main = (): React.JSX.Element => {
  const device = useResponsive();

  return (
    <SafeProvider>
        <Title>
          {device === 'mobile' ? '📱 모바일' : '🖥️ 데스크톱'}
        </Title>
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

const Title = styled.h1`
  font-size: 24px ;
  font-weight: bold;
`;

export default Main;
