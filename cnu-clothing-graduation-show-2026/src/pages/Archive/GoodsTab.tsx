import React from 'react';
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
          <React.Fragment key={item.id}>
            {/* 데스크톱 전용 컴포넌트 (768px 초과일 때만 노출) */}
            <DesktopGoodsItem $isReverse={index % 2 !== 0}>
              <InfoContainer>
                <GoodsName>{item.name}</GoodsName>
                <GoodsDescription>{item.description}</GoodsDescription>
              </InfoContainer>

              <DesktopImageContainer>
                <GoodsImage src={item.imgUrl} alt={item.name} />
              </DesktopImageContainer>
            </DesktopGoodsItem>

            {/* 모바일 전용 컴포넌트 (768px 이하일 때만 노출, 이미지 -> 텍스트 순서) */}
            <MobileGoodsItem>
              <MobileImageContainer>
                <GoodsImage src={item.imgUrl} alt={item.name} />
              </MobileImageContainer>

              <InfoContainer>
                <GoodsName>{item.name}</GoodsName>
                <GoodsDescription>{item.description}</GoodsDescription>
              </InfoContainer>
            </MobileGoodsItem>
          </React.Fragment>
        ))}
      </GoodsList>
    </TabContainer>
  );
};

/* ---------- 공통 레이아웃 스타일 ---------- */

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
  margin-bottom: 40px;
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
  color: ${COLORS.gray};
  line-height: 1.6;
  margin: 0;
  word-break: keep-all;
`;

const GoodsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;
`;


/* ---------- 데스크톱 전용 스타일 (Desktop) ---------- */

const DesktopGoodsItem = styled.div<{ $isReverse: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  flex-direction: ${(p) => (p.$isReverse ? 'row-reverse' : 'row')};

  @media (max-width: 768px) {
    display: none; /* 모바일 화면에서는 아예 숨김 */
  }
`;

const DesktopImageContainer = styled.div`
  flex: 0.5;
  aspect-ratio: 1.4 / 1;
  background-color: ${COLORS.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden; /* 호버 시 이미지가 8px 둥근 모서리 안에서만 정상 확대되도록 가둡니다 */

  &:hover ${GoodsImage} {
    transform: scale(1.1);
  }
`;


/* ---------- 모바일 전용 스타일 (Mobile) ---------- */

const MobileGoodsItem = styled.div`
  display: none; /* 기본 상태(데스크톱)에서는 숨김 */

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column; /* 수직 정렬 고정 */
    gap: 30px;
  }
`;

const MobileImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1.4 / 1;
  background-color: ${COLORS.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden; /* 모바일에서도 동일하게 테두리를 탈출하지 못하도록 고정 */

  &:hover ${GoodsImage} {
    transform: scale(1.1);
  }
`;

export default GoodsTab;