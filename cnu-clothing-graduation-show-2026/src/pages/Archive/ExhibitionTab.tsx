import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';

const ExhibitionTab = () => {
  const items = [
    { id: 1, imgUrl: 'https://picsum.photos/400/600', colSpan: 10, rowSpan: 2 },
    { id: 2, imgUrl: 'https://picsum.photos/600/400', colSpan: 15, rowSpan: 1 }, 
    { id: 3, imgUrl: 'https://picsum.photos/300/300', colSpan: 6, rowSpan: 1 },
    { id: 4, imgUrl: 'https://picsum.photos/600/300', colSpan: 19, rowSpan: 1 }, // 합계 50을 위해 16->19로 조정
    { id: 5, isText: true, colSpan: 9, rowSpan: 1 }, // 텍스트 아이템
    { id: 6, imgUrl: 'https://picsum.photos/400/400', colSpan: 10, rowSpan: 1 },
    { id: 7, imgUrl: 'https://picsum.photos/400/800', colSpan: 11, rowSpan: 2 },
    { id: 8, imgUrl: 'https://picsum.photos/300/600', colSpan: 10, rowSpan: 2 },
    { id: 9, imgUrl: 'https://picsum.photos/600/400', colSpan: 15, rowSpan: 1 },
    { id: 10, imgUrl: 'https://picsum.photos/300/400', colSpan: 7, rowSpan: 1 },
    { id: 11, imgUrl: 'https://picsum.photos/300/400', colSpan: 7, rowSpan: 1 },
  ];

  return (
    <TabContainer>
      <Title>Exhibition View</Title>
      <GridBox>
        {items.map((item) => (
          <GridItem
            key={item.id}
            $imgUrl={item.imgUrl}
            $colSpan={item.colSpan}
            $rowSpan={item.rowSpan}
            $isText={item.isText}
          >
            {item.isText ? (
              <SpecialText>
                2026 CNU <br />
                Clothing <br />
                Exhibition
              </SpecialText>
            ) : (
              // 이미지가 없을 때만 ID 표시 (이미지 있을 땐 alt로 처리)
              !item.imgUrl && item.id
            )}
          </GridItem>
        ))}
      </GridBox>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  container-type: inline-size;
`;

const Title = styled.h2`
  font-size: 2.8cqw;                /* 가로폭에 반응형 */
  font-weight: 800;
  color: ${COLORS.primary};
  text-align: left;
  margin:0 0 40px;                 /* 아래쪽에 20px 여백 */
  user-select: none;
`;

const GridBox = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(50, minmax(0, 1fr));
  grid-template-rows: 20cqw 11cqw 17cqw;
  gap: 15px;
  grid-auto-flow: row dense;
  margin:0 0 50px;
`;

const GridItem = styled.div<{
  $imgUrl?: string;
  $colSpan: number;
  $rowSpan: number;
  $isText?: boolean;
}>`
  /* 이미지 처리: imgUrl이 있으면 배경으로, 없으면 회색 */
  background-image: ${(props) => (props.$imgUrl ? `url(${props.$imgUrl})` : 'none')};
  background-color: ${(p) =>
    p.$imgUrl ? 'transparent' : p.$isText ? 'transparent' : COLORS.gray};
  background-size: cover;
  background-position: center;
  
  grid-column: span ${(props) => props.$colSpan};
  grid-row: span ${(props) => props.$rowSpan};
  
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  display: flex;
  /* 텍스트 아이템은 왼쪽 정렬, 나머지는 중앙 정렬 */
  align-items: ${(props) => (props.$isText ? 'center' : 'center')};
  justify-content: ${(props) => (props.$isText ? 'flex-start' : 'center')};
  padding: ${(props) => (props.$isText ? '0 10px' : '0')};

  font-weight: 800;
  color: rgba(0, 0, 0, 0.3);
  font-size: 1.5rem;
  transition: transform 0.2s;
  
  &:hover {
    ${(p) =>
      !p.$isText &&
      `
      transform: scale(1.05);
      z-index: 10; // 확대 시 주변 이미지에 가려지지 않도록 추가
    `}
  }
`;

const SpecialText = styled.p`
  color: ${COLORS.primary};
  font-weight: 700;
  font-size: 1.2rem; /* 전체 높이 대비 적절한 크기로 조정 */
  line-height: 1.3;
  margin: 0;
  text-align: left;
  /* cqw 단위를 사용하여 화면 너비에 따라 글자 크기도 반응하게 할 수 있습니다 */
  font-size: 2.2cqw; 
`;

export default ExhibitionTab;
