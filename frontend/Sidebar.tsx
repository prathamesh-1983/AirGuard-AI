import { Activity, Bot, Building2, CarFront, ChartNoAxesCombined, Compass, Gauge, House, Leaf, MapPinned, ShieldCheck, Wind } from 'lucide-react'
const links = [
  ['Overview', Gauge], ['Air Quality', Wind], ['Pollution Map', MapPinned], ['Forecasts', ChartNoAxesCombined],
  ['Daily Planner', Compass], ['Indoor Air', House], ['Family Protection', ShieldCheck],
  ['EcoRoute', CarFront], ['Impact Simulator', Leaf], ['Community Hub', Building2], ['AI Copilot', Bot],
] as const
export default function Sidebar({ active, onSelect }: { active: string; onSelect: (v: string) => void }) {
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark"><Wind size={21}/></div><div><b>AirGuard<span> AI</span></b><small>URBAN AIR DEFENSE</small></div></div>
    <div className="workspace-label">WORKSPACE</div>
    <nav>{links.map(([name, Icon]) => <button key={name} onClick={() => onSelect(name)} className={`nav-link ${active===name?'selected':''}`}><Icon size={17}/><span>{name}</span>{name==='AI Copilot' && <i className="new-pill">AI</i>}</button>)}</nav>
    <div className="sidebar-bottom"><div className="status-card"><span className="live-dot"/> Systems operational<small>Data services connected</small></div><div className="profile"><div className="avatar">AG</div><div><b>AirGuard Workspace</b><small>Community edition</small></div></div></div>
  </aside>
}
