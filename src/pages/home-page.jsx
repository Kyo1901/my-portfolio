import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HeroBanner from '../components/home/hero-banner.jsx';
import SectionCard from '../components/home/section-card.jsx';
import ProjectCard from '../components/home/project-card.jsx';

/**
 * HomePage 컴포넌트
 * 포트폴리오 메인 페이지.
 * - Hero: 와이드 배너(HeroBanner)
 * - About / Skill Tree / Contact: 텍스트 섹션 카드(SectionCard)
 * - Projects: 더미 썸네일 카드 3개를 그리드로 배치(ProjectCard)
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */

/** About / Skill Tree 텍스트 섹션 데이터 */
const TEXT_SECTIONS = [
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
];

/** Projects 섹션의 더미 썸네일 카드 데이터 */
const DUMMY_PROJECTS = [
  {
    key: 'p1',
    tag: 'PROJECT 01',
    title: 'Project One',
    description: '대표작 썸네일이 들어갈 자리입니다. 프로젝트 요약을 표시합니다.',
  },
  {
    key: 'p2',
    tag: 'PROJECT 02',
    title: 'Project Two',
    description: '대표작 썸네일이 들어갈 자리입니다. 프로젝트 요약을 표시합니다.',
  },
  {
    key: 'p3',
    tag: 'PROJECT 03',
    title: 'Project Three',
    description: '대표작 썸네일이 들어갈 자리입니다. 프로젝트 요약을 표시합니다.',
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
      <Container maxWidth="lg" disableGutters>
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
            sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.2rem' } }}
          >
            네온 그린 다크 테마로 구성한 포트폴리오 템플릿
          </Typography>
        </Box>

        <Stack spacing={{ xs: 3, md: 4 }}>
          {/* SECTION 01 · Hero (와이드 배너) */}
          <HeroBanner />

          {/* SECTION 02~03 · 텍스트 섹션 */}
          {TEXT_SECTIONS.map((section) => (
            <SectionCard
              key={section.key}
              tag={section.tag}
              title={section.title}
              description={section.description}
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

          {/* SECTION 04 · Projects (썸네일 카드 그리드) */}
          <SectionCard
            tag="SECTION 04 · PROJECTS"
            title="Projects"
            description="여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다."
          >
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {DUMMY_PROJECTS.map((project) => (
                <Grid key={project.key} size={{ xs: 12, sm: 6, md: 4 }}>
                  <ProjectCard
                    tag={project.tag}
                    title={project.title}
                    description={project.description}
                  />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/projects')}
                sx={{
                  fontWeight: 700,
                  color: 'primary.contrastText',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                더 보기
              </Button>
            </Box>
          </SectionCard>

          {/* SECTION 05 · Contact */}
          <SectionCard
            tag="SECTION 05 · CONTACT"
            title="Contact"
            description="여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다."
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default HomePage;
