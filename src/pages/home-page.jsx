import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import HeroBanner from '../components/home/hero-banner.jsx';
import SectionBand from '../components/home/section-band.jsx';
import ProjectCard from '../components/home/project-card.jsx';
import ContactSection from '../components/contact/contact-section.jsx';

/**
 * HomePage 컴포넌트
 * 포트폴리오 메인 페이지.
 * 카드 대신 풀-width 밴드(SectionBand)로 섹션을 구분하고 배경 톤을 번갈아 적용한다.
 * - Hero: 풀-width 히어로 밴드(HeroBanner)
 * - About / Skill Tree / Contact: 텍스트 밴드
 * - Projects: 더미 썸네일 카드 3개 그리드
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */

/** Projects 섹션의 더미 썸네일 카드 데이터 */
const DUMMY_PROJECTS = [
  {
    key: 'p1',
    tag: 'PROJECT 01',
    title: 'Project One',
    description: '대표작 썸네일이 들어갈 자리입니다. 프로젝트 요약을 표시합니다.',
  },
  {
    key: 'p2',
    tag: 'PROJECT 02',
    title: 'Project Two',
    description: '대표작 썸네일이 들어갈 자리입니다. 프로젝트 요약을 표시합니다.',
  },
  {
    key: 'p3',
    tag: 'PROJECT 03',
    title: 'Project Three',
    description: '대표작 썸네일이 들어갈 자리입니다. 프로젝트 요약을 표시합니다.',
  },
];

/** 주요 버튼 공통 스타일 */
const primaryButtonSx = {
  fontWeight: 700,
  color: 'primary.contrastText',
  '&:hover': { bgcolor: 'primary.dark' },
};

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* SECTION 01 · Hero */}
      <HeroBanner />

      {/* SECTION 02 · About Me */}
      <SectionBand
        tone="paper"
        overline="ABOUT ME"
        title="About Me"
        subtitle="여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다."
      >
        <Button variant="contained" color="primary" onClick={() => navigate('/about')} sx={primaryButtonSx}>
          더 알아보기
        </Button>
      </SectionBand>

      {/* SECTION 03 · Skill Tree */}
      <SectionBand
        tone="default"
        overline="SKILL TREE"
        title="Skill Tree"
        subtitle="여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다."
      />

      {/* SECTION 04 · Projects */}
      <SectionBand
        tone="paper"
        overline="PROJECTS"
        title="Projects"
        subtitle="여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다."
      >
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
          {DUMMY_PROJECTS.map((project) => (
            <Grid key={project.key} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard
                tag={project.tag}
                title={project.title}
                description={project.description}
              />
            </Grid>
          ))}
        </Grid>

        <Button variant="contained" color="primary" onClick={() => navigate('/projects')} sx={primaryButtonSx}>
          더 보기
        </Button>
      </SectionBand>

      {/* SECTION 05 · Contact */}
      <SectionBand
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
