import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Layout from '@/components/layout/Layout';
import { useResponsive } from '@/hooks/useResponsive';
import { responsiveStyle } from '@/styles/responsive';
import { css } from 'styled-components';

// 샘플 이미지들
const MAGAZINE_PAGES = [
  'https://picsum.photos/id/10/800/1131', // 1페이지 (A4 비율)
  'https://picsum.photos/id/20/800/1131', // 2페이지
  'https://picsum.photos/id/30/800/1131', // 3페이지
  'https://picsum.photos/id/40/800/1131', // 4페이지
  'https://picsum.photos/id/50/800/1131', // 5페이지
  'https://picsum.photos/id/60/800/1131', // 6페이지
  'https://picsum.photos/id/70/800/1131', // 7페이지
];

const MagazinePage = (): React.JSX.Element => {
  const device = useResponsive();
  const isMobile = device === 'mobile';

  // 현재 가리키고 있는 페이지의 인덱스
  // 데스크톱: 왼쪽 페이지 기준 (0, 2, 4...)
  // 모바일: 현재 보여지는 단일 페이지 기준 (0, 1, 2, 3, 4, 5)
  const [currentPage, setCurrentPage] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const totalPages = MAGAZINE_PAGES.length;

  const handleNext = () => {
    setAnimKey(prev => prev + 1);

    if (isMobile) {
      // 모바일: 한 장씩 넘어가고, 끝에 도달하면 처음(0)으로 루프
      if (currentPage + 1 < totalPages) {
        setCurrentPage(currentPage + 1);
      } else {
        setCurrentPage(0);
      }
    } else {
      // 데스크톱: 기존 2장씩 이동 로직 유지
      if (currentPage + 2 < totalPages) {
        setCurrentPage(currentPage + 2);
      } else {
        setCurrentPage(0); // 끝에 도달하면 처음으로 루프
      }
    }
  };

  const handlePrev = () => {
    // 모바일에서는 터치 시 무조건 '다음'으로 넘어가므로 데스크톱에서만 작동하도록 방어
    if (isMobile) return; 

    if (currentPage - 2 >= 0) {
      setCurrentPage(currentPage - 2);
      setAnimKey(prev => prev + 1);
    }
  };

  return (
    <Layout>
      <MagazineContainer>
        {/* 모바일에서는 어떤 페이지를 터치해도 handleNext가 작동하도록 Wrapper 단에서 이벤트를 다룹니다 */}
        <BookWrapper key={animKey} onClick={isMobile ? handleNext : undefined}>
          
          {/* 왼쪽 페이지 (데스크톱에서는 이전 버튼 / 모바일에서는 단일 화면) */}
          <PageSection 
            onClick={isMobile ? undefined : handlePrev} 
            $disabled={!isMobile && currentPage === 0}
            $isMobile={isMobile}
          >
            <PageImage 
              src={MAGAZINE_PAGES[currentPage]} 
              alt={`Page ${currentPage + 1}`} 
            />
          </PageSection>

          {/* 오른쪽 페이지 (데스크톱에서만 노출, 다음 버튼 역할) */}
          {!isMobile && (
              <PageSection 
                onClick={handleNext} 
                $disabled={currentPage + 2 >= totalPages}
                $isMobile={false}
              >
                {MAGAZINE_PAGES[currentPage + 1] ? (
                  // 다음 페이지가 존재하면 기존처럼 이미지 렌더링
                  <PageImage 
                    src={MAGAZINE_PAGES[currentPage + 1]} 
                    alt={`Page ${currentPage + 2}`} 
                  />
                ) : (
                  // 홀수 장이라 마지막 남은 오른쪽 페이지가 없을 때 보여줄 빈 공간 (회색 바탕 등)
                  <EmptyPageSection />
                )}
              </PageSection>
            )}

        </BookWrapper>
      </MagazineContainer>
    </Layout>
  );
};

/* ---------- 스타일 및 애니메이션 ---------- */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MagazineContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
`;

const BookWrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 1400px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  animation: ${fadeIn} 0.6s ease-out;
  
  /* 모바일에서는 전체 영역이 다음 페이지 트리거이므로 커서 스타일 제공 */
  ${responsiveStyle({
    mobile: css` cursor: pointer; `,
    desktop: css` cursor: default; `
  })}
`;

const PageSection = styled.div<{ $disabled: boolean; $isMobile: boolean }>`
  flex: 1;
  position: relative;
  overflow: hidden;
  
  /* 데스크톱 환경에서만 기존 인터랙션 적용 */
  cursor: ${p => (p.$isMobile ? 'inherit' : p.$disabled ? 'default' : 'pointer')};

  /* 페이지 중앙 가름선 효과 (데스크톱에서 두 장으로 보일 때만 적용) */
  &:first-child {
    border-right: ${p => (p.$isMobile ? 'none' : '1px solid rgba(0,0,0,0.1)')};
  }

  &:hover .hint {
    opacity: 1;
  }
`;

const PageImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1.414; /* A4 정밀 비율 */
  display: block;
  object-fit: cover;
  transition: filter 0.3s;

  ${PageSection}:hover & {
    /* 모바일이 아닐 때만 호버 효과 작동 */
    filter: ${p => (p.theme ? 'none' : 'brightness(0.9)')}; 
  }
  
  /* 의존성 없는 순수 styled-components 내부 호버 분기 처리 */
  @media (min-width: 768px) {
    ${PageSection}:hover & {
      filter: brightness(0.9);
    }
  }
`;

const EmptyPageSection = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1.414; /* 기존 이미지와 동일한 비율 유지 */
  background-color: #f5f5f5;
`;

export default MagazinePage;