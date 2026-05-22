import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';

const ExhibitionTab = () => {
  // 모바일 격자는 가로 3열(1.2 : 1 : 1.2), 세로 총 10칸 분할 구조입니다.
  // mColSpan(최대 3)과 mRowSpan(세로로 차지할 칸 수)을 통해 자유롭게 크기를 조절할 수 있습니다.
  const items = [
    { id: 1, imgUrl: 'https://picsum.photos/400/600', colSpan: 10, rowSpan: 2, mColSpan: 1, mRowSpan: 17 },
    { id: 2, imgUrl: 'https://picsum.photos/600/400', colSpan: 15, rowSpan: 1, mColSpan: 2, mRowSpan: 8 }, 
    { id: 3, imgUrl: 'https://picsum.photos/300/300', colSpan: 6, rowSpan: 1, mColSpan: 1, mRowSpan: 12 },
    { id: 4, imgUrl: 'https://picsum.photos/600/300', colSpan: 19, rowSpan: 1, mColSpan: 1, mRowSpan: 12 }, 
    { id: 5, imgUrl: 'https://picsum.photos/400/400', colSpan: 10, rowSpan: 1, mColSpan: 1, mRowSpan: 17 },
    { id: 6, imgUrl: 'https://picsum.photos/400/800', colSpan: 11, rowSpan: 2, mColSpan: 2, mRowSpan: 10 },
    { id: 7, imgUrl: 'https://picsum.photos/300/600', colSpan: 10, rowSpan: 2, mColSpan: 1, mRowSpan: 10 },
    { id: 8, imgUrl: 'https://picsum.photos/600/400', colSpan: 15, rowSpan: 1, mColSpan: 1, mRowSpan: 20 },
    { id: 10, isText: true, colSpan: 9, rowSpan: 1, mColSpan: 1, mRowSpan: 6 }, 
    { id: 9, imgUrl: 'https://picsum.photos/300/400', colSpan: 7, rowSpan: 1, mColSpan: 1, mRowSpan: 10 },
    { id: 11, imgUrl: 'https://picsum.photos/300/400', colSpan: 7, rowSpan: 1, mColSpan: 1, mRowSpan: 10 },
  ];

  return (
    <TabContainer>
      <Title>Exhibition View</Title>
      <GridBox>
        {items.map((item) => {
          const content = item.isText ? (
            <SpecialText>
              2026 CNU <br />
              Clothing <br />
              Exhibition
            </SpecialText>
          ) : (
            !item.imgUrl && item.id
          );

          return (
            <React.Fragment key={item.id}>
              {/* 데스크톱 전용 그리드 아이템 */}
              <DesktopGridItem
                $imgUrl={item.imgUrl}
                $colSpan={item.colSpan}
                $rowSpan={item.rowSpan}
                $isText={item.isText}
              >
                {content}
              </DesktopGridItem>

              {/* 모바일 전용 그리드 아이템 */}
              <MobileGridItem
                $imgUrl={item.imgUrl}
                $colSpan={item.mColSpan}
                $rowSpan={item.mRowSpan}
                $isText={item.isText}
              >
                {content}
              </MobileGridItem>
            </React.Fragment>
          );
        })}
      </GridBox>
    </TabContainer>
  );
};

/* ---------- 공통 레이아웃 스타일 ---------- */

const TabContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  container-type: inline-size;
`;

const Title = styled.h2`
  font-size: 2.8cqw;
  font-weight: 800;
  color: ${COLORS.primary};
  text-align: left;
  margin: 0 0 20px;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const SpecialText = styled.p`
  color: ${COLORS.primary};
  font-weight: 700;
  font-size: 2.2cqw; 
  line-height: 1.3;
  margin: 0;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 3.2vw;
    text-align: center;
    margin : 0 auto;
  }
`;

const GridBox = styled.div`
  display: grid;
  width: 100%;
  
  /* 데스크톱 기본 격자 구조 (기존 상태 유지) */
  grid-template-columns: repeat(50, minmax(0, 1fr));
  grid-template-rows: 20cqw 11cqw 17cqw;
  gap: 15px;
  grid-auto-flow: row dense;
  margin: 0 0 50px;

  /* 모바일(768px 이하) 분기 */
  @media (max-width: 768px) {
    /* 가로 컬럼 1.2 : 1 : 1.2 설정 */
    grid-template-columns: 1.2fr 1fr 1.2fr; 
    
    /* 세로 행(Rows)을 10칸으로 잘게 쪼개어 mRowSpan에 의해 높이가 지맘대로 조절되도록 치환 */
    grid-template-rows: repeat(50, minmax(0, 1fr));
    /* 모바일 전체 그리드 영역의 총 높이를 유연하게 지정하여 스크롤 생김을 방지 */
    height: 140vw; 
    gap: 10px;
    margin: 0 0 40px;
  }
`;


/* ---------- 데스크톱 전용 아이템 스타일 ---------- */

const DesktopGridItem = styled.div<{
  $imgUrl?: string;
  $colSpan: number;
  $rowSpan: number;
  $isText?: boolean;
}>`
  background-image: ${(props) => (props.$imgUrl ? `url(${props.$imgUrl})` : 'none')};
  background-color: ${(p) => p.$imgUrl ? 'transparent' : p.$isText ? 'transparent' : COLORS.gray};
  background-size: cover;
  background-position: center;
  
  grid-column: span ${(props) => props.$colSpan};
  grid-row: span ${(props) => props.$rowSpan};
  
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isText ? 'flex-start' : 'center')};
  padding: ${(props) => (props.$isText ? '0 10px' : '0')};

  font-weight: 800;
  color: rgba(0, 0, 0, 0.3);
  font-size: 1.5rem;
  transition: transform 0.2s;
  
  &:hover {
    ${(p) => !p.$isText && `
      transform: scale(1.05);
      z-index: 10;
    `}
  }

  @media (max-width: 768px) {
    display: none !important;
  }
`;


/* ---------- 모바일 전용 아이템 스타일 ---------- */

const MobileGridItem = styled.div<{
  $imgUrl?: string;
  $colSpan: number;
  $rowSpan: number;
  $isText?: boolean;
}>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    background-image: ${(props) => (props.$imgUrl ? `url(${props.$imgUrl})` : 'none')};
    background-color: ${(p) => p.$imgUrl ? 'transparent' : p.$isText ? 'transparent' : COLORS.gray};
    background-size: cover;
    background-position: center;

    /* 모바일 전용 mColSpan(가로 분할 비율 안에서), mRowSpan(세로 분할 격자 안에서)으로 완전히 자유롭게 크기 작동 */
    grid-column: span ${(props) => props.$colSpan};
    grid-row: span ${(props) => props.$rowSpan};

    min-width: 0;
    min-height: 0;
    overflow: hidden;
    border-radius: 4px;

    align-items: center;
    justify-content: ${(props) => (props.$isText ? 'flex-start' : 'center')};
    padding: ${(props) => (props.$isText ? '0 10px' : '0')};

    font-weight: 800;
    color: rgba(0, 0, 0, 0.3);
    font-size: 1.1rem;
  }
`;

export default ExhibitionTab;