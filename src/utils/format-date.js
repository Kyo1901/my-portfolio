/**
 * ISO 날짜 문자열을 'YYYY.MM.DD HH:mm' 형태로 변환한다.
 *
 * @param {string} isoString - ISO 8601 날짜 문자열 (예: '2026-07-16T05:33:03.139Z')
 * @returns {string} 포맷된 날짜 문자열 (잘못된 입력이면 빈 문자열)
 */
export function formatDateTime(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
