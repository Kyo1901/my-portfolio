import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SectionCard from '../components/home/section-card.jsx';

/**
 * HomePage 컴포넌트
 * 포트폴리오 메인 페이지. Hero / About / Skill Tree / Projects / Contact
 * 5개 섹션을 SectionCard 로 구분하여 세로로 배치한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */

/** Home 페이지 섹션 데이터 (텍스트 위주 플레이스홀더) */
const SECTIONS = [
  {
    key: 'hero',
    tag: 'SECTION 01 · HERO',
    title: 'Hero',
    description:
      '여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.',
    isHighlighted: true,
  },
  {
    key: 'about',
    tag: 'SECTION 02 · ABOUT ME',
    title: 'About Me',
    description:
      "여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.",
    action: { label: '더 알아보기', to: '/about' },
  },
  {
    key: 'skill',
    tag: 'SECTION 03 · SKILL TREE',
    title: 'Skill Tree',
    description:
      '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.',
  },
  {
    key: 'projects',
    tag: 'SECTION 04 · PROJECTS',
    title: 'Projects',
    description:
      "여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.",
    action: { label: '더 보기', to: '/projects' },
  },
  {
    key: 'contact',
    tag: 'SECTION 05 · CONTACT',
    title: 'Contact',
    description:
      '여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.',
  },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="md" disableGutters>
        {/* 페이지 인트로 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h1"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 1,
            }}
          >
            My
            <Box component="span" sx={{ color: 'primary.main' }}>
              Portfolio
            </Box>
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.2rem' },
            }}
          >
            네온 그린 다크 테마로 구성한 포트폴리오 템플릿
          </Typography>
        </Box>

        {/* 5개 섹션 카드 */}
        <Stack spacing={{ xs: 3, md: 4 }}>
          {SECTIONS.map((section) => (
            <SectionCard
              key={section.key}
              tag={section.tag}
              title={section.title}
              description={section.description}
              isHighlighted={section.isHighlighted}
            >
              {section.action && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(section.action.to)}
                  sx={{
                    fontWeight: 700,
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  {section.action.label}
                </Button>
              )}
            </SectionCard>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default HomePage;
