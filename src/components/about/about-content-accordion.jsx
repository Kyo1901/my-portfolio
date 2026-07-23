import { useState } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/** 편집 가능한 콘텐츠 텍스트필드 공통 스타일 */
const contentFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: 'text.secondary',
    fontSize: { xs: '0.95rem', md: '1.05rem' },
    lineHeight: 1.8,
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: 'primary.main' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
};

/**
 * AboutContentAccordion 컴포넌트
 * About Me 콘텐츠 섹션들(개발 스토리, 개발 철학, 개인적인 이야기)을
 * 아코디언으로 펼쳐보며 확인할 수 있게 보여준다.
 * 펼친 섹션의 본문은 직접 수정할 수 있으며, 수정 시 onUpdateContent 로 전달된다.
 *
 * Props:
 * @param {Array} sections - 콘텐츠 섹션 목록 [{ id, title, content }] [Required]
 * @param {function} onUpdateContent - 본문 수정 시 실행할 함수(sectionId, content) [Required]
 *
 * Example usage:
 * <AboutContentAccordion sections={aboutMeData.sections} onUpdateContent={updateSectionContent} />
 */
function AboutContentAccordion({ sections, onUpdateContent }) {
  const [expandedId, setExpandedId] = useState(sections[0]?.id ?? false);

  const handleChange = (sectionId) => (_event, isExpanded) => {
    setExpandedId(isExpanded ? sectionId : false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {sections.map((section) => (
        <Accordion
          key={section.id}
          expanded={expandedId === section.id}
          onChange={handleChange(section.id)}
          disableGutters
          variant='outlined'
          sx={{
            bgcolor: 'background.paper',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            // 기본 확장 마진(16px)을 제거해 펼쳐질 때 위쪽 콘텐츠와의 간격이 좁아지지 않도록 함
            margin: '0 !important',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}>
            <Typography sx={{ color: 'text.primary', fontWeight: 700 }}>
              {section.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              multiline
              fullWidth
              minRows={3}
              value={section.content}
              onChange={(event) => onUpdateContent(section.id, event.target.value)}
              variant='outlined'
              sx={contentFieldSx}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default AboutContentAccordion;
