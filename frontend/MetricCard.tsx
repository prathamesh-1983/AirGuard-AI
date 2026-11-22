import { ReactNode } from 'react'
export default function MetricCard({ label, value, unit, icon, tone='cyan' }: {
  label: string; value: string | number; unit: string; icon: ReactNode; tone?: string
}) {
  return <article className="metric-card">
    <div className="metric-top"><span>{label}</span><span className={`metric-icon ${tone}`}>{icon}</span></div>
    <div className="metric-value">{value}<small>{unit}</small></div>
    <div className="metric-foot"><span className="live-dot" /> Provider data</div>
  </article>
}
