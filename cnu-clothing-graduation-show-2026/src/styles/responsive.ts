import { css } from 'styled-components';
import { BREAKPOINTS } from '@/constants/devices';
import type { ResponsiveValue } from '@/types/devices';

export const responsive = <T extends string | number>(
  property: string,
  values: ResponsiveValue<T>
) => css`
  ${property}: ${values.mobile};

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    ${property}: ${values.desktop};
  }
`;

export const responsiveStyle = (styles: {
  mobile: ReturnType<typeof css>;
  desktop: ReturnType<typeof css>;
}) => css`
  ${styles.mobile}

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    ${styles.desktop}
  }
`;

export const responsiveCss = (styles: {
  mobile: ReturnType<typeof css>;
  desktop: ReturnType<typeof css>;
}) => css`
  ${styles.mobile}

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    ${styles.desktop}
  }
`;
