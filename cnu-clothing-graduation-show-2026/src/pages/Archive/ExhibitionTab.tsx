import React from 'react';
import styled from 'styled-components';

const ExhibitionTab = () => {
  return (
    <TabContainer>
      <h3>Exhibition Views</h3>
      {/* 여기에 전시 전경 관련 이미지나 리스트를 추가하세요 */}
      <p>전시 전경 결과물들이 들어갈 자리입니다.</p>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`;

export default ExhibitionTab;
