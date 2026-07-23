import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { primaryAlpha } from '../../utils/shared-styles.js';

/** 아이콘 + 텍스트로 정렬해 보여줄 연락처 정보 목록 (isCopyable: 클릭 시 클립보드 복사) */
const CONTACT_ITEMS = [
  { key: 'email', icon: <EmailIcon fontSize='small' />, label: '이메일', value: 'skadnjs153@naver.com', isCopyable: true },
  { key: 'phone', icon: <PhoneIcon fontSize='small' />, label: '전화번호', value: '010-8905-1901', isCopyable: true },
  { key: 'place', icon: <PlaceIcon fontSize='small' />, label: '위치', value: '(현) 전남광주통합특별시\n(구) 광주 광역시' },
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
  const [copiedKey, setCopiedKey] = useState(null);

  /** 이메일·전화번호 클릭: 클립보드에 복사하고 잠시 '복사됨!' 툴팁 표시 */
  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.value);
      setCopiedKey(item.key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      /* 클립보드 미지원 환경에서는 무시 */
    }
  };

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

      {/* 아이콘 + 텍스트 연락처 목록 (이메일·전화번호는 클릭 시 복사) */}
      <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
        {CONTACT_ITEMS.map((item) => {
          const row = (
            <Stack direction='row' spacing={2} alignItems='center' sx={{ width: '100%' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main',
                  bgcolor: primaryAlpha(0.08),
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
                  {item.label}
                </Typography>
                <Typography
                  sx={{ color: 'text.primary', fontSize: '0.95rem', wordBreak: 'break-all', whiteSpace: 'pre-line' }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Stack>
          );

          if (!item.isCopyable) {
            return <Box key={item.key}>{row}</Box>;
          }

          return (
            <Tooltip
              key={item.key}
              title={copiedKey === item.key ? '복사됨!' : '클릭하여 복사'}
              placement='top-start'
            >
              <ButtonBase
                onClick={() => handleCopy(item)}
                aria-label={`${item.label} 복사`}
                sx={{
                  justifyContent: 'flex-start',
                  borderRadius: 2,
                  '&:hover': { bgcolor: primaryAlpha(0.04) },
                }}
              >
                {row}
              </ButtonBase>
            </Tooltip>
          );
        })}
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
                  bgcolor: primaryAlpha(0.08),
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
