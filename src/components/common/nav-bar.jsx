import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

/**
 * NavBar 컴포넌트
 * 상단 고정 네비게이션 바. Home / About Me / Projects 3개 탭 제공.
 * 현재 경로에 맞춰 활성 탭을 표시하고, 클릭 시 라우터로 이동한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <NavBar />
 */

/** 네비게이션 탭 정의 (path 는 라우터 경로와 일치) */
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 경로와 일치하는 탭 인덱스 (없으면 Home)
  const currentIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.path === location.pathname),
  );

  const handleChange = (event, newValue) => {
    navigate(NAV_ITEMS[newValue].path);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'rgba(0, 255, 163, 0.25)',
        boxShadow: '0 2px 16px rgba(0, 0, 0, 0.6)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: { xs: 1, sm: 0 },
            py: { xs: 1, sm: 0 },
          }}
        >
          <Typography
            variant="h6"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              letterSpacing: '-0.02em',
              cursor: 'pointer',
              userSelect: 'none',
              '&:hover': { opacity: 0.85 },
            }}
          >
            My
            <Box component="span" sx={{ color: 'primary.main' }}>
              Portfolio
            </Box>
          </Typography>

          <Tabs
            value={currentIndex}
            onChange={handleChange}
            textColor="inherit"
            slotProps={{ indicator: { sx: { bgcolor: 'primary.main', height: 3 } } }}
            sx={{
              '& .MuiTab-root': {
                color: 'text.secondary',
                fontWeight: 600,
                minWidth: { xs: 80, sm: 100 },
              },
              '& .Mui-selected': {
                color: 'primary.main',
              },
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Tab key={item.path} label={item.label} />
            ))}
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
