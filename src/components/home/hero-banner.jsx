import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

/**
 * HeroBanner 컴포넌트
 * Home 최상단의 와이드 배너형 Hero 영역.
 * 큰 가로 비주얼(그라데이션 + 네온 글로우) 위에 이름/소개 플레이스홀더와 CTA 를 배치한다.
 *
 * Props: 없음 (플레이스홀더 텍스트 고정)
 *
 * Example usage:
 * <HeroBanner />
 */
function HeroBanner() {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 10 },
        minHeight: { xs: 280, md: 380 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // 와이드 배너 비주얼: 대각선 그린 그라데이션 + 우측 상단 네온 글로우
        backgroundImage:
          'radial-gradient(600px circle at 85% 15%, rgba(0,255,163,0.18), transparent 55%), ' +
          'linear-gradient(135deg, rgba(0,255,163,0.10) 0%, rgba(24,25,29,0) 45%)',
      }}
    >
      <Chip
        label="SECTION 01 · HERO"
        size="small"
        sx={{
          alignSelf: 'flex-start',
          mb: 2,
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: 'primary.main',
          bgcolor: 'rgba(0,255,163,0.10)',
          border: '1px solid',
          borderColor: 'rgba(0,255,163,0.35)',
        }}
      />

      <Typography
        variant="h1"
        sx={{
          color: 'text.primary',
          fontWeight: 800,
          fontSize: { xs: '2.2rem', md: '3.6rem' },
          lineHeight: 1.15,
          mb: 2,
        }}
      >
        Your
        <Box component="span" sx={{ color: 'primary.main' }}>
          Name
        </Box>
      </Typography>

      <Typography
        sx={{
          color: 'text.secondary',
          fontSize: { xs: '1rem', md: '1.25rem' },
          lineHeight: 1.7,
          maxWidth: 640,
          mb: 4,
        }}
      >
        여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            fontWeight: 700,
            color: 'primary.contrastText',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          포트폴리오 보기
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            borderColor: 'divider',
            '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
          }}
        >
          연락하기
        </Button>
      </Box>
    </Box>
  );
}

export default HeroBanner;
