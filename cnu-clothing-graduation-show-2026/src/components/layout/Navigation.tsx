// src/components/layout/Navigation.tsx
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { responsiveStyle } from '@/styles/responsive';
import { COLORS } from '@/constants/colors';

const Navigation = () => {
  const menus = ['About', 'Works', 'Magazine', 'Archive'];
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    setCurrentPath(path);
  }, []);

  return (
    <NavList>
      {menus.map((menu) => {
        const path = menu.toLowerCase();
        const isActive = currentPath === path;

        return (
          <NavItem
            key={menu}
            href={`/${path}`}
            $active={isActive}
          >
            {menu}
          </NavItem>
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

const NavItem = styled.a<{ $active?: boolean }>`
  display: inline-block;
  position: relative;
  text-decoration: none;
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
    transition: transform 0.3s ease, text-weight 0.3s ease;
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

export default Navigation;
