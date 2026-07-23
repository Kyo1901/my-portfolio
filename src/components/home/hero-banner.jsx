import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { usePortfolio } from '../../hooks/use-portfolio.js';
import HeroTerminal from './hero-terminal.jsx';
import HeroVisual from './hero-visual.jsx';
import { primaryAlpha } from '../../utils/shared-styles.js';

/** 터치 접근성을 위한 버튼 최소 크기(px) */
const MIN_TOUCH_TARGET = 44;

/** Hero 하단 소셜 링크 목록 (Contact 섹션과 동일한 링크 사용) */
const SOCIAL_LINKS = [
  { key: 'github', icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/Kyo1901' },
  { key: 'linkedin', icon: <LinkedInIcon />, label: 'LinkedIn', href: '#' },
];

/** 최근 작업한 프로젝트가 없을 때 보여줄 기본 명령어 목록 */
const DEFAULT_TERMINAL_LINES = [
  'git commit -m "feat: 아이디어를 서비스로 만들다"',
  'git push origin main',
  'npm run deploy',
];

/** 등장 시 아래에서 위로 살짝 올라오며 페이드인하는 애니메이션 */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

/** 스크롤 유도 화살표가 위아래로 통통 튀는 애니메이션 */
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

/** 주요 CTA 버튼이 은은하게 퍼지는 네온 글로우 펄스 애니메이션 */
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 ${primaryAlpha(0.45)}; }
  50% { box-shadow: 0 0 0 12px ${primaryAlpha(0)}; }
