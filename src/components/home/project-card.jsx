import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ProjectThumbnail from '../projects/project-thumbnail.jsx';

/**
 * ProjectCard 컴포넌트
 * Home Projects 섹션의 대표작 미리보기 카드. 16:9 썸네일 + 제목/설명으로 구성되며,
 * 카드 전체를 클릭하면 배포된 사이트(Live Demo)로 새 탭에서 이동한다.
 *
 * Props:
 * @param {string} title - 프로젝트 제목 [Required]
 * @param {string} description - 프로젝트 짧은 설명 [Required]
 * @param {string} thumbnailUrl - 썸네일 이미지 URL [Required]
 * @param {string} detailUrl - 배포된 사이트 링크(Live Demo) [Required]
 *
 * Example usage:
 * <ProjectCard title="Petlog SNS" description="샘플 설명" thumbnailUrl="https://..." detailUrl="https://..." />
 */
function ProjectCard({ title, description, thumbnailUrl, detailUrl }) {
  return (
    <Card
      component="a"
      href={detailUrl}
      target="_blank"
      rel="noopener noreferrer"
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'primary.main',
        },
      }}
    >
      <ProjectThumbnail
        src={thumbnailUrl}
        alt={`${title} 썸네일`}
        sx={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      />

      <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 2.5 } }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ color: 'text.primary', fontWeight: 700, mb: 0.5 }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.6 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
