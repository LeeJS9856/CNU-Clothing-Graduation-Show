import styled from 'styled-components';

const GoodsTab = () => {
  return (
    <TabContainer>
      <h3>Goods</h3>
      {/* 여기에 굿즈 상품 리스트나 이미지를 추가하세요 */}
      <p>굿즈 이미지들이 들어갈 자리입니다.</p>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`;

export default GoodsTab;
