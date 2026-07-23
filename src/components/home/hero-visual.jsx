import { keyframes } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { primaryAlpha } from '../../utils/shared-styles.js';

/** 점선 원이 천천히 회전하는 애니메이션 */
const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

/** 작은 도형이 위아래로 떠다니는 애니메이션 */
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
`;

/**
 * HeroVisual 컴포넌트
 * Hero 섹션 오른쪽(데스크탑 전용)에 배치되는 CSS 전용 기하학적 장식 구성.
 * 회전하는 점선 원 + 기울어진 코드 브래킷 프레임 + 떠다니는 작은 도형들로 이루어진다.
 * 이미지 없이 순수 CSS 로만 구현해 "개발자다운" 인상을 준다.
 *
 * Props: 없음
 *
 * Example usage:
 * <HeroVisual />
 */
function HeroVisual() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { md: 320, lg: 380 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 회전하는 점선 원 */}
      <Box
        sx={{
          position: 'absolute',
          width: { md: 260, lg: 300 },
          height: { md: 260, lg: 300 },
          borderRadius: '50%',
          border: '1px dashed',
          borderColor: primaryAlpha(0.35),
          animation: `${rotateSlow} 24s linear infinite`,
        }}
      />

      {/* 기울어진 코드 브래킷 프레임 */}
      <Box
        sx={{
          position: 'relative',
          width: { md: 180, lg: 210 },
          height: { md: 180, lg: 210 },
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'primary.main',
          bgcolor: primaryAlpha(0.05),
          boxShadow: `0 0 60px ${primaryAlpha(0.25)}`,
          transform: 'rotate(8deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: { md: '2.4rem', lg: '2.8rem' },
            color: 'primary.main',
            transform: 'rotate(-8deg)',
          }}
        >
          {'</>'}
        </Typography>
      </Box>

      {/* 떠다니는 작은 도형 (사각형) */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 20,
          width: 16,
          height: 16,
          borderRadius: '4px',
          bgcolor: 'primary.main',
          opacity: 0.6,
          animation: `${float} 5s ease-in-out infinite`,
        }}
      />

      {/* 떠다니는 작은 도형 (원) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 4,
          width: 14,
          height: 14,
          borderRadius: '50%',
          border: '2px solid',
          borderColor: 'primary.main',
          opacity: 0.5,
          animation: `${float} 6s ease-in-out infinite`,
          animationDelay: '1s',
        }}
      />
    </Box>
  );
}

export default HeroVisual;
