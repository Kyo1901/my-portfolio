import { useCallback, useMemo, useState } from 'react';
import { PortfolioContext } from './portfolio-context.js';
import profilePhoto from '../assets/profile-photo.webp';

/** Context 초기 데이터 (기본 정보 + 콘텐츠 섹션 + 스킬) */
const initialAboutMeData = {
  basicInfo: {
    name: '김기호',
    education: '조선대학교 컴퓨터공학과',
    major: '컴퓨터 공학',
    experience: '신입',
    photo: profilePhoto,
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content:
        '조선대학교 컴퓨터공학과에 입학하면서 처음 코드를 접했습니다. 화면 위의 몇 줄짜리 텍스트가 실제로 동작하는 걸 보고 나서, 프로그래밍이 단순한 전공 공부를 넘어 제가 계속하고 싶은 일이라는 걸 깨달았습니다. 그 이후 여러 프로젝트를 직접 기획하고 만들어보며 프론트엔드와 UI/UX에 특히 애정을 갖게 되었고, 지금은 사용자가 실제로 마주하는 화면을 더 좋은 경험으로 만드는 일에 집중하고 있습니다.',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content:
        '저는 "읽기 좋은 코드가 좋은 코드"라는 원칙을 가장 중요하게 생각합니다. 화려한 기술보다 팀원 누구나 이해하고 유지보수할 수 있는 구조를 우선시하며, 사용자 경험을 해치지 않는 선에서 성능과 안정성을 함께 챙기려 합니다. 또한 완벽한 계획보다 빠르게 만들어보고 피드백을 통해 개선해나가는 방식을 선호합니다.',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content:
        '업무 외 시간에는 새로운 기술 트렌드를 살펴보거나 사이드 프로젝트로 아이디어를 실험해보는 걸 즐깁니다. 산책과 러닝으로 머리를 비우는 시간을 자주 가지며, 이렇게 충전한 에너지로 다시 코드 앞에 앉는 걸 좋아합니다.',
      showInHome: false,
    },
  ],
  skills: [
    { id: 1, icon: 'orange-diamond', name: 'HTML', level: 90, category: 'Frontend' },
    { id: 2, icon: 'palette', name: 'CSS', level: 80, category: 'Frontend' },
    { id: 3, icon: 'zap', name: 'JavaScript', level: 80, category: 'Frontend' },
    { id: 4, icon: 'atom', name: 'React', level: 60, category: 'Framework' },
    { id: 5, icon: 'target', name: 'Figma', level: 65, category: 'Design' },
    { id: 6, icon: 'memory', name: 'Java', level: 80, category: 'Backend' },
    { id: 7, icon: 'terminal', name: 'Python', level: 80, category: 'Backend' },
    { id: 8, icon: 'data-object', name: 'C', level: 65, category: 'Backend' },
    { id: 9, icon: 'dns', name: 'C++', level: 60, category: 'Backend' },
    { id: 10, icon: 'github', name: 'Git', level: 75, category: 'Tools' },
    { id: 11, icon: 'storage', name: 'SQL', level: 70, category: 'Tools' },
  ],
};

/** 홈 탭에 노출할 대표 스킬 개수 */
const HOME_TOP_SKILL_COUNT = 4;

/** 홈 탭 콘텐츠 요약 길이 */
const HOME_SUMMARY_LENGTH = 100;

/**
 * PortfolioProvider 컴포넌트
 * About Me 데이터(기본 정보/콘텐츠 섹션/스킬)를 하나의 Context로 관리해
 * About Me 탭과 홈 탭이 실시간으로 같은 데이터를 공유하도록 한다.
 *
 * Props:
 * @param {node} children - Provider 하위에서 렌더링될 요소 [Required]
 *
 * Example usage:
 * <PortfolioProvider><App /></PortfolioProvider>
 */
export function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState(initialAboutMeData);

  /** 콘텐츠 섹션 하나의 본문을 수정한다 */
  const updateSectionContent = useCallback((sectionId, content) => {
    setAboutMeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, content } : section
      ),
    }));
  }, []);

  /** 스킬 하나의 숙련도를 수정한다 */
  const updateSkillLevel = useCallback((skillId, level) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === skillId ? { ...skill, level } : skill)),
    }));
  }, []);

  /** 홈 탭에서 사용할 요약 데이터(showInHome 섹션 요약 + 대표 스킬 상위 N개)를 계산한다 */
  const getHomeData = useCallback(() => {
    const homeContent = aboutMeData.sections
      .filter((section) => section.showInHome)
      .map((section) => ({
        title: section.title,
        summary:
          section.content.length > HOME_SUMMARY_LENGTH
            ? `${section.content.slice(0, HOME_SUMMARY_LENGTH)}...`
            : section.content,
      }));

    const topSkills = [...aboutMeData.skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, HOME_TOP_SKILL_COUNT);

    return { content: homeContent, skills: topSkills, basicInfo: aboutMeData.basicInfo };
  }, [aboutMeData]);

  const contextValue = useMemo(
    () => ({ aboutMeData, setAboutMeData, updateSectionContent, updateSkillLevel, getHomeData }),
    [aboutMeData, updateSectionContent, updateSkillLevel, getHomeData]
  );

  return <PortfolioContext.Provider value={contextValue}>{children}</PortfolioContext.Provider>;
}
