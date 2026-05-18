import styled from 'styled-components';
import { COLORS } from '@/constants/colors';

const GoodsTab = () => {
  const goodsData = [
    {
      id: 1,
      name: '2026 Graduation Exhibition Mug',
      description: '의류학과의 정체성과 상징적인 요소를 담아낸 머그컵',
      imgUrl: 'https://picsum.photos/id/160/600/600', 
    },
    {
      id: 2,
      name: '2026 Graduation Exhibition Eco Bag',
      description: '의류학과의 정체성과 상징적인 요소를 담아낸 에코백',
      imgUrl: 'https://picsum.photos/id/225/600/600',
    },
  ];

  return (
    <TabContainer>
      <MainTitle>Goods</MainTitle>
      
      <GoodsList>
        {goodsData.map((item, index) => (
          <GoodsItem key={item.id} $isReverse={index % 2 !== 0}>
            <InfoContainer>
              <GoodsName>{item.name}</GoodsName>
              <GoodsDescription>{item.description}</GoodsDescription>
            </InfoContainer>

            <ImageContainer>
              <GoodsImage src={item.imgUrl} alt={item.name} />
            </ImageContainer>
          </GoodsItem>
        ))}
      </GoodsList>
    </TabContainer>
  );
};


const TabContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px;
`;

const MainTitle = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 900;
  color: ${COLORS.primary};
  text-align: left;
  margin-bottom: 40px;
`;

const GoodsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px; 
  margin-bottom: 100px;
`;

const GoodsItem = styled.div<{ $isReverse: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  flex-direction: ${(p) => (p.$isReverse ? 'row-reverse' : 'row')};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  text-align: left;
`;

const GoodsName = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${COLORS.black};
  margin: 0 0 16px 0;
  word-break: keep-all;
`;

const GoodsDescription = styled.p`
  font-size: 1rem;
  color: ${COLORS.gray}
  line-height: 1.6;
  margin: 0;
  word-break: keep-all;
`;

const ImageContainer = styled.div`
  flex: 0.5;
  aspect-ratio: 1.4 / 1;
  background-color: ${COLORS.gray};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const GoodsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export default GoodsTab;
