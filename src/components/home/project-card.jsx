import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * ProjectCard 컴포넌트
 * Projects 섹션의 더미 썸네일 카드. 상단 썸네일(그라데이션 플레이스홀더) + 제목/설명으로 구성.
 * 치지직식 그리드 카드 느낌(썸네일 중심)을 표현한다.
 *
 * Props:
 * @param {string} title - 프로젝트 제목 [Required]
 * @param {string} description - 프로젝트 짧은 설명 [Required]
 * @param {string} tag - 썸네일 위에 표시할 라벨(예: 'PROJECT 01') [Required]
 *
 * Example usage:
 * <ProjectCard tag="PROJECT 01" title="Project One" description="샘플 설명" />
 */
function ProjectCard({ title, description, tag }) {
  return (
    <Card
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
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'primary.dark',
        },
      }}
    >
      {/* 썸네일 플레이스홀더 (16:9 비율) */}
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '16 / 9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            'linear-gradient(135deg, rgba(0,255,163,0.22) 0%, rgba(14,14,17,0.9) 70%)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          sx={{
            color: 'text.primary',
            fontWeight: 800,
            letterSpacing: '0.15em',
            opacity: 0.85,
            fontSize: { xs: '0.85rem', md: '0.95rem' },
          }}
        >
          {tag}
        </Typography>
      </Box>

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
