import { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** 타이핑 속도 (ms/글자) */
const TYPING_SPEED_MS = 45;

/** 한 줄을 다 치고 난 뒤 대기하는 시간(ms) */
const LINE_PAUSE_MS = 1400;

/** 커서 깜빡임 애니메이션 */
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

/**
 * HeroTerminal 컴포넌트
 * 터미널처럼 명령어 한 줄이 타이핑되듯 나타났다가, 다음 줄로 순환하는 미니 위젯.
 * "지금도 코드를 치고 있는 개발자"라는 인상을 주기 위한 라이브형 연출.
 *
 * Props:
 * @param {Array} lines - 순서대로 타이핑할 명령어 문자열 목록 [Required]
 *
 * Example usage:
 * <HeroTerminal lines={['git commit -m "feat: 완성"', 'git push origin main']} />
 */
function HeroTerminal({ lines }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    const currentLine = lines[lineIndex] ?? '';
    let charCount = 0;

    const typingTimer = setInterval(() => {
      charCount += 1;
      setDisplayedText(currentLine.slice(0, charCount));

      if (charCount >= currentLine.length) {
        clearInterval(typingTimer);
      }
    }, TYPING_SPEED_MS);

    return () => clearInterval(typingTimer);
  }, [lineIndex, lines]);

  useEffect(() => {
    const currentLine = lines[lineIndex] ?? '';
    const holdTimer = setTimeout(() => {
      setLineIndex((prev) => (prev + 1) % lines.length);
    }, currentLine.length * TYPING_SPEED_MS + LINE_PAUSE_MS);

    return () => clearTimeout(holdTimer);
  }, [lineIndex, lines]);

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 2.5,
        py: 1.5,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        maxWidth: '100%',
      }}
    >
      <Typography
        component='span'
        sx={{ color: 'primary.main', fontFamily: 'monospace', fontSize: { xs: '0.85rem', md: '0.95rem' } }}
      >
        $
      </Typography>
      <Typography
        component='span'
        sx={{
          color: 'text.primary',
          fontFamily: 'monospace',
          fontSize: { xs: '0.85rem', md: '0.95rem' },
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {displayedText}
      </Typography>
      <Box sx={{ width: '2px', height: '1em', bgcolor: 'primary.main', animation: `${blink} 1s step-end infinite` }} />
    </Box>
  );
}

export default HeroTerminal;
