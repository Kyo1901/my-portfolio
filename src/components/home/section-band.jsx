import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * SectionBand 컴포넌트
 * 화면 좌우 끝까지 꽉 차는 풀-width 섹션 밴드.
 * 배경 톤(tone)을 번갈아 지정해 카드 없이 영역만으로 섹션을 구분한다.
 * 중앙 정렬된 헤더(오버라인 + 언더바 + 제목 + 설명) 아래에 children 을 배치한다.
 *
 * Props:
 * @param {string} tone - 배경 톤 'default'(#0E0E11) | 'paper'(#18191D) [Optional, 기본값: 'default']
 * @param {string} overline - 상단 라벨(예: 'ABOUT ME') [Required]
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} subtitle - 섹션 설명 텍스트 [Optional]
 * @param {node} children - 섹션 본문 요소(버튼, 그리드 등) [Optional]
 *
 * Example usage:
 * <SectionBand tone="paper" overline="ABOUT ME" title="About Me" subtitle="설명...">...</SectionBand>
 */
function SectionBand({ tone = 'default', overline, title, subtitle, children }) {
  const bgcolor = tone === 'paper' ? 'background.paper' : 'background.default';

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        bgcolor,
        py: { xs: 6, md: 12 },
        px: { xs: 2, md: 3 },
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg" disableGutters>
        {/* 중앙 정렬 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '0.18em',
              fontSize: '0.8rem',
            }}
          >
            {overline}
          </Typography>

          {/* 언더바 (네온 그린 포인트) */}
          <Box
            sx={{
              width: 40,
              height: 3,
              bgcolor: 'primary.main',
              borderRadius: 2,
              mx: 'auto',
              my: 1.5,
            }}
          />

          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              mb: subtitle ? 1.5 : 0,
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                lineHeight: 1.7,
                maxWidth: 680,
                mx: 'auto',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {children && <Box sx={{ textAlign: 'center' }}>{children}</Box>}
      </Container>
    </Box>
  );
}

export default SectionBand;
