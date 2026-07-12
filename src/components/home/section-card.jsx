import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * SectionCard 컴포넌트
 * Home 페이지의 각 섹션(Hero, About, Skill, Projects, Contact)을 카드 형태로 렌더링한다.
 * 상단 태그(번호/이름) + 제목 + 설명 텍스트로 구성되며, 좌측에 포인트 컬러 바를 둔다.
 *
 * Props:
 * @param {string} tag - 섹션 상단에 표시할 짧은 라벨(예: 'SECTION 01') [Required]
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} description - 섹션 설명(플레이스홀더) 텍스트 [Required]
 * @param {boolean} isHighlighted - 강조 섹션 여부(Hero 등 배경 강조) [Optional, 기본값: false]
 * @param {node} children - 버튼 등 추가 요소 [Optional]
 *
 * Example usage:
 * <SectionCard tag="SECTION 01" title="Hero" description="여기는 Hero 섹션입니다." isHighlighted />
 */
function SectionCard({ tag, title, description, isHighlighted = false, children }) {
  return (
    <Card
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        // 좌측 포인트 컬러 바 (네온 그린 - 3~5% 이내 강조 원칙 준수)
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          bgcolor: 'primary.main',
        },
        // 강조 섹션은 살짝 그린 톤의 그라데이션 배경
        ...(isHighlighted && {
          backgroundImage:
            'linear-gradient(135deg, rgba(0,255,163,0.10) 0%, rgba(24,25,29,0) 55%)',
        }),
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'primary.dark',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography
          variant="overline"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            letterSpacing: '0.12em',
          }}
        >
          {tag}
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            mt: 0.5,
            mb: 1.5,
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: 'text.secondary',
            lineHeight: 1.7,
            fontSize: { xs: '0.95rem', md: '1.05rem' },
          }}
        >
          {description}
        </Typography>

        {children && <Box sx={{ mt: 3 }}>{children}</Box>}
      </CardContent>
    </Card>
  );
}

export default SectionCard;
