import { Compass, Leaf, CarFront } from "lucide-react";
import { useEffect, useMemo, useState } from 'react'
import { Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, Bot, CheckCircle2, Cloud, Droplets, MapPin, RefreshCw, Send, ShieldCheck, Sparkles, Sun, Wind, Zap } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Sidebar from './components/Sidebar'
import MetricCard from './components/MetricCard'
import api, { type AirData } from './services/api'

const DEFAULT = { latitude: 19.076, longitude: 72.8777 }
const names: Record<string,string> = { pm2_5:'PM2.5', pm10:'PM10', ozone:'Ozone', nitrogen_dioxide:'NO₂', carbon_monoxide:'CO', sulphur_dioxide:'SO₂' }
function format(v: unknown, digits=1) { return typeof v === 'number' ? v.toFixed(digits) : '—' }

export default function App() {
  const [active, setActive] = useState('Overview')
  const [latitude, setLatitude] = useState(String(DEFAULT.latitude))
  const [longitude, setLongitude] = useState(String(DEFAULT.longitude))
  const [data, setData] = useState<AirData | null>(null)
  const [forecast, setForecast] = useState<AirData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [chat, setChat] = useState<{role:string;text:string}[]>([{role:'assistant',text:'Hello! I’m your AirGuard environmental copilot. Ask me to explain the latest readings or suggest practical clean-air actions.'}])
  const [room, setRoom] = useState({length:5,width:4,height:3,ach:5})
  const [cadr, setCadr] = useState<number|null>(null)
  const [distance, setDistance] = useState(12)
  const [impact, setImpact] = useState<any[]>([])
  const [planner, setPlanner] = useState<any[]>([])
  const [sensitive, setSensitive] = useState(false)

  async function load(lat=Number(latitude), lon=Number(longitude)) {
    setLoading(true); setError('')
    try {
      const [current, future] = await Promise.all([
        api.get('/air-quality/current',{params:{latitude:lat,longitude:lon}}),
        api.get('/air-quality/forecast',{params:{latitude:lat,longitude:lon}})
      ])
      setData(current.data); setForecast(future.data)
    } catch (e:any) {
      setError(e?.response?.data?.detail || 'Unable to retrieve provider data. Check your connection and backend.')
    } finally { setLoading(false) }
  }
  useEffect(()=>{ load() },[])
  const chartData = useMemo(()=>{
    const h=forecast?.hourly
    if(!h?.time) return []
    return h.time.slice(0,24).map((t,i)=>({time:t.slice(11,16), pm25:h.pm2_5?.[i], pm10:h.pm10?.[i]}))
  },[forecast])
  const current = data?.current || {}
  const currentTime = current.time ? new Date(String(current.time)).toLocaleString() : 'Waiting for provider'
  async function calculateCadr() {
    const r=await api.post('/indoor/calculate-cadr',{length_m:room.length,width_m:room.width,height_m:room.height,air_changes_per_hour:room.ach})
    setCadr(r.data.recommended_cadr_m3_per_hour)
  }
  async function compare() {
    const r=await api.post('/impact/compare',{distance_km:Number(distance),modes:['car','bus','metro','cycle']})
    setImpact(r.data.results)
  }
  async function makePlan() {
    const r=await api.post('/planner/generate',{...DEFAULT,activity:'general',sensitive_group:sensitive})
    setPlanner(r.data.plan)
  }
  async function sendChat() {
    if(!chatInput.trim()) return
    const message=chatInput; setChatInput(''); setChat(c=>[...c,{role:'user',text:message}])
    try {
      const r=await api.post('/ai/chat',{message,context:{current,provider:data?.provider,retrieved_at:data?.retrieved_at}})
      setChat(c=>[...c,{role:'assistant',text:r.data.answer}])
    } catch { setChat(c=>[...c,{role:'assistant',text:'The assistant service is unavailable. Please try again shortly.'}]) }
  }
  const pm25=typeof current.pm2_5==='number'?current.pm2_5:null
  const status=pm25===null?'Awaiting data':pm25<=15?'Lower reading':pm25<=35?'Moderate reading':pm25<=55?'Elevated reading':'High reading'
  return <div className="app-shell">
    <Sidebar active={active} onSelect={setActive}/>
    <main className="main">
      <header className="topbar"><div><div className="eyebrow">ENVIRONMENTAL INTELLIGENCE PLATFORM</div><h1>{active==='Overview'?'Air Quality Command Center':active}</h1></div><div className="top-actions"><div className="location-chip"><MapPin size={15}/><span>Mumbai, India</span></div><button className="icon-button" onClick={()=>load()} title="Refresh data"><RefreshCw size={17} className={loading?'spin':''}/></button><div className="avatar">PD</div></div></header>
      {error && <div className="error-banner"><AlertTriangle size={17}/>{error}</div>}
      {active==='Overview' || active==='Air Quality' || active==='Forecasts' || active==='Pollution Map' ? <>
        <section className="hero-panel">
          <div className="hero-copy"><div className="hero-tag"><span className="live-dot"/> LIVE ENVIRONMENTAL SNAPSHOT</div><h2>Understand your air.<br/><em>Protect your tomorrow.</em></h2><p>Environmental intelligence to help you make informed everyday decisions.</p><div className="hero-meta"><span><MapPin size={14}/> Mumbai, Maharashtra</span><span><Cloud size={14}/> {currentTime}</span></div></div>
          <div className="hero-score"><div className="score-ring"><div><strong>{pm25===null?'—':Math.round(pm25)}</strong><small>µg/m³</small></div></div><div className="score-label">PM2.5 concentration</div><div className="score-status">{status}</div></div>
          <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
        </section>
        <div className="section-heading"><div><h3>Atmospheric indicators</h3><p>Latest values returned by the selected data provider</p></div><span className="source-label"><span className="live-dot"/> {loading?'Updating':'Provider connected'}</span></div>
        <div className="metrics-grid">
          <MetricCard label="PM2.5" value={format(current.pm2_5)} unit="µg/m³" icon={<Wind size={18}/>} />
          <MetricCard label="PM10" value={format(current.pm10)} unit="µg/m³" icon={<Activity size={18}/>} tone="violet"/>
          <MetricCard label="Ozone" value={format(current.ozone)} unit="µg/m³" icon={<Sun size={18}/>} tone="amber"/>
          <MetricCard label="Nitrogen dioxide" value={format(current.nitrogen_dioxide)} unit="µg/m³" icon={<Zap size={18}/>} tone="rose"/>
        </div>
        <div className="content-grid">
          <section className="panel chart-panel"><div className="panel-heading"><div><h3>Air quality outlook</h3><p>Hourly PM2.5 and PM10 · next 24 provider hours</p></div><span className="chart-legend"><i/> PM2.5 <i className="purple-dot"/> PM10</span></div>
            {chartData.length ? <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="pmFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#32d6b0" stopOpacity={.25}/><stop offset="95%" stopColor="#32d6b0" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#243348" strokeDasharray="3 5" vertical={false}/><XAxis dataKey="time" tick={{fill:'#8090a6',fontSize:11}} axisLine={false} tickLine={false}/><YAxis tick={{fill:'#8090a6',fontSize:11}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:'#101d2d',border:'1px solid #2a3b50',borderRadius:10,color:'#fff'}}/><Area type="monotone" dataKey="pm2_5" name="PM2.5" stroke="#36d9b4" strokeWidth={2.5} fill="url(#pmFill)" connectNulls/><Area type="monotone" dataKey="pm10" name="PM10" stroke="#9b8cff" strokeWidth={2} fill="transparent" connectNulls/></AreaChart></ResponsiveContainer></div> : <div className="empty-chart">Forecast chart will appear when provider data is available.</div>}
          </section>
          <section className="panel pollutant-panel"><div className="panel-heading"><div><h3>Pollutant breakdown</h3><p>Current provider values</p></div><Activity size={18} className="muted"/></div>{Object.entries(names).map(([key,label])=><div className="pollutant-row" key={key}><span>{label}</span><div className="pollutant-track"><i style={{width:`${Math.min(100,Math.max(3,(Number(current[key])||0)/Math.max(1,Number(current.pm2_5)||50)*35))}%`}}/></div><b>{format(current[key])}</b></div>)}<div className="note-box"><AlertTriangle size={15}/> Values are concentrations, not an official CPCB AQI score.</div></section>
        </div>
        <div className="section-heading"><div><h3>Clean-air action center</h3><p>Tools to turn environmental information into practical decisions</p></div></div>
        <div className="action-grid">
          <button className="action-card" onClick={()=>setActive('Daily Planner')}><div className="action-icon green"><Compass/></div><b>Personal daily planner</b><p>Build a practical routine around air conditions.</p><span>Open planner →</span></button>
          <button className="action-card" onClick={()=>setActive('Indoor Air')}><div className="action-icon blue"><HouseIcon/></div><b>Indoor air advisor</b><p>Estimate clean-air delivery needs for a room.</p><span>Calculate CADR →</span></button>
          <button className="action-card" onClick={()=>setActive('EcoRoute')}><div className="action-icon amber"><Wind/></div><b>EcoRoute comparison</b><p>Compare illustrative travel emissions.</p><span>Compare modes →</span></button>
          <button className="action-card" onClick={()=>setActive('AI Copilot')}><div className="action-icon purple"><Bot/></div><b>AI environmental copilot</b><p>Ask questions about readings and actions.</p><span>Ask AirGuard →</span></button>
        </div>
        <footer className="data-footer">SOURCE: {data?.provider || 'Open-Meteo Air Quality API'} <span>•</span> RETRIEVED: {data?.retrieved_at ? new Date(data.retrieved_at).toLocaleTimeString() : '—'} <span>•</span> CLASSIFICATION: PROVIDER MODEL DATA</footer>
      </> : null}
      {active==='Daily Planner' && <section className="tool-layout"><div className="panel tool-panel"><div className="panel-heading"><div><h3>Your clean-air routine</h3><p>Generate practical actions for your day</p></div><Compass/></div><label className="checkline"><input type="checkbox" checked={sensitive} onChange={e=>setSensitive(e.target.checked)}/> Include additional caution for sensitive household members</label><button className="primary-button" onClick={makePlan}>Generate my plan</button>{planner.map((p,i)=><div className="plan-item" key={i}><div className="plan-time">{p.time}</div><div><b>{p.action}</b><p>{p.reason}</p></div><CheckCircle2 className="success-icon"/></div>)}</div><div className="panel side-info"><ShieldCheck size={25}/><h3>Plan with context</h3><p>Conditions vary by street, time and indoor environment. Check local alerts and refresh readings before making decisions.</p></div></section>}
      {active==='Indoor Air' && <section className="tool-layout"><div className="panel tool-panel"><div className="panel-heading"><div><h3>Room CADR calculator</h3><p>Estimate a suitable clean-air delivery rate</p></div><Wind/></div><div className="form-grid">{(['length','width','height','ach'] as const).map(k=><label>{({length:'Length (m)',width:'Width (m)',height:'Ceiling height (m)',ach:'Target air changes / hour'} as any)[k]}<input type="number" min="1" step=".5" value={room[k]} onChange={e=>setRoom({...room,[k]:Number(e.target.value)})}/></label>)}</div><button className="primary-button" onClick={calculateCadr}>Calculate required CADR</button>{cadr!==null&&<div className="result-card"><small>ESTIMATED TARGET CADR</small><strong>{cadr.toLocaleString()} <small>m³/hour</small></strong><p>Room volume × target air changes per hour</p></div>}</div><div className="panel side-info"><Droplets size={25}/><h3>What this means</h3><p>CADR is a product sizing estimate. Real indoor performance also depends on filtration efficiency, room leakage, placement, maintenance and pollutant sources.</p></div></section>}
      {(active==='EcoRoute' || active==='Impact Simulator') && <section className="tool-layout"><div className="panel tool-panel"><div className="panel-heading"><div><h3>Travel impact comparison</h3><p>Compare illustrative CO₂-equivalent emissions</p></div><Leaf/></div><label>One-way journey distance (km)<input type="number" value={distance} min="1" onChange={e=>setDistance(Number(e.target.value))}/></label><button className="primary-button" onClick={compare}>Compare transport modes</button>{impact.map(x=><div className="pollutant-row" key={x.mode}><span className="capitalize">{x.mode}</span><div className="pollutant-track"><i style={{width:`${Math.max(2,x.estimated_kg_co2e*100)}%`}}/></div><b>{x.estimated_kg_co2e} kg</b></div>)}<p className="disclaimer">Emission factors are illustrative demo assumptions, not verified local inventory factors.</p></div><div className="panel side-info"><CarFront size={25}/><h3>Choose practical alternatives</h3><p>Distance, occupancy, traffic, electricity mix and vehicle type change the result. Prioritize safe and accessible options.</p></div></section>}
      {active==='AI Copilot' && <section className="panel chat-panel"><div className="panel-heading"><div><h3><Sparkles size={18}/> AirGuard AI Copilot</h3><p>Environmental explanations grounded in supplied app context</p></div><span className="ai-tag">AI ASSISTANT</span></div><div className="chat-messages">{chat.map((m,i)=><div className={`chat-bubble ${m.role}`} key={i}><div className="chat-avatar">{m.role==='assistant'?<Bot size={16}/>: 'You'}</div><p>{m.text}</p></div>)}</div><form className="chat-compose" onSubmit={e=>{e.preventDefault();sendChat()}}><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Ask about PM2.5, daily actions, indoor air..." /><button type="submit"><Send size={17}/></button></form><p className="disclaimer">Assistant responses are informational and may be AI-generated. They are not medical advice.</p></section>}
      {!['Overview','Air Quality','Forecasts','Pollution Map','Daily Planner','Indoor Air','EcoRoute','Impact Simulator','AI Copilot'].includes(active) && <section className="panel coming-soon"><ShieldCheck size={34}/><h2>{active}</h2><p>This module is included in the product roadmap. The core data, planner, indoor calculator, impact calculator and copilot are available in this runnable starter.</p><button className="primary-button" onClick={()=>setActive('Overview')}>Return to command center</button></section>}
    </main>
  </div>
}
function HouseIcon(){ return <ShieldCheck/> }
