//src/styles/GlobalStyle.ts

import { createGlobalStyle } from 'styled-components';
import Pretendard from '@/assets/fonts/Pretendard.woff2'
import { COLORS } from '@/constants/colors';

const GlobalStyle = createGlobalStyle`
  @font-face {
  color: ${COLORS.black};
    font-family: 'Pretendard';
    src: url(${Pretendard}) format('woff2-variations');
    font-weight: 100 900; 
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
  }
`
export default GlobalStyle;