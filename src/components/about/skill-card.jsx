import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import SkillProgressBar from './skill-progress-bar.jsx';

/**
 * SkillCard 컴포넌트
 * 카테고리 그룹 없이 스킬 하나만 보여주는 카드.
 * 숙련도순 / 상위 N개 보기 모드에서 사용한다.
 *
 * Props:
 * @param {Object} skill - 스킬 객체 { id, icon, name, level, category } [Required]
 * @param {string} color - 카테고리 대표 색상 [Required]
 * @param {function} onLevelChange - 숙련도 수정 시 실행할 함수(newLevel) [Optional]
 *
 * Example usage:
 * <SkillCard skill={skill} color='#00ffa3' onLevelChange={handleLevelChange} />
 */
function SkillCard({ skill, color, onLevelChange }) {
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
      <Chip
        label={skill.category}
        size='small'
        variant='outlined'
        sx={{ mb: 2, color: 'text.secondary', borderColor: 'divider' }}
      />
      <SkillProgressBar
        icon={skill.icon}
        name={skill.name}
        level={skill.level}
        color={color}
        onLevelChange={onLevelChange}
      />
    </Paper>
  );
}

export default SkillCard;
