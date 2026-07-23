/**
 * 숙련도(level) 내림차순으로 정렬된 새 배열을 반환한다.
 * 홈 탭 연동 시 대표 스킬을 고르는 데 사용할 수 있다.
 *
 * @param {Array} skills - 스킬 목록 [{ id, name, level, category, ... }]
 * @returns {Array} 숙련도 내림차순으로 정렬된 스킬 배열
 */
export function sortSkillsByLevel(skills) {
  return [...skills].sort((a, b) => b.level - a.level);
}

/**
 * 숙련도가 높은 상위 N개의 스킬을 반환한다.
 * 홈 탭에 대표 스킬만 노출할 때 사용할 수 있다.
 *
 * @param {Array} skills - 스킬 목록 [{ id, name, level, category, ... }]
 * @param {number} count - 선택할 스킬 개수
 * @returns {Array} 숙련도 상위 N개 스킬 배열
 */
export function getTopSkills(skills, count) {
  return sortSkillsByLevel(skills).slice(0, count);
}
