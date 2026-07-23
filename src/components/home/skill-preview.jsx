import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SkillCard from '../about/skill-card.jsx';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '../../utils/skill-category-colors.js';
import { primaryButtonSx } from '../../utils/shared-styles.js';

/** 주요 버튼 공통 스타일 + 버튼이 항상 내용 크기만큼만 차지하도록 고정 너비 적용 */
const fitContentButtonSx = { ...primaryButtonSx, width: 'fit-content' };

/**
 * SkillPreview 컴포넌트
 * 홈 탭 Skill Tree 섹션 미리보기.
 * 상위 스킬을 아이콘 + 이름 + 숙련도 카드로 보여주고, "전체 스킬 보기" 버튼으로 About Me 탭으로 이동한다.
 *
 * Props:
 * @param {Array} skills - 표시할 스킬 목록 [{ id, icon, name, level, category }] [Required]
 * @param {function} onNavigateToAbout - "전체 스킬 보기" 버튼 클릭 시 실행할 함수 [Required]
 *
 * Example usage:
 * <SkillPreview skills={homeData.skills} onNavigateToAbout={() => navigate('/about')} />
 */
function SkillPreview({ skills, onNavigateToAbout }) {
  return (
    <Stack spacing={4} alignItems='center' sx={{ width: '100%' }}>
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ width: '100%' }}>
        {skills.map((skill) => (
          <Grid key={skill.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <SkillCard skill={skill} color={CATEGORY_COLORS[skill.category] ?? DEFAULT_CATEGORY_COLOR} />
          </Grid>
        ))}
      </Grid>

      <Button variant='contained' color='primary' onClick={onNavigateToAbout} sx={fitContentButtonSx}>
        전체 스킬 보기
      </Button>
    </Stack>
  );
}

export default SkillPreview;
