import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '@/components/layout/Layout';
import SubNavbar from '@/components/layout/SubNavbar';
import type { ArchiveTabType } from '@/components/layout/SubNavbar';

// 1. 분리한 탭 컴포넌트들 임포트
import ExhibitionTab from './ExhibitionTab';
import FilmTab from './FilmTab';
import GoodsTab from './GoodsTab';

const ArchivePage = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<ArchiveTabType>('Exhibition Views');

  // 2. 현재 탭에 맞는 컴포넌트를 반환하는 함수
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Exhibition Views':
        return <ExhibitionTab />;
      case 'Film':
        return <FilmTab />;
      case 'Goods':
        return <GoodsTab />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <SubNavbar 
        activeTab={activeTab} 
        onTabChange={(tab) => setActiveTab(tab)} 
      />

      {/* 3. 컨텐츠 영역 */}
      <ContentSection>
        {renderTabContent()}
      </ContentSection>
    </Layout>
  );
};

const ContentSection = styled.section`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

export default ArchivePage;
