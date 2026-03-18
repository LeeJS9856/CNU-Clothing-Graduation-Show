import React from 'react';
import styled from 'styled-components';

const Home = (): React.JSX.Element => {
  return (
    <SafeProvider>
        helloworld
    </SafeProvider>
  );
};

const SafeProvider = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; 
`;

export default Home;