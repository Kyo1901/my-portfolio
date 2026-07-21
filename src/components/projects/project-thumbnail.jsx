import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

/**
 * ProjectThumbnail 컴포넌트
 * 프로젝트 썸네일 이미지. 로드 실패 시(썸네일 생성 대기 등) '썸네일 준비 중' 대체 화면을 보여준다.
 *
 * Props:
 * @param {string} src - 썸네일 이미지 URL [Required]
 * @param {string} alt - 이미지 대체 텍스트 [Required]
 * @param {object} sx - 크기·테두리 등 추가 스타일 [Optional, 기본값: {}]
 *
 * Example usage:
 * <ProjectThumbnail src={thumbnailUrl} alt="Petlog SNS 썸네일" sx={{ width: 300, height: 300 }} />
 */
function ProjectThumbnail({ src, alt, sx = {} }) {
  const [isBroken, setIsBroken] = useState(false);

  if (isBroken) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          color: 'text.disabled',
          bgcolor: 'background.default',
          ...sx,
        }}
      >
        <ImageOutlinedIcon sx={{ fontSize: 32 }} />
        <Typography sx={{ fontSize: '0.8rem' }}>썸네일 준비 중</Typography>
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setIsBroken(true)}
      sx={{ objectFit: 'cover', bgcolor: 'background.default', ...sx }}
    />
  );
}

export default ProjectThumbnail;
