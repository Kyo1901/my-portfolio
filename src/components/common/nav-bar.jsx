import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { primaryAlpha } from '../../utils/shared-styles.js';

/**
 * NavBar 컴포넌트
 * 상단 고정 네비게이션 바. Home / About Me / Projects / Contact 4개 탭 제공.
 * 현재 경로에 맞춰 활성 탭을 표시하고, 클릭 시 라우터로 이동한다. Contact 는 페이지가 아닌
 * Home 내 앵커(#contact)로, Home 이 아닌 곳에서 클릭하면 Home 이동 후 해당 섹션으로 스크롤한다.
 * 스크롤 시 반투명 + 블러(glassmorphism) 효과와 함께 높이가 살짝 줄어들고,
 * 모바일에서는 햄버거 버튼으로 여는 슬라이드인 메뉴(Drawer)를 사용한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <NavBar />
 */

/** 네비게이션 탭 정의 (path 는 라우터 경로와 일치, anchorId 가 있으면 Home 내 해당 id 로 스크롤 이동) */
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/', anchorId: 'contact' },
];

/** 헤더가 축소·블러 효과로 전환되기 시작하는 스크롤 위치(px) */
const SCROLL_THRESHOLD = 24;

/** 모바일 메뉴 항목이 오른쪽에서 순서대로 나타나는 애니메이션 */
const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
`;

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 현재 경로와 일치하는 탭 인덱스 (없으면 Home)
  const currentIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.path === location.pathname),
  );

  /** anchorId 가 있는 항목(Contact)은 Home 이면 바로 스크롤, 아니면 Home 으로 이동 후 해시로 스크롤 위치를 전달 */
  const goToNavItem = (item) => {
    if (!item.anchorId) {
      navigate(item.path);
      return;
    }

    if (location.pathname === '/') {
      document.getElementById(item.anchorId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`${item.path}#${item.anchorId}`);
    }
  };

  const handleChange = (event, newValue) => {
    goToNavItem(NAV_ITEMS[newValue]);
  };

  const handleNavigateFromMenu = (item) => {
    goToNavItem(item);
    setIsMenuOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: isScrolled ? 'rgba(24, 25, 29, 0.75)' : 'background.paper',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid',
        borderColor: isScrolled ? primaryAlpha(0.35) : primaryAlpha(0.25),
        boxShadow: isScrolled ? '0 4px 24px rgba(0, 0, 0, 0.5)' : '0 2px 16px rgba(0, 0, 0, 0.6)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: isScrolled ? 56 : 64,
            transition: 'min-height 0.3s ease',
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

          {/* 데스크탑: 탭 네비게이션 */}
          <Tabs
            value={currentIndex}
            onChange={handleChange}
            textColor="inherit"
            slotProps={{ indicator: { sx: { bgcolor: 'primary.main', height: 3 } } }}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              minHeight: 'unset',
              '& .MuiTabs-flexContainer': { height: '100%' },
              '& .MuiTab-root': {
                color: 'text.secondary',
                fontWeight: 600,
                minWidth: 100,
                height: '100%',
                transition: 'color 0.2s ease',
              },
              '& .MuiTab-root:hover': { color: 'primary.main' },
              '& .Mui-selected': { color: 'primary.main' },
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Tab key={item.label} label={item.label} />
            ))}
          </Tabs>

          {/* 모바일: 햄버거 메뉴 버튼 */}
          <IconButton
            onClick={() => setIsMenuOpen(true)}
            aria-label="메뉴 열기"
            sx={{ display: { xs: 'flex', sm: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* 모바일 슬라이드인 메뉴 */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        slotProps={{
          paper: {
            sx: { width: 240, bgcolor: 'background.paper', borderLeft: '1px solid', borderColor: 'divider' },
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={() => setIsMenuOpen(false)} aria-label="메뉴 닫기" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 1 }}>
          {NAV_ITEMS.map((item, index) => {
            const isActive = !item.anchorId && item.path === location.pathname;
            return (
              <ListItemButton
                key={item.label}
                onClick={() => handleNavigateFromMenu(item)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  minHeight: 48,
                  animation: `${fadeInLeft} 0.35s ease both`,
                  animationDelay: `${index * 0.05}s`,
                  '&:hover': { bgcolor: primaryAlpha(0.08) },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: isActive ? 'primary.main' : 'text.primary',
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {item.label}
                </Typography>
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default NavBar;
