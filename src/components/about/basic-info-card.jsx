import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CodeIcon from '@mui/icons-material/Code';

/** 아이콘 + 라벨 + 값으로 구성된 기본 정보 항목 목록 */
const buildInfoItems = ({ education, major, experience }) => [
  { key: 'education', icon: <SchoolIcon fontSize='small' />, label: '학력', value: education },
  { key: 'major', icon: <CodeIcon fontSize='small' />, label: '전공', value: major },
  { key: 'experience', icon: <WorkHistoryIcon fontSize='small' />, label: '경력', value: experience },
];

/**
 * BasicInfoCard 컴포넌트
 * About Me 상단에 배치되는 기본 정보 카드.
 * 프로필 사진과 이름, 학력·전공·경력 정보를 함께 보여준다.
 *
 * Props:
 * @param {string} name - 이름 [Required]
 * @param {string} education - 학력 [Required]
 * @param {string} major - 전공 [Required]
 * @param {string} experience - 경력 [Required]
 * @param {string} photo - 프로필 사진 경로 [Required]
 *
 * Example usage:
 * <BasicInfoCard name='김기호' education='조선대학교 컴퓨터공학과' major='컴퓨터 공학' experience='7년차' photo={profilePhoto} />
 */
function BasicInfoCard({ name, education, major, experience, photo }) {
  const infoItems = buildInfoItems({ education, major, experience });

  return (
    <Paper
      variant='outlined'
      sx={{
        p: { xs: 3, md: 4 },
        bgcolor: 'background.paper',
        borderColor: 'divider',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 3, md: 4 }}
        alignItems={{ xs: 'center', md: 'flex-start' }}
      >
        <Avatar
          src={photo}
          alt={`${name} 프로필 사진`}
          slotProps={{ img: { width: 320, height: 320 } }}
          sx={{
            width: { xs: 120, md: 160 },
            height: { xs: 120, md: 160 },
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        />

        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, width: '100%' }}>
          <Typography
            variant='h4'
            component='h2'
            sx={{ color: 'text.primary', fontWeight: 700, mb: { xs: 2, md: 3 } }}
          >
            {name}
          </Typography>

          <Stack spacing={1.5}>
            {infoItems.map((item) => (
              <Stack
                key={item.key}
                direction='row'
                spacing={1.5}
                alignItems='center'
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Box sx={{ display: 'flex', color: 'primary.main' }}>{item.icon}</Box>
                <Typography sx={{ color: 'text.disabled', fontSize: '0.85rem', minWidth: 40 }}>
                  {item.label}
                </Typography>
                <Typography sx={{ color: 'text.primary', fontSize: '0.95rem' }}>
                  {item.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}

export default BasicInfoCard;
