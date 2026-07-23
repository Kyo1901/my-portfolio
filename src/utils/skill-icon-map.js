import HtmlIcon from '@mui/icons-material/Html';
import CssIcon from '@mui/icons-material/Css';
import JavascriptIcon from '@mui/icons-material/Javascript';
import HubIcon from '@mui/icons-material/Hub';
import BrushIcon from '@mui/icons-material/Brush';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ExtensionIcon from '@mui/icons-material/Extension';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DnsIcon from '@mui/icons-material/Dns';
import TerminalIcon from '@mui/icons-material/Terminal';
import MemoryIcon from '@mui/icons-material/Memory';
import GitHubIcon from '@mui/icons-material/GitHub';
import StorageIcon from '@mui/icons-material/Storage';
import CodeIcon from '@mui/icons-material/Code';

/** 스킬의 icon 필드 값 → 실제 아이콘 컴포넌트 매핑 */
const SKILL_ICON_COMPONENT_MAP = {
  'orange-diamond': HtmlIcon,
  palette: CssIcon,
  zap: JavascriptIcon,
  atom: HubIcon,
  target: BrushIcon,
  widgets: WidgetsIcon,
  extension: ExtensionIcon,
  'data-object': DataObjectIcon,
  dns: DnsIcon,
  terminal: TerminalIcon,
  memory: MemoryIcon,
  github: GitHubIcon,
  storage: StorageIcon,
};

/**
 * 스킬의 icon 식별자에 해당하는 MUI 아이콘 컴포넌트를 반환한다.
 * 매핑되지 않은 식별자는 기본 CodeIcon 으로 대체한다.
 *
 * @param {string} icon - 스킬 객체의 icon 필드 값
 * @returns {React.ComponentType} 아이콘 컴포넌트
 */
export function getSkillIconComponent(icon) {
  return SKILL_ICON_COMPONENT_MAP[icon] ?? CodeIcon;
}
