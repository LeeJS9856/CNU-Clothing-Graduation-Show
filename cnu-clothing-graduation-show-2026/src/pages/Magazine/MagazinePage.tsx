import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Layout from '@/components/layout/Layout';
import { useResponsive } from '@/hooks/useResponsive';
import { responsiveStyle } from '@/styles/responsive';
import { css } from 'styled-components';

import { MAGAZINE_PAGES } from '@/data/magazine/magazine';

const MagazinePage = (): React.JSX.Element => {
  const device = useResponsive();
  const isMobile = device === 'mobile';

  const [currentPage, setCurrentPage] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const totalPages = MAGAZINE_PAGES.length;

  const handleNext = () => {
    setAnimKey(prev => prev + 1);

    if (isMobile) {
      if (currentPage + 1 < totalPages) {
        setCurrentPage(currentPage + 1);
      } else {
        setCurrentPage(0);
      }
    } else {
      if (currentPage === 0) {
        if (1 < totalPages) setCurrentPage(1);
      } else if (currentPage + 2 < totalPages) {
        setCurrentPage(currentPage + 2);
      } else {
        setCurrentPage(0); // 끝에 도달하면 다시 표지(0)로 루프
      }
    }
  };

  const handlePrev = () => {
    if (isMobile) return; 

    setAnimKey(prev => prev + 1);

    // 🌟 [추가된 로직] 첫 페이지(표지)에서 왼쪽(이전)을 클릭하면 맨 뒷페이지로 이동
    if (currentPage === 0) {
      if (totalPages <= 1) return; // 페이지가 1장 이하면 이동 안 함

      // 총 페이지 수(totalPages)가 짝수인지 홀수인지에 따라 마지막 세트의 왼쪽 페이지 인덱스를 구합니다.
      // 예: 78장일 때 -> 마지막 세트는 76, 77번 이미지 (인덱스 75는 홀수이므로 짝수 인덱스인 75로 정렬)
      // 인덱스 규칙상 표지(0)를 제외하면 항상 홀수 인덱스(1, 3, 5...)가 세트의 시작점이 됩니다.
      if (totalPages % 2 === 0) {
        // 총 장수가 짝수면 마지막 세트의 왼쪽 인덱스는 totalPages - 1 (홀수)
        setCurrentPage(totalPages - 1);
      } else {
        // 총 장수가 홀수면 마지막 세트의 왼쪽 인덱스는 totalPages - 2 (홀수)
        setCurrentPage(totalPages - 2);
      }
      return;
    }

    // 기존 이전 페이지 이동 로직
    if (currentPage === 1) {
      setCurrentPage(0);
    } else if (currentPage - 2 >= 0) {
      setCurrentPage(currentPage - 2);
    }
  };

  return (
    <Layout>
      <MagazineContainer>
        <BookWrapper key={animKey} onClick={isMobile ? handleNext : undefined}>
          
          {/* 왼쪽 페이지 영역 (첫 페이지일 때는 맨 뒤로 가는 트리거 역할, disabled 해제) */}
          <PageSection 
            onClick={isMobile ? undefined : handlePrev} 
            $disabled={false} // 첫 페이지에서도 작동하므로 항상 클릭 가능하게 만듭니다.
            $isMobile={isMobile}
          >
            {isMobile ? (
              <PageImage 
                src={MAGAZINE_PAGES[currentPage]} 
                alt={`Page ${currentPage + 1}`} 
              />
            ) : currentPage === 0 ? (
              <EmptyPageSection />
            ) : (
              <PageImage 
                src={MAGAZINE_PAGES[currentPage]} 
                alt={`Page ${currentPage + 1}`} 
              />
            )}
          </PageSection>

          {/* 오른쪽 페이지 영역 */}
          {!isMobile && (
            <PageSection 
              onClick={handleNext} 
              $disabled={currentPage === 0 ? totalPages <= 1 : currentPage + 2 >= totalPages}
              $isMobile={false}
            >
              {currentPage === 0 ? (
                <PageImage 
                  src={MAGAZINE_PAGES[0]} 
                  alt="Page 1 (Cover)" 
                />
              ) : MAGAZINE_PAGES[currentPage + 1] ? (
                <PageImage 
                  src={MAGAZINE_PAGES[currentPage + 1]} 
                  alt={`Page ${currentPage + 2}`} 
                />
              ) : (
                <EmptyPageSection />
              )}
            </PageSection>
          )}

        </BookWrapper>
      </MagazineContainer>
    </Layout>
  );
};

/* ---------- 스타일 및 애니메이션 (기존 유지) ---------- */

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
  
  ${responsiveStyle({
    mobile: css` cursor: pointer; `,
    desktop: css` cursor: default; `
  })}
`;

const PageSection = styled.div<{ $disabled: boolean; $isMobile: boolean }>`
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: ${p => (p.$isMobile ? 'inherit' : p.$disabled ? 'default' : 'pointer')};

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
  aspect-ratio: 1 / 1.414;
  display: block;
  object-fit: cover;
  transition: filter 0.3s;
  
  @media (min-width: 768px) {
    ${PageSection}:hover & {
      filter: brightness(0.9);
    }
  }
`;

const EmptyPageSection = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1.414;
  background-color: #f5f5f5;
`;

export default MagazinePage;