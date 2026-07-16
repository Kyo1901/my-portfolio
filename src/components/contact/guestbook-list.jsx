import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GuestbookEntry from './guestbook-entry.jsx';

/**
 * GuestbookList 컴포넌트
 * 작성된 방명록 목록. 최대 5개씩 표시하고, 더 있으면 '더보기' 버튼을 노출한다.
 *
 * Props:
 * @param {Array} entries - 방명록 목록 [{ id, name, message, rating, created_at }] [Required]
 * @param {boolean} isLoading - 목록 로딩 중 여부 [Optional, 기본값: false]
 * @param {boolean} hasMore - 더 불러올 방명록 존재 여부 [Optional, 기본값: false]
 * @param {function} onLoadMore - '더보기' 버튼 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <GuestbookList entries={entries} hasMore={hasMore} onLoadMore={loadMore} />
 */
function GuestbookList({ entries, isLoading = false, hasMore = false, onLoadMore }) {
  if (isLoading && entries.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={28} color='primary' />
      </Box>
    );
  }

  if (entries.length === 0) {
    return (
      <Typography sx={{ color: 'text.disabled', textAlign: 'center', py: 4, fontSize: '0.9rem' }}>
        아직 작성된 방명록이 없습니다. 첫 번째 방명록을 남겨주세요!
      </Typography>
    );
  }

  return (
    <Box>
      <Stack spacing={2}>
        {entries.map((entry) => (
          <GuestbookEntry
            key={entry.id}
            name={entry.name}
            message={entry.message}
            rating={entry.rating}
            createdAt={entry.created_at}
          />
        ))}
      </Stack>

      {hasMore && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant='outlined'
            color='primary'
            onClick={onLoadMore}
            disabled={isLoading}
            endIcon={<ExpandMoreIcon />}
            sx={{ fontWeight: 700 }}
          >
            {isLoading ? '불러오는 중...' : '더보기'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default GuestbookList;
