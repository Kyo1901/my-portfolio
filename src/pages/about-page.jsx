import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * AboutPage 컴포넌트
 * 상세 자기소개가 들어갈 About Me 페이지(플레이스홀더).
 * 카드 없이 풀-width 영역 + 중앙정렬 텍스트로 구성한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutPage />
 */
function AboutPage() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: { xs: 6, md: 12 },
        px: { xs: 2, md: 3 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.18em' }}
        >
          ABOUT ME
        </Typography>

        {/* 언더바 (네온 그린 포인트) */}
        <Box
          sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 2, mx: 'auto', my: 1.5 }}
        />

        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            fontSize: { xs: '1.8rem', md: '2.6rem' },
            mb: 2,
          }}
        >
          About Me 페이지
        </Typography>

        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.7,
            maxWidth: 680,
            mx: 'auto',
          }}
        >
          About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default AboutPage;
