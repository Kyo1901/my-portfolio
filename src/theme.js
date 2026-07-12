import { createTheme } from '@mui/material/styles';

/**
 * 컬러 팔레트 디자인 시스템(치지직 CHZZK) 기반 MUI 테마
 * - 다크 모드 기준의 네온 그린 포인트 팔레트
 * - index.css 의 CSS 변수와 동일한 값을 MUI palette 로 매핑
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffa3',      // 네온 그린 (CTA·강조)
      light: '#5cffc4',
      dark: '#00cc82',
      contrastText: '#0e0e11',
    },
    secondary: {
      main: '#ff1f3d',      // LIVE 레드 (강조 포인트)
      contrastText: '#ffffff',
    },
    background: {
      default: '#0e0e11',   // 최심층 배경
      paper: '#18191d',     // 카드·패널 표면
    },
    text: {
      primary: '#ffffff',
      secondary: '#b8bcc2',
      disabled: '#6e7278',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
});

export default theme;
