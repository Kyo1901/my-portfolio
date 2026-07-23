import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

/** 스킬 섹션 보기 모드 옵션 */
const VIEW_MODE_OPTIONS = [
  { value: 'all', label: '전체보기' },
  { value: 'level', label: '숙련도순' },
  { value: 'top3', label: '상위 3개' },
  { value: 'top5', label: '상위 5개' },
];

/** 선택/미선택 상태에 따른 토글 버튼 공통 스타일 */
const toggleButtonSx = {
  fontWeight: 700,
  fontSize: '0.8rem',
  color: 'text.secondary',
  borderColor: 'divider',
  textTransform: 'none',
  '&.Mui-selected': {
    color: 'primary.contrastText',
    bgcolor: 'primary.main',
    '&:hover': { bgcolor: 'primary.dark' },
  },
};

/**
 * SkillFilterBar 컴포넌트
 * 스킬 섹션의 보기 모드(전체보기/숙련도순/상위 3개/상위 5개)를 전환하는 토글 버튼 그룹.
 *
 * Props:
 * @param {string} viewMode - 현재 선택된 보기 모드 [Required]
 * @param {function} onChange - 보기 모드 변경 시 실행할 함수(새 모드 값 전달) [Required]
 *
 * Example usage:
 * <SkillFilterBar viewMode={viewMode} onChange={setViewMode} />
 */
function SkillFilterBar({ viewMode, onChange }) {
  const handleChange = (_event, newMode) => {
    if (newMode) {
      onChange(newMode);
    }
  };

  return (
    <ToggleButtonGroup
      value={viewMode}
      exclusive
      onChange={handleChange}
      size='small'
      sx={{ flexWrap: 'wrap', gap: 1 }}
    >
      {VIEW_MODE_OPTIONS.map((option) => (
        <ToggleButton key={option.value} value={option.value} sx={toggleButtonSx}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default SkillFilterBar;
