import { useContext } from 'react';
import { PortfolioContext } from '../context/portfolio-context.js';

/**
 * usePortfolio 훅
 * PortfolioContext 에 담긴 About Me 데이터와 갱신 함수, 홈 탭용 요약 함수를 반환한다.
 *
 * @returns {Object} { aboutMeData, setAboutMeData, updateSectionContent, updateSkillLevel, getHomeData }
 *
 * Example usage:
 * const { aboutMeData, updateSkillLevel } = usePortfolio();
 */
export function usePortfolio() {
  return useContext(PortfolioContext);
}
