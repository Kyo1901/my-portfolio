import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import HeroBanner from '../components/home/hero-banner.jsx';
import SectionBand from '../components/home/section-band.jsx';
import ProjectCard from '../components/home/project-card.jsx';
import AboutPreview from '../components/home/about-preview.jsx';
import SkillPreview from '../components/home/skill-preview.jsx';
import ContactSection from '../components/contact/contact-section.jsx';
import { useProjects } from '../hooks/use-projects.js';
import { usePortfolio } from '../hooks/use-portfolio.js';
import { primaryButtonSx } from '../utils/shared-styles.js';

/**
 * HomePage 컴포넌트
 * 포트폴리오 메인 페이지.
 * 카드 대신 풀-width 밴드(SectionBand)로 섹션을 구분하고 배경 톤을 번갈아 적용한다.
 * - Hero: 풀-width 히어로 밴드(HeroBanner)
 * - About / Skill Tree / Contact: 텍스트 밴드
 * - Projects: Supabase 대표작 썸네일 카드 그리드(최대 4개)
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */

/** Projects 섹션에 표시할 대표작 최대 개수 */
const FEATURED_PROJECT_COUNT = 4;

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projects, isLoading, errorMessage } = useProjects();
  const { getHomeData } = usePortfolio();
  const homeData = getHomeData();
  const featuredProjects = projects.slice(0, FEATURED_PROJECT_COUNT);

  // 다른 페이지에서 NavBar 의 Contact 탭(anchorId 이동)으로 들어온 경우, 해당 섹션으로 스크롤
  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const sectionId = location.hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [location.hash]);

  return (
    <>
      {/* SECTION 01 · Hero */}
      <HeroBanner recentProjects={featuredProjects} />

      {/* SECTION 02 · About Me */}
      <SectionBand id="about" tone="paper" overline="ABOUT ME" title="About Me">
        <AboutPreview homeData={homeData} onNavigateToAbout={() => navigate('/about')} />
      </SectionBand>

      {/* SECTION 03 · Skill Tree */}
      <SectionBand tone="default" overline="SKILL TREE" title="Skill Tree">
        <SkillPreview skills={homeData.skills} onNavigateToAbout={() => navigate('/about')} />
      </SectionBand>

      {/* SECTION 04 · Projects */}
      <SectionBand
        id="projects"
        tone="paper"
        overline="PROJECTS"
        title="Projects"
        subtitle="지금까지 만든 대표 프로젝트입니다."
      >
        {errorMessage && (
          <Alert severity="error" variant="outlined" sx={{ mb: 3, textAlign: 'left' }}>
            {errorMessage}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={28} color="primary" />
          </Box>
        ) : featuredProjects.length === 0 ? (
          !errorMessage && (
            <Typography sx={{ color: 'text.disabled', py: 4, fontSize: '0.9rem' }}>
              아직 등록된 프로젝트가 없습니다.
            </Typography>
          )
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
            {featuredProjects.map((project) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  thumbnailUrl={project.thumbnail_url}
                  detailUrl={project.detail_url}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Button variant="contained" color="primary" onClick={() => navigate('/projects')} sx={primaryButtonSx}>
          더 보기
        </Button>
      </SectionBand>

      {/* SECTION 05 · Contact */}
      <SectionBand
        id="contact"
        tone="default"
        overline="CONTACT"
        title="Contact"
        subtitle="방명록과 연락처입니다. 방문 소감을 남겨주시면 큰 힘이 됩니다."
      >
        <ContactSection />
      </SectionBand>
    </>
  );
}

export default HomePage;
