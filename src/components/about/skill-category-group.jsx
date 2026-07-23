import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SkillProgressBar from './skill-progress-bar.jsx';

/**
 * SkillCategoryGroup 컴포넌트
 * 카테고리 하나(Frontend, Framework, Design 등)에 속한 스킬들을
 * 카테고리 색상으로 구분된 카드 안에 세로로 나열한다.
 *
 * Props:
 * @param {string} category - 카테고리명 [Required]
 * @param {string} color - 카테고리 대표 색상 [Required]
 * @param {Array} skills - 해당 카테고리에 속한 스킬 목록 [Required]
 * @param {function} onLevelChange - 숙련도 수정 시 실행할 함수(skillId, newLevel) [Optional]
 *
 * Example usage:
 * <SkillCategoryGroup category='Frontend' color='#00ffa3' skills={frontendSkills} onLevelChange={handleLevelChange} />
 */
function SkillCategoryGroup({ category, color, skills, onLevelChange }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        height: '100%',
        p: { xs: 2.5, md: 3 },
        bgcolor: 'background.paper',
        borderColor: 'divider',
        borderTop: '3px solid',
        borderTopColor: color,
      }}
    >
      <Stack direction='row' spacing={1} sx={{ mb: 2.5, alignItems: 'center' }}>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }} />
        <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1 }}>
          {category}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {skills.map((skill) => (
          <SkillProgressBar
            key={skill.id}
            icon={skill.icon}
            name={skill.name}
            level={skill.level}
            color={color}
            onLevelChange={onLevelChange ? (newLevel) => onLevelChange(skill.id, newLevel) : undefined}
          />
        ))}
      </Stack>
    </Paper>
  );
}

export default SkillCategoryGroup;
