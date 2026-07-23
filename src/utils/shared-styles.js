import { alpha } from '@mui/material/styles';
import theme from '../theme.js';

/**
 * primary 색상에 투명도를 적용한 색상값을 반환한다.
 * 여러 컴포넌트에 흩어져 있던 'rgba(0, 255, 163, x)' 매직넘버를 대체하며,
 * theme.js 의 primary 색상이 바뀌면 이 값도 함께 바뀐다.
 *
 * @param {number} opacity - 투명도 (0~1)
 * @returns {string} rgba 색상 문자열
 *
 * Example usage:
 * sx={{ bgcolor: primaryAlpha(0.08) }}
 */
export function primaryAlpha(opacity) {
  return alpha(theme.palette.primary.main, opacity);
}

/** 여러 페이지의 '주요 CTA 버튼(더 알아보기/더 보기 등)'에 공통으로 쓰이는 스타일 */
export const primaryButtonSx = {
  fontWeight: 700,
  color: 'primary.contrastText',
  '&:hover': { bgcolor: 'primary.dark' },
};
