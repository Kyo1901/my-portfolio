import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SkillCategoryGroup from './skill-category-group.jsx';
import SkillCard from './skill-card.jsx';
import SkillFilterBar from './skill-filter-bar.jsx';
import { sortSkillsByLevel, getTopSkills } from '../../utils/skill-utils.js';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '../../utils/skill-category-colors.js';

/** 스킬 목록을 카테고리별로 묶고, 카테고리 평균 숙련도가 높은 순으로 정렬한다 */
function groupByCategory(skills) {
  const grouped = skills.reduce((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([category, categorySkills]) => {
      const averageLevel =
        categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
      return { category, skills: categorySkills, averageLevel };
    })
    .sort((a, b) => b.averageLevel - a.averageLevel);
}

/**
 * SkillsSection 컴포넌트
 * About Me 페이지의 스킬 섹션.
 * 카테고리별로 그룹핑된 반응형 그리드(모바일 1열/태블릿 2열/데스크탑 3열)로
 * 아이콘·기술명·숙련도 바를 보여준다.
 * 상단 필터 버튼(전체보기/숙련도순/상위 3개/상위 5개)으로 보기 모드를 전환할 수 있고,
 * 퍼센트를 클릭해 숙련도를 직접 수정하면 onLevelChange 로 전달되어 홈 탭에도 반영된다.
 *
 * Props:
 * @param {Array} skills - 스킬 목록 [{ id, icon, name, level, category }] [Required]
 * @param {function} onLevelChange - 숙련도 수정 시 실행할 함수(skillId, newLevel) [Required]
 *
 * Example usage:
 * <SkillsSection skills={aboutMeData.skills} onLevelChange={updateSkillLevel} />
 */
function SkillsSection({ skills, onLevelChange }) {
  const [viewMode, setViewMode] = useState('all');

  const categoryGroups = groupByCategory(skills);
  const flatSkills =
    viewMode === 'level'
      ? sortSkillsByLevel(skills)
      : viewMode === 'top3'
        ? getTopSkills(skills, 3)
        : viewMode === 'top5'
          ? getTopSkills(skills, 5)
          : null;

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
        <Typography
          variant='overline'
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.18em' }}
        >
          SKILLS
        </Typography>

        <Box
          sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 2, mx: 'auto', my: 1.5 }}
        />

        <Typography
          variant='h4'
          component='h2'
          sx={{ color: 'text.primary', fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' } }}
        >
          Skills
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 3, md: 4 } }}>
        <SkillFilterBar viewMode={viewMode} onChange={setViewMode} />
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {flatSkills
          ? flatSkills.map((skill) => (
              <Grid key={skill.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <SkillCard
                  skill={skill}
                  color={CATEGORY_COLORS[skill.category] ?? DEFAULT_CATEGORY_COLOR}
                  onLevelChange={(newLevel) => onLevelChange(skill.id, newLevel)}
                />
              </Grid>
            ))
          : categoryGroups.map(({ category, skills: categorySkills }) => (
              <Grid key={category} size={{ xs: 12, sm: 6, lg: 4 }}>
                <SkillCategoryGroup
                  category={category}
                  color={CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR}
                  skills={categorySkills}
                  onLevelChange={onLevelChange}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}

export default SkillsSection;
