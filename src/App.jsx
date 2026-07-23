import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from './components/common/nav-bar.jsx';
import HomePage from './pages/home-page.jsx';
import AboutPage from './pages/about-page.jsx';
import ProjectsPage from './pages/projects-page.jsx';
import { PortfolioProvider } from './context/portfolio-provider.jsx';

/**
 * App 컴포넌트
 * - 상단 네비게이션(NavBar) + React Router 라우팅 영역으로 구성
 * - 전체 화면을 사용하는 다크 테마 레이아웃
 * - PortfolioProvider 로 About Me 데이터를 홈 탭과 About Me 탭이 공유
 */
function App() {
  return (
    <PortfolioProvider>
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </Box>
      </Box>
    </PortfolioProvider>
  );
}

export default App;
