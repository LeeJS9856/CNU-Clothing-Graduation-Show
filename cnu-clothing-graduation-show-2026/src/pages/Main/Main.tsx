import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/layout/Layout';
import MainPoster from '@/assets/images/main_poster.png';

const Main = (): React.JSX.Element => {
  return (
    <Layout>
      <PosterImage src={MainPoster} alt="Main Poster" />
    </Layout>
  );
};

// 이미지 스타일링만 유지
const PosterImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
`;

export default Main;
