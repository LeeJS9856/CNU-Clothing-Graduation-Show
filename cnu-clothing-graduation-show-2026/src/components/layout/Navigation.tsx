// src/components/layout/Navigation.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import { COLORS } from '@/constants/colors';

type MenuItem = {
  label: string;
  path: string;
  subMenu?: { label: string; path: string }[];
};

const MENUS: MenuItem[] = [
  { label: 'About', path: '/about' },
  {
    label: 'Works',
    path: '/works',
    subMenu: [
      { label: '브랜딩', path: '/works/branding' },
      { label: '매거진', path: '/works/magazine' },
      { label: '의복구성', path: '/works/clothing/real' },
      { label: '전통복식', path: '/works/traditional' },
      { label: '패션디자인', path: '/works/fashion-design' },
      { label: '스마트 텍스타일', path: '/works/smart-textile' },
    ],
  },
  { label: 'Magazine', path: '/magazine' },
  { label: 'Archive', path: '/archive' },
];

const Navigation = () => {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState('');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // 현재 경로가 해당 메뉴(또는 그 하위)에 속하는지 판단
  const isMenuActive = (menu: MenuItem) => {
    if (currentPath === menu.path) return true;
    if (menu.subMenu) {
      // /works 또는 /works/... 모두 Works 메뉴를 활성화
      return currentPath.startsWith(menu.path);
    }
    return false;
  };

  const handleNavigate = (path: string) => {
    setOpenMenu(null);
    navigate(path);
  };

  return (
    <NavList>
      {MENUS.map((menu) => {
        const isActive = isMenuActive(menu);
        const hasSub = !!menu.subMenu;
        const isOpen = openMenu === menu.label;

        return (
          <NavItemWrapper
            key={menu.label}
            onMouseEnter={() => hasSub && setOpenMenu(menu.label)}
            onMouseLeave={() => hasSub && setOpenMenu(null)}
          >
            <NavItem
              $active={isActive}
              onClick={() => handleNavigate(menu.path)}
            >
              {menu.label}
            </NavItem>

            {hasSub && (
              <Dropdown $isOpen={isOpen}>
                {menu.subMenu!.map((sub) => (
                  <DropdownItem
                    key={sub.label}
                    onClick={() => handleNavigate(sub.path)}
                  >
                    {sub.label}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </NavItemWrapper>
        );
      })}
    </NavList>
  );
};

const NavList = styled.nav`
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;

  ${responsiveStyle({
    mobile: css`gap: 12px;`,
    desktop: css`gap: 24px;`,
  })}
`;

/* hover 컨테이너: NavItem과 Dropdown을 같은 hover 영역으로 묶음 */
const NavItemWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  /* 아래쪽으로 약간 여유를 둬서 드롭다운과 마우스가 끊기지 않게 함 */
  padding-bottom: 12px;
  margin-bottom: -12px;
`;

const NavItem = styled.span<{ $active?: boolean }>`
  display: inline-block;
  position: relative;
  cursor: pointer;
  color: ${COLORS.primary};
  font-weight: 400;
  transition: color 0.2s, font-weight 0.2s;

  ${responsiveStyle({
    mobile: css`font-size: 15px;`,
    desktop: css`font-size: 20px;`,
  })}

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    width: 120%;
    height: 2px;
    background-color: ${COLORS.brand.primary};

    bottom: 0;
    transform: translate(-50%, 10px)
               scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  ${({ $active }) =>
    $active &&
    css`
      font-weight: 700;
      color: ${COLORS.brand.primary};
    `}

  &:hover {
    font-weight: 700;
  }
`;

const Dropdown = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  list-style: none;
  margin: 0;
  padding: 12px 20px;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.gray.light};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 140px;
  z-index: 50;

  /* 부드러운 등장 애니메이션 */
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: translateX(-50%) translateY(${({ $isOpen }) => ($isOpen ? '0' : '-6px')});
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
`;

const DropdownItem = styled.li`
  color: ${COLORS.brand.primary};
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
  transition: opacity 0.15s ease, font-weight 0.15s ease;

  ${responsiveStyle({
    mobile: css`font-size: 13px;`,
    desktop: css`font-size: 15px;`,
  })}

  &:hover {
    font-weight: 700;
    opacity: 0.8;
  }
`;

export default Navigation;