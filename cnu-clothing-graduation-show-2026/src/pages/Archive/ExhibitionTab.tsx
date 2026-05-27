import styled from 'styled-components';
import { COLORS } from '@/constants/colors';

// 공통으로 사용할 아이템 타입 정의 (TypeScript 에러 방지)
interface GridItemData {
  id: number;
  imgUrl?: string;
  colSpan: number;
  rowSpan: number;
  mColSpan?: number;
  mRowSpan?: number;
  isText?: boolean;
}

const ExhibitionTab = () => {
  // 데스크톱 전용 데이터 (텍스트 아이템 id:5)
  const desktopItems: GridItemData[] = [
    { id: 1, imgUrl: 'https://picsum.photos/400/600', colSpan: 10, rowSpan: 2 },
    { id: 2, imgUrl: 'https://picsum.photos/600/400', colSpan: 15, rowSpan: 1 }, 
    { id: 3, imgUrl: 'https://picsum.photos/300/300', colSpan: 6, rowSpan: 1 },
    { id: 4, imgUrl: 'https://picsum.photos/600/300', colSpan: 19, rowSpan: 1 }, 
    { id: 5, isText: true, colSpan: 9, rowSpan: 1 }, 
    { id: 6, imgUrl: 'https://picsum.photos/400/400', colSpan: 10, rowSpan: 1 },
    { id: 7, imgUrl: 'https://picsum.photos/400/800', colSpan: 11, rowSpan: 2 },
    { id: 8, imgUrl: 'https://picsum.photos/300/600', colSpan: 10, rowSpan: 2 },
    { id: 9, imgUrl: 'https://picsum.photos/600/400', colSpan: 15, rowSpan: 1 },
    { id: 10, imgUrl: 'https://picsum.photos/300/400', colSpan: 7, rowSpan: 1 },
    { id: 11, imgUrl: 'https://picsum.photos/300/400', colSpan: 7, rowSpan: 1 },
  ];

  // 모바일 전용 데이터 (텍스트 아이템 id:10 위치 변경됨)
  const mobileItems: GridItemData[] = [
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

  // 렌더링 헬퍼 함수
  const renderContent = (item: GridItemData) => {
    return item.isText ? (
      <SpecialText>
        2026 CNU <br />
        Clothing <br />
        Exhibition
      </SpecialText>
    ) : (
      !item.imgUrl && item.id
    );
  };

  return (
    <TabContainer>
      <Title>Exhibition View</Title>
      <GridBox>
        {/* 데스크톱 전용 그리드 렌더링 */}
        {desktopItems.map((item) => (
          <DesktopGridItem
            key={`desktop-${item.id}`}
            $imgUrl={item.imgUrl}
            $colSpan={item.colSpan}
            $rowSpan={item.rowSpan}
            $isText={item.isText}
          >
            {renderContent(item)}
          </DesktopGridItem>
        ))}

        {/* 모바일 전용 그리드 렌더링 */}
        {mobileItems.map((item) => (
          <MobileGridItem
            key={`mobile-${item.id}`}
            $imgUrl={item.imgUrl}
            // mColSpan, mRowSpan이 없을 경우를 대비한 기본값 1 처리 (오류 방지)
            $colSpan={item.mColSpan || 1} 
            $rowSpan={item.mRowSpan || 1}
            $isText={item.isText}
          >
            {renderContent(item)}
          </MobileGridItem>
        ))}
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
    margin: 0 auto;
  }
`;

const GridBox = styled.div`
  display: grid;
  width: 100%;
  
  /* 데스크톱 기본 격자 구조 */
  grid-template-columns: repeat(50, minmax(0, 1fr));
  grid-template-rows: 20cqw 11cqw 17cqw;
  gap: 15px;
  grid-auto-flow: row dense;
  margin: 0 0 50px;

  /* 모바일(768px 이하) 분기 */
  @media (max-width: 768px) {
    grid-template-columns: 1.2fr 1fr 1.2fr; 
    grid-template-rows: repeat(50, minmax(0, 1fr));
    height: 140vw; 
    gap: 10px;
    margin: 0 0 40px;
  }
`;

/* ---------- 데스크톱 전용 아이템 스타일 (타입 복구 완료) ---------- */

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

/* ---------- 모바일 전용 아이템 스타일 (타입 복구 완료) ---------- */

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

    grid-column: span ${(props) => props.$colSpan};
    grid-row: span ${(props) => props.$rowSpan};

    min-width: 0;
    min-height: 0;
    overflow: hidden;

    align-items: center;
    justify-content: ${(props) => (props.$isText ? 'flex-start' : 'center')};
    padding: ${(props) => (props.$isText ? '0 10px' : '0')};

    font-weight: 800;
    color: rgba(0, 0, 0, 0.3);
    font-size: 1.1rem;
  }
`;

export default ExhibitionTab;