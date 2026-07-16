import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { formatDateTime } from '../../utils/format-date.js';

/**
 * GuestbookEntry 컴포넌트
 * 작성된 방명록 한 건을 표시하는 카드.
 *
 * Props:
 * @param {string} name - 작성자 이름 [Required]
 * @param {string} message - 방명록 내용 [Required]
 * @param {number} rating - 별점 (1~5, 없으면 미표시) [Optional]
 * @param {string} createdAt - 작성 일시 ISO 문자열 [Required]
 *
 * Example usage:
 * <GuestbookEntry name="김민지" message="잘 봤습니다!" rating={5} createdAt="2026-07-16T05:33:03Z" />
 */
function GuestbookEntry({ name, message, rating, createdAt }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        p: { xs: 2, md: 2.5 },
        bgcolor: 'background.paper',
        borderColor: 'divider',
        textAlign: 'left',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1,
          mb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.95rem' }}>
            {name}
          </Typography>
          {rating != null && (
            <Rating value={rating} readOnly size='small' sx={{ color: 'primary.main' }} />
          )}
        </Box>
        <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
          {formatDateTime(createdAt)}
        </Typography>
      </Box>

      <Typography
        sx={{
          color: 'text.secondary',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {message}
      </Typography>
    </Paper>
  );
}

export default GuestbookEntry;
