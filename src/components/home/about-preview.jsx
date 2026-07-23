import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BasicInfoCard from '../about/basic-info-card.jsx';
import SkillMiniBadge from './skill-mini-badge.jsx';
import { primaryButtonSx } from '../../utils/shared-styles.js';

/**
 * AboutPreview 컴포넌트
 * 홈 탭 About Me 섹션 미리보기.
 * 왼쪽엔 기본 정보 카드(사진 포함),
 * 오른쪽엔 홈 노출 콘텐츠 요약과 주요 스킬 배지·CTA 버튼을 배치한다.
 *
 * Props:
 * @param {Object} homeData - getHomeData() 결과값 { content, skills, basicInfo } [Required]
 * @param {function} onNavigateToAbout - "더 알아보기" 버튼 클릭 시 실행할 함수 [Required]
 *
 * Example usage:
 * <AboutPreview homeData={getHomeData()} onNavigateToAbout={() => navigate('/about')} />
 */
function AboutPreview({ homeData, onNavigateToAbout }) {
  return (
    <Grid container spacing={{ xs: 4, md: 5 }} alignItems='flex-start'>
      <Grid size={{ xs: 12, md: 5 }}>
        <BasicInfoCard
          name={homeData.basicInfo.name}
          education={homeData.basicInfo.education}
          major={homeData.basicInfo.major}
          experience={homeData.basicInfo.experience}
          photo={homeData.basicInfo.photo}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        <Stack spacing={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          {homeData.content.map((item) => (
            <Box key={item.title}>
              <Typography variant='h6' component='h3' sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>
                {item.title}
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {item.summary}
              </Typography>
            </Box>
          ))}

          <Box>
            <Typography sx={{ color: 'text.disabled', fontSize: '0.8rem', mb: 1.5 }}>
              주요 스킬
            </Typography>
            <Stack
              direction='row'
              spacing={1.5}
              sx={{ flexWrap: 'wrap', gap: 1.5, justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              {homeData.skills.map((skill) => (
                <SkillMiniBadge key={skill.id} skill={skill} />
              ))}
            </Stack>
          </Box>

          <Box>
            <Button variant='contained' color='primary' onClick={onNavigateToAbout} sx={primaryButtonSx}>
              더 알아보기
            </Button>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default AboutPreview;