`;

/** 등장 애니메이션 공통 설정(지연시간만 다르게 사용) */
const fadeInSx = (delay) => ({
  animation: `${fadeInUp} 0.7s ease both`,
  animationDelay: delay,
});

/**
 * HeroBanner 컴포넌트
 * Home 최상단의 풀-width Hero 밴드.
 * - 배경: 네온 글로우 + 은은한 격자 패턴(회로 기판 느낌)
 * - 좌: 인사말/이름/역할/헤드라인/터미널 위젯 (순차 페이드인 애니메이션)
 * - 우(데스크탑 전용): CSS 로만 그린 기하학적 장식(HeroVisual)
 * - 하단 중앙: CTA 버튼 + 소셜 링크 + 스크롤 인디케이터를 한 데 모은 액션 클러스터
 * PortfolioContext 의 실제 이름을 사용하며, CTA 버튼과 하단 화살표는 모두 같은 페이지의
 * Projects / Contact / About Me 섹션으로 smooth scroll 이동한다.
 * 모바일(xs)에서는 useMediaQuery 로 CTA 버튼을 전체 너비로 세로 배치하고,
 * 모든 클릭 가능한 요소는 44px 이상의 터치 영역을 확보한다.
 *
 * Props:
 * @param {Array} recentProjects - 최근 작업한 프로젝트 목록 [{ title }] [Optional]
 *
 * Example usage:
 * <HeroBanner recentProjects={featuredProjects} />
 */
function HeroBanner({ recentProjects = [] }) {
  const { aboutMeData } = usePortfolio();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const terminalLines =
    recentProjects.length > 0
      ? recentProjects.map((project) => `git commit -m "feat: ${project.title} 완성"`)
      : DEFAULT_TERMINAL_LINES;

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        minHeight: { xs: '80vh', md: '88vh' },
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, sm: 3, md: 4, lg: 6 },
        bgcolor: 'background.default',
        backgroundImage: [
          // 상단 중앙 네온 글로우
          `radial-gradient(700px circle at 50% 0%, ${primaryAlpha(0.16)}, transparent 60%)`,
          // 우하단 보조 글로우
          `radial-gradient(500px circle at 100% 100%, ${primaryAlpha(0.08)}, transparent 60%)`,
          // 회로 기판 느낌의 은은한 격자 패턴
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 40px)',
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 40px)',
        ].join(', '),
      }}
    >
      <Container maxWidth="lg" disableGutters sx={{ py: { xs: 8, sm: 6, md: 0 } }}>
        <Grid container spacing={{ xs: 5, sm: 5, md: 4, lg: 6 }} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="overline"
                sx={{
                  display: 'block',
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  mb: 2,
                  ...fadeInSx('0s'),
                }}
              >
                안녕하세요
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  color: 'text.primary',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.6rem', md: '3.4rem', lg: '4rem' },
                  lineHeight: { xs: 1.2, md: 1.15 },
                  ...fadeInSx('0.1s'),
                }}
              >
                {aboutMeData.basicInfo.name}
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem' },
                  mb: 2,
                  ...fadeInSx('0.2s'),
                }}
              >
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  {'<'}
                </Box>
                <Box component="span" sx={{ color: 'primary.main' }}>
                  Fullstack Developer
                </Box>
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  {' />'}
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.2rem' },
                  lineHeight: 1.7,
                  maxWidth: 560,
                  mx: { xs: 'auto', md: 0 },
                  mb: 4,
                  ...fadeInSx('0.3s'),
                }}
              >
                아이디어가 실제로 동작하는 서비스가 되는 순간을 만듭니다.
              </Typography>

              <Box sx={{ mt: { xs: 4, md: 5 }, ...fadeInSx('0.4s') }}>
                <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem', letterSpacing: '0.1em', mb: 1.5 }}>
                  지금도 무언가를 만들고 있습니다
                </Typography>
                <HeroTerminal lines={terminalLines} />
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <HeroVisual />
          </Grid>
        </Grid>
      </Container>

      {/* 하단: CTA 버튼 + 소셜 링크 + 스크롤 인디케이터 (클릭 시 다음 섹션으로 smooth scroll) */}
      {/* 바깥 Box: 수평 중앙 정렬 전용(transform: translateX(-50%) 고정) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 32 },
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {/* 안쪽 Box: 페이드인 애니메이션 전용 (translateY 는 여기서만 적용되어 바깥 transform 과 충돌하지 않음) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            px: 2,
            ...fadeInSx('0.6s'),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1.5, sm: 2 },
              width: '100%',
              maxWidth: { xs: 320, sm: 'none' },
              mx: 'auto',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth={isMobile}
              onClick={() => scrollToSection('projects')}
              sx={{
                minHeight: MIN_TOUCH_TARGET,
                fontWeight: 700,
                color: 'primary.contrastText',
                animation: `${pulseGlow} 2.4s ease-in-out infinite`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 24px ${primaryAlpha(0.35)}`,
                  animation: 'none',
                },
                '&:active': { transform: 'translateY(0)' },
              }}
            >
              프로젝트 보기
            </Button>
            <Button
              variant="outlined"
              size="large"
              fullWidth={isMobile}
              onClick={() => scrollToSection('contact')}
              sx={{
                minHeight: MIN_TOUCH_TARGET,
                fontWeight: 700,
                color: 'text.primary',
                borderColor: 'divider',
                transition: 'transform 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  transform: 'translateY(-2px)',
                },
                '&:active': { transform: 'translateY(0)' },
              }}
            >
              연락하기
            </Button>
          </Box>

          <Stack direction="row" spacing={{ xs: 2, sm: 1.5 }}>
            {SOCIAL_LINKS.map((social) => (
              <IconButton
                key={social.key}
                component="a"
                href={social.href}
                target={social.href === '#' ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={social.label}
                sx={{
                  width: MIN_TOUCH_TARGET,
                  height: MIN_TOUCH_TARGET,
                  border: '1px solid',
                  borderColor: 'divider',
                  color: 'text.secondary',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    bgcolor: primaryAlpha(0.08),
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>

          <IconButton
            onClick={() => scrollToSection('about')}
            aria-label="다음 섹션으로 스크롤"
            sx={{
              width: MIN_TOUCH_TARGET,
              height: MIN_TOUCH_TARGET,
              color: 'text.disabled',
              animation: `${bounce} 1.8s ease-in-out infinite`,
              '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroBanner;
