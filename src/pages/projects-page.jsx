import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ProjectListCard from '../components/projects/project-list-card.jsx';
import { useProjects } from '../hooks/use-projects.js';

/**
 * ProjectsPage 컴포넌트
 * 포트폴리오 작품 목록 페이지. Supabase projects 테이블에서 게시된 프로젝트를
 * 가로 긴 리스트 카드 형태로 불러와 표시한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsPage />
 */
function ProjectsPage() {
  const { projects, isLoading, errorMessage } = useProjects();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '70vh',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 3 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.18em' }}
          >
            PROJECTS
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
            Projects
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
            지금까지 만든 프로젝트들입니다.
          </Typography>
        </Box>

        {errorMessage && (
          <Alert severity="error" variant="outlined" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress size={32} color="primary" />
          </Box>
        ) : projects.length === 0 ? (
          !errorMessage && (
            <Typography sx={{ color: 'text.disabled', textAlign: 'center', py: 6, fontSize: '0.95rem' }}>
              아직 등록된 프로젝트가 없습니다.
            </Typography>
          )
        ) : (
          <Stack spacing={{ xs: 2.5, md: 3 }}>
            {projects.map((project) => (
              <ProjectListCard
                key={project.id}
                title={project.title}
                description={project.description}
                techStack={project.tech_stack}
                projectType={project.project_type}
                detailUrl={project.detail_url}
                thumbnailUrl={project.thumbnail_url}
              />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default ProjectsPage;
