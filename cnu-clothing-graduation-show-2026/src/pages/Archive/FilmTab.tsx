import React from 'react';
import styled from 'styled-components';

const FilmTab = () => {
  return (
    <TabContainer>
      <h3>Film</h3>
      {/* 여기에 영상 플레이어나 리스트를 추가하세요 */}
      <p>관련 영상들이 들어갈 자리입니다.</p>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`;

export default FilmTab;
