import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import BasicInfoCard from '../components/about/basic-info-card.jsx';
import AboutContentAccordion from '../components/about/about-content-accordion.jsx';
import SkillsSection from '../components/about/skills-section.jsx';
import { usePortfolio } from '../hooks/use-portfolio.js';

/**
 * AboutPage 컴포넌트
 * 상세 자기소개가 들어가는 About Me 페이지.
 * PortfolioContext 의 aboutMeData 를 사용해 상단 기본 정보 카드(BasicInfoCard),
 * 콘텐츠 섹션 아코디언(AboutContentAccordion), 스킬 섹션(SkillsSection)을 구성한다.
 * 여기서 수정한 콘텐츠·숙련도는 Context 를 통해 홈 탭에도 즉시 반영된다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutPage />
 */
function AboutPage() {
  const { aboutMeData, updateSectionContent, updateSkillLevel } = usePortfolio();

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 3 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth='md' disableGutters>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant='overline'
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.18em' }}
          >
            ABOUT ME
          </Typography>

          <Box
            sx={{ width: 40, height: 3, bgcolor: 'primary.main', borderRadius: 2, mx: 'auto', my: 1.5 }}
          />

          <Typography
            variant='h2'
            component='h1'
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.6rem' },
            }}
          >
            About Me
          </Typography>
        </Box>

        <Stack spacing={{ xs: 3, md: 4 }}>
          <BasicInfoCard
            name={aboutMeData.basicInfo.name}
            education={aboutMeData.basicInfo.education}
            major={aboutMeData.basicInfo.major}
            experience={aboutMeData.basicInfo.experience}
            photo={aboutMeData.basicInfo.photo}
          />

          <AboutContentAccordion sections={aboutMeData.sections} onUpdateContent={updateSectionContent} />

          <SkillsSection skills={aboutMeData.skills} onLevelChange={updateSkillLevel} />
        </Stack>
      </Container>
    </Box>
  );
}

export default AboutPage;
