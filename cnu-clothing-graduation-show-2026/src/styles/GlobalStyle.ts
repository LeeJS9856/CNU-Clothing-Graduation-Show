import { createGlobalStyle } from 'styled-components';
import Pretendard from '@/assets/fonts/Pretendard.woff2'
import { COLORS } from '@/constants/colors';
import { BREAKPOINTS } from '@/constants/devices';

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

  body {
    padding: 0;
    // 모바일 마진 수정은 여기서
    margin: 0 16px;
    
    @media (min-width: ${BREAKPOINTS.desktop}px) {
      // 데스크톱 마진 수정은 여기서
      margin: 0 40px;
    }
  }
`
export default GlobalStyle;