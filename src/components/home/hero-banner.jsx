import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * HeroBanner 컴포넌트
 * Home 최상단의 풀-width Hero 밴드.
 * 어두운 배경 위 상단 중앙 네온 글로우 + 중앙 정렬 텍스트(인사말/제목/소개/CTA)로 구성한다.
 *
 * Props: 없음 (플레이스홀더 텍스트 고정)
 *
 * Example usage:
 * <HeroBanner />
 */
function HeroBanner() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        minHeight: { xs: '80vh', md: '88vh' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: { xs: 2, md: 3 },
        bgcolor: 'background.default',
        // 상단 중앙 네온 글로우
        backgroundImage:
          'radial-gradient(700px circle at 50% 0%, rgba(0,255,163,0.16), transparent 60%)',
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Typography
          variant="overline"
          sx={{
            display: 'block',
            color: 'primary.main',
            fontWeight: 700,
            letterSpacing: '0.2em',
            mb: 2,
          }}
        >
          안녕하세요
        </Typography>

        <Typography
          variant="h1"
          sx={{
            color: 'text.primary',
            fontWeight: 800,
            fontSize: { xs: '2.2rem', md: '3.6rem' },
            lineHeight: 1.2,
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
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.7,
            maxWidth: 620,
            mx: 'auto',
            mb: 4,
          }}
        >
          여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
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
            프로젝트 보기
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
      </Container>

      {/* 하단 스크롤 인디케이터 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 32 },
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'text.disabled',
        }}
      >
        <KeyboardArrowDownIcon />
      </Box>
    </Box>
  );
}

export default HeroBanner;
