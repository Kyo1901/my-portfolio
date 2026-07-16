import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

/** 아이콘 + 텍스트로 정렬해 보여줄 연락처 정보 목록 */
const CONTACT_ITEMS = [
  { key: 'email', icon: <EmailIcon fontSize='small' />, label: '이메일', value: 'skadnjs153@naver.com' },
  { key: 'phone', icon: <PhoneIcon fontSize='small' />, label: '전화번호', value: '010-8905-1901' },
  { key: 'place', icon: <PlaceIcon fontSize='small' />, label: '위치', value: '광주광역시, 대한민국' },
  { key: 'time', icon: <AccessTimeIcon fontSize='small' />, label: '응답 시간', value: '09:00 - 18:00 (평일)' },
];

/** 동그란 아이콘 버튼으로 나란히 배치할 SNS 링크 목록 */
const SNS_LINKS = [
  { key: 'github', icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/Kyo1901' },
  { key: 'instagram', icon: <InstagramIcon />, label: 'Instagram', href: '#' },
  { key: 'linkedin', icon: <LinkedInIcon />, label: 'LinkedIn', href: '#' },
];

/**
 * ContactInfo 컴포넌트
 * Contact 섹션 오른쪽에 배치되는 연락처 정보 패널.
 * 아이콘 + 텍스트 정렬 목록과 동그란 SNS 아이콘 버튼을 표시한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactInfo />
 */
function ContactInfo() {
  return (
    <Paper
      variant='outlined'
      sx={{
        height: '100%',
        p: { xs: 3, md: 4 },
        bgcolor: 'background.paper',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant='h6'
        component='h3'
        sx={{ color: 'text.primary', fontWeight: 700, mb: 3 }}
      >
        Info
      </Typography>

      {/* 아이콘 + 텍스트 연락처 목록 */}
      <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
        {CONTACT_ITEMS.map((item) => (
          <Stack key={item.key} direction='row' spacing={2} alignItems='center'>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
                bgcolor: 'rgba(0, 255, 163, 0.08)',
                flexShrink: 0,
              }}
            >
              {item.icon}
            </Box>
            <Box>
              <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
                {item.label}
              </Typography>
              <Typography sx={{ color: 'text.primary', fontSize: '0.95rem', wordBreak: 'break-all' }}>
                {item.value}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>

      {/* 동그란 SNS 아이콘 버튼 */}
      <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Stack direction='row' spacing={1.5}>
          {SNS_LINKS.map((sns) => (
            <IconButton
              key={sns.key}
              component='a'
              href={sns.href}
              target={sns.href === '#' ? undefined : '_blank'}
              rel='noopener noreferrer'
              aria-label={sns.label}
              sx={{
                width: 44,
                height: 44,
                border: '1px solid',
                borderColor: 'divider',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(0, 255, 163, 0.08)',
                },
              }}
            >
              {sns.icon}
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}

export default ContactInfo;
