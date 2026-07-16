import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import GuestbookForm from './guestbook-form.jsx';
import ContactInfo from './contact-info.jsx';
import GuestbookList from './guestbook-list.jsx';
import { supabase } from '../../lib/supabase.js';

/** 한 번에 표시할 방명록 개수 (이후 '더보기'로 5개씩 추가) */
const PAGE_SIZE = 5;

/**
 * ContactSection 컴포넌트
 * Home 탭 Contact 섹션의 본문.
 * - 왼쪽: 방명록 작성 폼 / 오른쪽: 연락처 정보 패널
 * - 아래: 작성된 방명록 목록 (최대 5개씩 표시 + 더보기)
 * Supabase guestbook 테이블과 연동해 목록 조회·등록을 처리한다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const [entries, setEntries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  /** 방명록 목록 조회 (최신순, limit 개수만큼) — email 은 비공개라 조회하지 않음 */
  const fetchEntries = useCallback(async (limit) => {
    setIsLoading(true);
    setErrorMessage('');

    const { data, count, error } = await supabase
      .from('guestbook')
      .select('id, name, message, rating, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .order('id', { ascending: false })
      .range(0, limit - 1);

    setIsLoading(false);

    if (error) {
      setErrorMessage('방명록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setEntries(data ?? []);
    setTotalCount(count ?? 0);
  }, []);

  useEffect(() => {
    fetchEntries(PAGE_SIZE);
  }, [fetchEntries]);

  /** '더보기' 클릭: 표시 개수를 5개 늘려 다시 조회 */
  const handleLoadMore = () => {
    const nextCount = visibleCount + PAGE_SIZE;
    setVisibleCount(nextCount);
    fetchEntries(nextCount);
  };

  /** 방명록 등록 성공: 현재 표시 개수 기준으로 목록 새로고침 */
  const handleSubmitted = () => {
    fetchEntries(visibleCount);
  };

  return (
    <Box sx={{ textAlign: 'left' }}>
      {/* 상단: 방명록 작성란(왼쪽) + 연락처(오른쪽), 좁은 화면에서는 연락처가 먼저 */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
          <GuestbookForm onSubmitted={handleSubmitted} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
          <ContactInfo />
        </Grid>
      </Grid>

      {/* 하단: 작성된 방명록 목록 */}
      <Box sx={{ mt: { xs: 5, md: 7 } }}>
        <Typography
          variant='h6'
          component='h3'
          sx={{ color: 'text.primary', fontWeight: 700, mb: 2 }}
        >
          방명록
          <Box component='span' sx={{ color: 'primary.main', ml: 1, fontSize: '0.95rem' }}>
            {totalCount}
          </Box>
        </Typography>

        {errorMessage && (
          <Alert severity='error' variant='outlined' sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <GuestbookList
          entries={entries}
          isLoading={isLoading}
          hasMore={entries.length < totalCount}
          onLoadMore={handleLoadMore}
        />
      </Box>
    </Box>
  );
}

export default ContactSection;
