import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getSkillIconComponent } from '../../utils/skill-icon-map.js';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '../../utils/skill-category-colors.js';

/**
 * SkillMiniBadge 컴포넌트
 * 홈 탭 미리보기에서 스킬 하나를 아이콘 + 이름의 작은 알약 배지로 보여준다.
 *
 * Props:
 * @param {Object} skill - 스킬 객체 { icon, name, category } [Required]
 *
 * Example usage:
 * <SkillMiniBadge skill={skill} />
 */
function SkillMiniBadge({ skill }) {
  const IconComponent = getSkillIconComponent(skill.icon);
  const color = CATEGORY_COLORS[skill.category] ?? DEFAULT_CATEGORY_COLOR;

  return (
    <Stack
      direction='row'
      spacing={0.75}
      alignItems='center'
      sx={{
        px: 1.5,
        py: 0.75,
        borderRadius: 999,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ display: 'flex', color }}>
        <IconComponent fontSize='small' />
      </Box>
      <Typography sx={{ color: 'text.primary', fontSize: '0.85rem', fontWeight: 600 }}>
        {skill.name}
      </Typography>
    </Stack>
  );
}

export default SkillMiniBadge;
