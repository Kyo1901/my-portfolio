import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../../lib/supabase.js';

/**
 * GuestbookForm 컴포넌트
 * Contact 섹션 왼쪽에 배치되는 방명록 작성 폼.
 * 이름·메시지(필수), 이메일(선택·비공개), 별점(선택)을 입력받아 Supabase 에 저장한다.
 *
 * Props:
 * @param {function} onSubmitted - 방명록 저장 성공 후 실행할 함수 (목록 새로고침 용도) [Optional]
 *
 * Example usage:
 * <GuestbookForm onSubmitted={refreshEntries} />
 */
function GuestbookForm({ onSubmitted }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  /** 폼 제출: 유효성 검사 후 Supabase guestbook 테이블에 insert */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) {
      setFeedback({ severity: 'warning', text: '이름과 메시지를 입력해주세요.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    const { error } = await supabase.from('guestbook').insert({
      name: trimmedName,
      message: trimmedMessage,
      email: email.trim() || null,
      rating,
    });

    setIsSubmitting(false);

    if (error) {
      setFeedback({ severity: 'error', text: '저장에 실패했습니다. 잠시 후 다시 시도해주세요.' });
      return;
    }

    setName('');
    setMessage('');
    setEmail('');
    setRating(5);
    setFeedback({ severity: 'success', text: '방명록이 등록되었습니다. 감사합니다!' });
    if (onSubmitted) {
      onSubmitted();
    }
  };

  return (
    <Paper
      variant='outlined'
      component='form'
      onSubmit={handleSubmit}
      sx={{
        height: '100%',
        p: { xs: 3, md: 4 },
        bgcolor: 'background.paper',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant='h6'
        component='h3'
        sx={{ color: 'text.primary', fontWeight: 700, mb: 0.5 }}
      >
        방명록 남기기
      </Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 3 }}>
        방문 소감을 자유롭게 남겨주세요. 이메일은 공개되지 않습니다.
      </Typography>

      <Stack spacing={2.5}>
        <TextField
          label='이름'
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          fullWidth
          size='small'
          slotProps={{ htmlInput: { maxLength: 50 } }}
        />

        <TextField
          label='이메일 (선택 · 비공개)'
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          size='small'
          slotProps={{ htmlInput: { maxLength: 255 } }}
        />

        <TextField
          label='메시지'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          fullWidth
          multiline
          rows={4}
          slotProps={{ htmlInput: { maxLength: 500 } }}
        />

        {/* 별점 평가 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
            별점
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue ?? 5)}
            sx={{ color: 'primary.main' }}
          />
        </Box>

        {feedback && (
          <Alert severity={feedback.severity} variant='outlined'>
            {feedback.text}
          </Alert>
        )}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={isSubmitting}
          endIcon={<SendIcon />}
          sx={{
            fontWeight: 700,
            color: 'primary.contrastText',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          {isSubmitting ? '등록 중...' : '방명록 등록'}
        </Button>
      </Stack>
    </Paper>
  );
}

export default GuestbookForm;
