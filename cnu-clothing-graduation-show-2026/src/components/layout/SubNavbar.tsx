import styled from 'styled-components';
import { COLORS } from '@/constants/colors';

// 사용할 수 있는 탭 메뉴 타입 정의
export type ArchiveTabType = 'Exhibition Views' | 'Film' | 'Goods';

interface SubNavbarProps {
  activeTab: ArchiveTabType;
  onTabChange: (tab: ArchiveTabType) => void;
}

const SubNavbar = ({ activeTab, onTabChange }: SubNavbarProps) => {
  const navItems: ArchiveTabType[] = ['Exhibition Views', 'Film', 'Goods'];

  return (
    <SubNavbarWrapper>
      <NavList>
        {navItems.map((item) => (
          <NavItem
            key={item}
            $isActive={activeTab === item}
            onClick={() => onTabChange(item)}
          >
            {item}
          </NavItem>
        ))}
      </NavList>
    </SubNavbarWrapper>
  );
};

const SubNavbarWrapper = styled.nav`
  margin: 0px auto;
  padding: 4px 16px;
  background-color: ${COLORS.gray.light};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
`;

const NavList = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li<{ $isActive: boolean }>`
  font-size: 0.75rem;
  color: ${COLORS.primary};
  cursor: pointer;
  letter-spacing: 0.01em;
  
  /* 폰트 굵기 변화 애니메이션 */
  font-weight: ${(props) => (props.$isActive ? '800' : '500')};
  transition: all 0.2s ease-in-out;
  
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    font-weight: 800;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default SubNavbar;
