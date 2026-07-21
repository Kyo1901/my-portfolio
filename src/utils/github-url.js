/**
 * GitHub Pages 배포 URL(예: https://kyo1901.github.io/repo-name/)에서
 * 원본 GitHub 저장소 URL(예: https://github.com/kyo1901/repo-name)을 추출한다.
 *
 * @param {string} detailUrl - GitHub Pages 배포 URL
 * @returns {string} GitHub 저장소 URL (패턴이 맞지 않으면 빈 문자열)
 */
export function getGithubRepoUrl(detailUrl) {
  const match = /^https?:\/\/([^.]+)\.github\.io\/([^/?#]+)/.exec(detailUrl ?? '');
  if (!match) {
    return '';
  }

  const [, username, repo] = match;
  return `https://github.com/${username}/${repo}`;
}
