import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { getSkillIconComponent } from '../../utils/skill-icon-map.js';

/** 스킬 이름별 간단한 설명 (호버 툴팁용) */
const SKILL_DESCRIPTIONS = {
  HTML: '웹 페이지의 구조를 정의하는 마크업 언어',
  CSS: '레이아웃과 디자인을 담당하는 스타일시트 언어',
  JavaScript: '웹의 동작과 상호작용을 구현하는 프로그래밍 언어',
  React: '컴포넌트 기반으로 UI를 만드는 자바스크립트 라이브러리',
  Figma: 'UI/UX 디자인과 프로토타이핑에 사용하는 디자인 툴',
  'Vue.js': '점진적으로 도입할 수 있는 프론트엔드 프레임워크',
  Angular: '구글이 만든 풀스택 프론트엔드 프레임워크',
  TypeScript: '정적 타입을 지원하는 자바스크립트 상위 집합 언어',
  'Node.js': '자바스크립트로 서버를 만들 수 있게 해주는 런타임',
  Python: '문법이 간결하고 다양한 분야에 쓰이는 프로그래밍 언어',
  Java: '객체지향 언어이자 백엔드에서 널리 쓰이는 언어',
  C: '절차형 프로그래밍의 기반이 되는 저수준 시스템 언어',
  'C++': 'C 언어에 객체지향 개념을 더한 고성능 프로그래밍 언어',
  SQL: '관계형 데이터베이스를 다루는 질의 언어',
  Git: '코드 변경 이력을 관리하는 분산 버전관리 시스템',
  'React Native': 'React로 모바일 앱을 만들 수 있게 해주는 프레임워크',
  MongoDB: '문서 지향 구조를 가진 NoSQL 데이터베이스',
};

/** 숙련도 값을 0~100 사이로 고정한다 */
function clampLevel(value) {
  return Math.min(100, Math.max(0, Number(value) || 0));
}

/**
 * SkillProgressBar 컴포넌트
 * 아이콘 + 기술명 + 숙련도 퍼센트 바 한 줄을 표시한다.
 * 마운트 시 0%에서 실제 숙련도까지 애니메이션되며,
 * 아이콘·이름에 마우스를 올리면 간단한 설명 툴팁을 보여준다.
 * onLevelChange 가 전달되면 퍼센트를 클릭해 숙련도를 직접 수정할 수 있다.
 *
 * Props:
 * @param {string} icon - 아이콘 식별자 (skillsData 의 icon 필드 값) [Required]
 * @param {string} name - 기술명 [Required]
 * @param {number} level - 숙련도(0~100) [Required]
 * @param {string} color - 프로그레스 바 색상 [Required]
 * @param {function} onLevelChange - 숙련도 수정 시 실행할 함수(newLevel) [Optional]
 *
 * Example usage:
 * <SkillProgressBar icon='orange-diamond' name='HTML' level={80} color='#00ffa3' onLevelChange={handleLevelChange} />
 */
function SkillProgressBar({ icon, name, level, color, onLevelChange }) {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [draftLevel, setDraftLevel] = useState(level);
  const IconComponent = getSkillIconComponent(icon);
  const description = SKILL_DESCRIPTIONS[name] ?? `${name} 기술을 사용한 경험이 있습니다.`;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedLevel(level), 100);
    return () => clearTimeout(timer);
  }, [level]);

  const startEditing = () => {
    setDraftLevel(level);
    setIsEditing(true);
  };

  const commitEditing = () => {
    onLevelChange(clampLevel(draftLevel));
    setIsEditing(false);
  };

  return (
    <Tooltip title={description} placement='top' arrow>
      <Box sx={{ cursor: 'default' }}>
        <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between' sx={{ mb: 0.75 }}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Box sx={{ display: 'flex', color }}>
              <IconComponent fontSize='small' />
            </Box>
            <Typography sx={{ color: 'text.primary', fontSize: '0.9rem', fontWeight: 600 }}>
              {name}
            </Typography>
          </Stack>

          {onLevelChange && isEditing ? (
            <TextField
              type='number'
              size='small'
              value={draftLevel}
              onChange={(event) => setDraftLevel(event.target.value)}
              onBlur={commitEditing}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  commitEditing();
                }
              }}
              autoFocus
              sx={{ width: 68 }}
              slotProps={{ htmlInput: { min: 0, max: 100, sx: { py: 0.25, fontSize: '0.8rem', textAlign: 'right' } } }}
            />
          ) : (
            <Typography
              onClick={onLevelChange ? startEditing : undefined}
              sx={{
                color: 'text.disabled',
                fontSize: '0.8rem',
                cursor: onLevelChange ? 'pointer' : 'default',
                '&:hover': onLevelChange ? { color: 'primary.main' } : undefined,
              }}
            >
              {level}%
            </Typography>
          )}
        </Stack>

        <LinearProgress
          variant='determinate'
          value={animatedLevel}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: 'rgba(255, 255, 255, 0.08)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              bgcolor: color,
              transition: 'transform 0.8s ease',
            },
          }}
        />
      </Box>
    </Tooltip>
  );
}

export default SkillProgressBar;
