import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ProjectThumbnail from './project-thumbnail.jsx';
import { getGithubRepoUrl } from '../../utils/github-url.js';
import { primaryAlpha } from '../../utils/shared-styles.js';

/** 썸네일 영역 공통 크기(반응형) */
const thumbnailSx = {
  width: { xs: '100%', md: 300 },
  height: { xs: 220, md: 300 },
  flexShrink: 0,
  borderBottom: { xs: '1px solid', md: 'none' },
  borderRight: { xs: 'none', md: '1px solid' },
  borderColor: 'divider',
  bgcolor: 'background.default',
};

/**
 * ProjectListCard 컴포넌트
 * Projects 탭의 가로 긴 리스트 카드. 왼쪽(데스크톱)/위(모바일)에 1:1 썸네일,
 * 나머지 영역에 제목·설명·기술 스택·Live Demo/GitHub 버튼을 배치한다.
 *
 * Props:
 * @param {string} title - 프로젝트 제목 [Required]
 * @param {string} description - 프로젝트 한 줄 설명 [Required]
 * @param {Array} techStack - 기술 스택 목록 [Required]
 * @param {string} projectType - 개인/팀 여부 [Required]
 * @param {string} detailUrl - 배포된 사이트 링크 (Live Demo) [Required]
 * @param {string} thumbnailUrl - 썸네일 이미지 URL [Required]
 *
 * Example usage:
 * <ProjectListCard title="Petlog SNS" description="..." techStack={['React']} projectType="개인" detailUrl="https://..." thumbnailUrl="https://..." />
 */
function ProjectListCard({ title, description, techStack, projectType, detailUrl, thumbnailUrl }) {
  const githubUrl = getGithubRepoUrl(detailUrl);

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: `0 0 0 1px ${primaryAlpha(0.4)}, 0 0 24px ${primaryAlpha(0.25)}`,
        },
      }}
    >
      {/* 썸네일 (1:1, 300x300) */}
      <ProjectThumbnail src={thumbnailUrl} alt={`${title} 썸네일`} sx={thumbnailSx} />

      {/* 본문 */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2.5, md: 3.5 },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6" component="h3" sx={{ color: 'text.primary', fontWeight: 700 }}>
            {title}
          </Typography>
          <Chip
            label={projectType}
            size="small"
            variant="outlined"
            sx={{ color: 'text.secondary', borderColor: 'divider' }}
          />
        </Stack>

        <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.6, mb: 2 }}>
          {description}
        </Typography>

        <Typography sx={{ color: 'primary.main', fontSize: '0.85rem', fontWeight: 500, mb: 3 }}>
          {techStack.join(' · ')}
        </Typography>

        <Stack direction="row" spacing={1.5} sx={{ mt: 'auto' }}>
          <Button
            component="a"
            href={detailUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            startIcon={<LaunchIcon />}
            sx={{
              fontWeight: 700,
              color: 'primary.contrastText',
              transition: 'transform 0.15s ease',
              '&:hover': { bgcolor: 'primary.dark' },
              '&:active': { transform: 'scale(0.96)' },
            }}
          >
            Live Demo
          </Button>

          {githubUrl && (
            <Button
              component="a"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              color="primary"
              startIcon={<GitHubIcon />}
              sx={{
                fontWeight: 700,
                transition: 'transform 0.15s ease',
                '&:active': { transform: 'scale(0.96)' },
              }}
            >
              GitHub
            </Button>
          )}
        </Stack>
      </Box>
    </Card>
  );
}

export default ProjectListCard;
