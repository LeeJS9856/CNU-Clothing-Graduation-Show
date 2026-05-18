import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Layout from '@/components/layout/Layout';

// 샘플 이미지들 (실제 매거진 이미지 경로로 교체하세요)
const MAGAZINE_PAGES = [
  'https://picsum.photos/id/10/800/1131', // 1페이지 (A4 비율)
  'https://picsum.photos/id/20/800/1131', // 2페이지
  'https://picsum.photos/id/30/800/1131', // 3페이지
  'https://picsum.photos/id/40/800/1131', // 4페이지
  'https://picsum.photos/id/50/800/1131', // 5페이지
  'https://picsum.photos/id/60/800/1131', // 6페이지
];

const MagazinePage = (): React.JSX.Element => {
  // 현재 왼쪽 페이지의 인덱스 (0, 2, 4...)
  const [currentPage, setCurrentPage] = useState(0);
  // 애니메이션 트리거를 위한 키 값
  const [animKey, setAnimKey] = useState(0);

  const totalPages = MAGAZINE_PAGES.length;

  const handleNext = () => {
    if (currentPage + 2 < totalPages) {
      setCurrentPage(currentPage + 2);
      setAnimKey(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage - 2 >= 0) {
      setCurrentPage(currentPage - 2);
      setAnimKey(prev => prev + 1);
    }
  };

  return (
    <Layout>
      <MagazineContainer>
        <BookWrapper key={animKey}>
          {/* 왼쪽 페이지 (이전 버튼 역할) */}
          <PageSection onClick={handlePrev} $disabled={currentPage === 0}>
            <PageImage 
              src={MAGAZINE_PAGES[currentPage]} 
              alt={`Page ${currentPage + 1}`} 
            />
          </PageSection>

          {/* 오른쪽 페이지 (다음 버튼 역할) */}
          <PageSection onClick={handleNext} $disabled={currentPage + 2 >= totalPages}>
            <PageImage 
              src={MAGAZINE_PAGES[currentPage + 1]} 
              alt={`Page ${currentPage + 2}`} 
            />
          </PageSection>
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
  min-height: calc(100vh - 100px);
`;

const BookWrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 1400px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  animation: ${fadeIn} 0.6s ease-out;
`;

const PageSection = styled.div<{ $disabled: boolean }>`
  flex: 1;
  position: relative;
  cursor: ${p => p.$disabled ? 'default' : 'pointer'};
  overflow: hidden;
  
  /* 페이지 중앙 가름선 효과 */
  &:first-child {
    border-right: 1px solid rgba(0,0,0,0.1);
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
    filter: brightness(0.9);
  }
`;

export default MagazinePage;
