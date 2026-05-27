import { useState, useRef, type JSX } from 'react'
import './App.css'

const ICON_BLUE = '#5ab8e8'
const ICON_ORANGE = '#e8861c'
const ICON_DARK = '#1a5080'

const NAV_ICONS: Record<string, (active: boolean) => JSX.Element> = {
  'Vantage Point': () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={ICON_BLUE}>
      {/* smaller left peak */}
      <path d="M7 10l-5 9h10z" opacity="0.65"/>
      {/* larger right peak */}
      <path d="M15 5l-6 14h12z"/>
    </svg>
  ),
  'Clients': (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? ICON_ORANGE : ICON_BLUE}>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  ),
  'Families': () => (
    <svg width="20" height="20" viewBox="0 0 36 36" fill={ICON_BLUE}>
      {/* tall adult on left */}
      <circle cx="12" cy="6" r="4.5"/>
      <path d="M12 13C7 13 2 15.5 2 18.5V26h20v-7.5C22 15.5 17 13 12 13z"/>
      {/* shorter child on right */}
      <circle cx="26" cy="11" r="3"/>
      <path d="M26 16c-3.5 0-7.5 1.5-7.5 4V24H34v-4c0-2.5-4-4-8-4z" transform="translate(2,0)"/>
    </svg>
  ),
  'Labs': () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={ICON_BLUE}>
      <path d="M19.8 18.4L14 10.67V6h1c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1s.45 1 1 1h1v4.67L4.2 18.4c-.57.77-.02 1.6.8 1.6h14c.82 0 1.37-.83.8-1.6z"/>
    </svg>
  ),
  'Groups': () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={ICON_BLUE}>
      <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A7.07 7.07 0 0 0 20 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>
    </svg>
  ),
  'Eligibility': () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={ICON_BLUE}>
      {/* person body */}
      <circle cx="10" cy="6" r="3"/>
      <path d="M10 11c-3.33 0-7 1.67-7 3.5V17h9.26c-.42-.73-.8-1.54-1.06-2.4L10 15c-2.97 0-4.92.95-5 1.5V14.5C5 13.47 7.67 13 10 13c.26 0 .52.01.78.02-.17-.64-.27-1.3-.27-1.99L10 11z"/>
      {/* checkmark badge */}
      <path d="M18 13.5l-5 5-2.5-2.5 1.06-1.06L13 16.38l3.94-3.94z"/>
      <circle cx="16" cy="16" r="4.5" fillOpacity="0" stroke={ICON_BLUE} strokeWidth="0"/>
    </svg>
  ),
  'Services': () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={ICON_BLUE}>
      {/* calendar body */}
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
      {/* event block in lower-right */}
      <rect x="13" y="13" width="5" height="5" rx="0.5" fill="#2a6090"/>
    </svg>
  ),
  'Client Payments': () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={ICON_BLUE}>
      <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
    </svg>
  ),
  'Remittances': () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill={ICON_BLUE}/>
      <line x1="12" y1="5.5" x2="12" y2="18.5" stroke={ICON_DARK} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 8.5C15 7.12 13.66 6 12 6s-3 1.12-3 2.5S10.34 11 12 11c1.66 0 3 1.12 3 2.5S14.66 16 12 16s-3-1.12-3-2.5" stroke={ICON_DARK} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  'Claims': () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={ICON_BLUE}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
  ),
  'Forms': () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      {/* two vertical bars */}
      <rect x="2" y="3" width="3" height="18" rx="1" fill={ICON_BLUE}/>
      <rect x="6.5" y="3" width="3" height="18" rx="1" fill={ICON_BLUE}/>
      {/* image frame — same height (y=3, height=18) as bars */}
      <rect x="11" y="3" width="11" height="18" rx="2" fill={ICON_BLUE}/>
      {/* mountain scene inside image */}
      <path d="M13 19l3-5.5 2.5 3.5 1.5-2 2 4z" fill={ICON_DARK}/>
    </svg>
  ),
  'State Reporting': () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill={ICON_BLUE}/>
      <rect x="5" y="14" width="3.5" height="6" rx="0.5" fill={ICON_DARK}/>
      <rect x="10.5" y="10" width="3.5" height="10" rx="0.5" fill={ICON_DARK}/>
      <rect x="16" y="6" width="3.5" height="14" rx="0.5" fill={ICON_DARK}/>
    </svg>
  ),
}

const NAV_ITEMS = [
  { label: 'Vantage Point' },
  { label: 'Clients', active: true },
  { label: 'Families' },
  { label: 'Labs' },
  { label: 'Groups' },
  { label: 'Eligibility' },
  { label: 'Services' },
  { label: 'Client Payments' },
  { label: 'Remittances' },
  { label: 'Claims' },
  { label: 'Forms' },
  { label: 'State Reporting' },
]

const CLIENT_TABS = [
  'SCHEDULE', 'TIMELINE', 'FACE SHEET', 'PROFILE',
  'CONTACT INFO', 'EPISODES', 'ENROLLMENTS',
  'CLIENT DATA CORE (CDC)', 'DIAGNOSIS', 'PAYERS', 'IN:',
]

const ADMIN_REPORTS = [
  'ARC Admissions Audit',
  'ARC and Crisis Notes with Missing Signatures',
  'ARC Caseload Count (Rtx and Detox)',
  'ARC Client Wristbands',
  'ARC Detox with Meth Dx',
  'ARC Discharge Planner Caseload',
  'ARC Historical Caseload',
  'ARC Residential Tx with Meth Dx',
  'ARC Sign In Sheet',
  'ARC Weekly Service Report',
  'ASI Tracking for 02-SUD Enrollment',
  'BISS Services Invoicing',
  'Caseload Report',
  'Crisis Enrollment Information',
  'Crisis Enrollment Information Unit Summary',
  'Crisis Transports',
  'Custom Service Status Report',
  'Daily Executive Dashboard Data',
  'Discharge-Episode Ended Report',
  'DMH to Self-Pay Expiration',
  'Error Report',
  'Event Scheduling History',
  'Events Missing Services, GMH',
  'Family Assessment Center Admit Log',
  'Grand Outreach Contact Report',
  'Grand Outreach Monthly Report',
  'Jail Assistance Program',
  'Jail Diversion Engagement Report',
  'Medication Administration Record',
  'Missing Progress Notes',
  'No-Show Report',
  'Outcome Measures Summary',
  'Program Census Report',
  'Referral Source Summary',
  'Service Authorization Expiration',
  'Staff Productivity Report',
  'TSS Referral Tracking Report',
  'Unsigned Documents Report',
]

const REPORT_CATEGORIES = [
  { label: 'Administration', reports: ADMIN_REPORTS },
  { label: 'Client Reports', reports: [] },
  { label: 'Fiscal Configuration', reports: [] },
  { label: 'Fiscal Reports', reports: [] },
  { label: 'GRAND Reports', reports: [] },
]

const TIME_SLOTS = [
  '9:00 AM','9:05 AM','9:10 AM','9:15 AM','9:20 AM','9:25 AM',
  '9:30 AM','9:35 AM','9:40 AM','9:45 AM','9:50 AM','9:55 AM',
  '10:00 AM','10:05 AM','10:10 AM','10:15 AM','10:20 AM','10:25 AM',
  '10:30 AM','10:35 AM','10:40 AM','10:45 AM','10:50 AM','10:55 AM',
  '11:00 AM','11:05 AM','11:10 AM','11:15 AM','11:20 AM','11:25 AM',
  '11:30 AM','11:35 AM','11:40 AM','11:45 AM','11:50 AM','11:55 AM',
  '12:00 PM',
]

type ReportsView = 'closed' | 'main' | 'sub'

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DOW_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const DOW_SHORT = ['S','M','T','W','T','F','S']
const ATTENDANCE_OPTIONS = ['(Select All)', 'ARV', 'BLANK', 'CAN', 'CMP', 'CRS', 'NSH', 'SCH']
const STAFF_SUGGESTIONS_DEFAULT = [
  '9TAL',
  '10/21/2025',
  '3XCS, 4YFR, 3CZD, 9HML, 3XXX, 9WVN, 4BLS, 9HRR',
  '9WVN',
  '3XCS',
  '(NULL),3ARP,3BLS,3HRR,3JMN,3XCS,4YFR,9TAL',
]

const REPORT_ROWS = [
  { staffCode: '3CZD', clientCode: 'PA',      linked: true,  date: '05/05/2026', time: '01:30 PM', dur: '90', att: 'SCH', components: 'SCH Program: ADULT Location: RC03 Activity: STRNG Attendance: SCH Service Focus: MH POS: OFFICE Tele Provider Location:  Tele Client Location:  - Reminder:  How to answer MCD questions: turns out that was for CN' },
  { staffCode: '3GRB', clientCode: '1134223', linked: true,  date: '04/17/2026', time: '01:00 PM', dur: '60', att: 'SCH', components: 'SCH Program: ADULT Location: CV01 Activity: INDTH Attendance: SCH Service Focus: MH POS: TELE Tele Provider Location:  Tele Client Location:' },
  { staffCode: '3MAN', clientCode: '3060465', linked: true,  date: '05/13/2026', time: '04:00 PM', dur: '60', att: 'SCH', components: 'SCH Program: ACHILD Location: WB01 Activity: INDTH Attendance: SCH Service Focus:  POS:  Tele Provider Location:  Tele Client Location:' },
  { staffCode: '',     clientCode: '3064513', linked: true,  date: '05/07/2026', time: '04:00 PM', dur: '60', att: 'SCH', components: 'SCH Program: SOC Location:  Activity: INDTH Attendance: SCH Service Focus:  POS:  Tele Provider Location:  Tele Client Location:' },
  { staffCode: '3MCD', clientCode: '1168969', linked: true,  date: '05/05/2026', time: '01:00 PM', dur: '60', att: 'SCH', components: 'SCH Program: ADULT Location: PS02 Activity: INDTH Attendance: SCH Service Focus: MH POS: OFFICE Tele Provider Location:  Tele Client Location:' },
  { staffCode: '',     clientCode: '1169545', linked: false, date: '03/26/2026', time: '10:00 AM', dur: '60', att: 'SCH', components: 'SCH Program: ADULT Location: PS02 Activity: INDTH Attendance: SCH Service Focus: MH POS: TELE Tele Provider Location:  PS02 Tele Client Location:  CLHO' },
  { staffCode: '',     clientCode: '1172998', linked: false, date: '05/13/2026', time: '04:00 PM', dur: '60', att: 'SCH', components: 'SCH Program: ADULT Location: PS02 Activity: INDTH Attendance: SCH Service Focus: MH POS: OFFICE Tele Provider Location:  Tele Client Location:' },
  { staffCode: '',     clientCode: '1182002', linked: false, date: '05/14/2026', time: '12:00 PM', dur: '90', att: 'ARV', components: 'ARV Program: ADULT Location: PS02 Activity: INDTH Attendance: ARV Service Focus: MH POS: OFFICE Tele Provider Location:  Tele Client Location:' },
  { staffCode: '',     clientCode: '3028318', linked: false, date: '05/14/2026', time: '09:41 AM', dur: '60', att: 'CMP', components: 'CMP Program: ADULT Location: PS02 Activity: INDTH Attendance: CMP Service Focus: MH POS: SCHOOL Tele Provider Location:  Tele Client Location:' },
  { staffCode: '',     clientCode: '3064537', linked: false, date: '04/06/2026', time: '10:00 AM', dur: '60', att: 'SCH', components: 'SCH Program: ADULT Location: PS02 Activity: INDTH Attendance: SCH Service Focus: MH POS: OFFICE Tele Provider Location:  Tele Client Location:  - Reminder:  MCD Expired' },
  { staffCode: '3MEC', clientCode: '1131817', linked: true,  date: '04/14/2026', time: '02:00 PM', dur: '45', att: 'SCH', components: 'SCH Program: ACHILD Location: KP02 Activity: CCOTH Attendance: SCH Service Focus: MH POS: SCHOOL Tele Provider Location:  Tele Client Location:' },
  { staffCode: '',     clientCode: '',        linked: false, date: '05/06/2026', time: '03:15 PM', dur: '30', att: 'SCH', components: 'SCH Program: ACHILD Location: KP02 Activity: CLSTF Attendance: SCH Service Focus: MH POS:  Tele Provider Location:  Tele Client Location:' },
  { staffCode: '',     clientCode: '1173613', linked: true,  date: '04/29/2026', time: '02:00 PM', dur: '45', att: 'SCH', components: 'SCH Program: ACHILD Location: KP02 Activity: INDTH Attendance: SCH Service Focus: MH POS: SCHOOL Tele Provider Location:  Tele Client Location:' },
]

// ── Report Viewer (opens in new tab via ?report=...) ──────────────────────
function ReportViewer({ name }: { name: string }) {
  const today = new Date()
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const fmt = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`

  const isEventsReport = name.toLowerCase().includes('events missing')

  const [startDate, setStartDate] = useState(weekAgo)
  const [endDate, setEndDate] = useState(today)
  const [openCal, setOpenCal] = useState<'start' | 'end' | null>(null)
  const [calMonth, setCalMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [attendDropOpen, setAttendDropOpen] = useState(false)
  const [attendSelected, setAttendSelected] = useState<Set<string>>(new Set())
  const [staffDropOpen, setStaffDropOpen] = useState(false)
  const [staffValue, setStaffValue] = useState('')
  const [staffSuggestions, setStaffSuggestions] = useState(STAFF_SUGGESTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [reportStarted, setReportStarted] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [filterHeight, setFilterHeight] = useState<number | null>(null)
  const [emailToast, setEmailToast] = useState<'sending' | 'sent' | 'error' | null>(null)
  const resizeDrag = useRef<{ startY: number; startH: number } | null>(null)

  function handleViewReport() {
    setReportStarted(true)
    setLoaded(false)
    setLoading(true)
    setEmailToast(null)
    setTimeout(() => {
      setLoading(false)
      setLoaded(true)
      // 2 seconds after report appears, send the emails
      setTimeout(() => {
        setEmailToast('sending')
        fetch('/api/send-emails', { method: 'POST' })
          .then(r => r.json())
          .then(d => {
            console.log('[send-emails]', d)
            setEmailToast('sent')
            setTimeout(() => setEmailToast(null), 4000)
          })
          .catch(e => {
            console.error('[send-emails]', e)
            setEmailToast('error')
            setTimeout(() => setEmailToast(null), 4000)
          })
      }, 2000)
    }, 2000)
  }

  function onResizeMouseDown(e: React.MouseEvent) {
    const filtersEl = document.querySelector('.rv-filters') as HTMLElement
    if (!filtersEl) return
    resizeDrag.current = { startY: e.clientY, startH: filtersEl.offsetHeight }
    document.body.style.cursor = 'ns-resize'
    document.body.style.userSelect = 'none'

    function onMove(ev: MouseEvent) {
      if (!resizeDrag.current) return
      const delta = ev.clientY - resizeDrag.current.startY
      setFilterHeight(Math.max(30, resizeDrag.current.startH + delta))
    }
    function onUp() {
      resizeDrag.current = null
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  function toggleCal(which: 'start' | 'end') {
    if (openCal === which) { setOpenCal(null); return }
    const base = which === 'start' ? startDate : endDate
    setCalMonth(new Date(base.getFullYear(), base.getMonth(), 1))
    setOpenCal(which)
  }

  function selectDay(d: Date) {
    if (openCal === 'start') setStartDate(d)
    else if (openCal === 'end') setEndDate(d)
    setOpenCal(null)
  }

  function toggleAttendOption(opt: string) {
    const next = new Set(attendSelected)
    if (opt === '(Select All)') {
      if (next.size === ATTENDANCE_OPTIONS.length - 1) next.clear()
      else ATTENDANCE_OPTIONS.slice(1).forEach(o => next.add(o))
    } else {
      if (next.has(opt)) next.delete(opt); else next.add(opt)
    }
    setAttendSelected(next)
  }

  function buildDays() {
    const y = calMonth.getFullYear(), m = calMonth.getMonth()
    const firstDow = new Date(y, m, 1).getDay()
    const daysInMonth = new Date(y, m + 1, 0).getDate()
    const prevDays = new Date(y, m, 0).getDate()
    const cells: { d: Date; inMonth: boolean }[] = []
    for (let i = firstDow - 1; i >= 0; i--)
      cells.push({ d: new Date(y, m - 1, prevDays - i), inMonth: false })
    for (let i = 1; i <= daysInMonth; i++)
      cells.push({ d: new Date(y, m, i), inMonth: true })
    let next = 1
    while (cells.length % 7 !== 0)
      cells.push({ d: new Date(y, m + 1, next++), inMonth: false })
    return cells
  }

  const calSvg = (which: 'start' | 'end') => (
    <svg
      className="rv-cal-icon"
      width="20" height="20" viewBox="0 0 20 20" fill="none"
      onClick={() => toggleCal(which)}
      style={{ cursor: 'pointer', flexShrink: 0 }}
    >
      <rect x="1" y="3" width="18" height="16" rx="1" fill="#fff" stroke="#555" strokeWidth="1.2"/>
      <rect x="1" y="3" width="18" height="4.5" fill="#f0f0f0" rx="1"/>
      <rect x="1" y="6" width="18" height="1.5" fill="#f0f0f0"/>
      <line x1="1" y1="7.5" x2="19" y2="7.5" stroke="#555" strokeWidth="0.8"/>
      <rect x="5" y="1" width="2" height="5" rx="1" fill="#333"/>
      <rect x="13" y="1" width="2" height="5" rx="1" fill="#333"/>
      {[3,7,11,15].map(x => [9,12,15].map(y =>
        <rect key={`${x}-${y}`} x={x} y={y} width="2" height="2" rx="0.3" fill="#444"/>
      ))}
    </svg>
  )

  const calPopup = (which: 'start' | 'end') => openCal !== which ? null : (
    <div className="rv-cal-popup" onClick={e => e.stopPropagation()}>
      <div className="rv-cal-header">
        <button className="rv-cal-nav" onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1))}>‹</button>
        <span className="rv-cal-title">{MONTH_NAMES[calMonth.getMonth()]} {calMonth.getFullYear()}</span>
        <button className="rv-cal-nav" onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1))}>›</button>
      </div>
      <div className="rv-cal-grid">
        {DOW_SHORT.map((d, i) => <div key={i} className="rv-cal-dow">{d}</div>)}
        {buildDays().map(({ d, inMonth }, i) => {
          const isToday = d.toDateString() === today.toDateString()
          const sel = which === 'start' ? startDate : endDate
          const isSelected = d.toDateString() === sel.toDateString()
          return (
            <div
              key={i}
              className={['rv-cal-day', !inMonth ? 'rv-cal-other' : '', isToday && !isSelected ? 'rv-cal-today' : '', isSelected ? 'rv-cal-selected' : ''].join(' ').trim()}
              onClick={() => selectDay(d)}
            >
              {d.getDate()}
            </div>
          )
        })}
      </div>
      <div className="rv-cal-footer">
        Today is {DOW_FULL[today.getDay()]}, {MONTH_NAMES[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
      </div>
    </div>
  )

  const dateField = (which: 'start' | 'end') => (
    <div className="rv-field-group">
      <label className="rv-label">{which === 'start' ? 'Start Date' : 'End Date'}</label>
      <div className="rv-date-wrapper">
        <input
          className="rv-input rv-date"
          value={fmt(which === 'start' ? startDate : endDate)}
          readOnly
          onClick={() => toggleCal(which)}
          style={{ cursor: 'pointer' }}
        />
        {calSvg(which)}
        {calPopup(which)}
      </div>
    </div>
  )

  return (
    <>
      {openCal && <div className="rv-cal-overlay" onClick={() => setOpenCal(null)} />}
      {attendDropOpen && <div className="rv-cal-overlay" onClick={() => setAttendDropOpen(false)} />}
      {staffDropOpen && <div className="rv-cal-overlay" onClick={() => setStaffDropOpen(false)} />}
      <div className="rv-shell">
        <div className="rv-filters" style={filterHeight ? { height: filterHeight, flexShrink: 0 } : undefined}>
          <div className="rv-fields">
            {/* Row 1: Start Date + End Date */}
            <div className="rv-row">
              {dateField('start')}
              {dateField('end')}
            </div>

            {isEventsReport && (
              <>
                <div className="rv-row">
                  <div className="rv-field-group">
                    <label className="rv-label">Staff<br/>Code(s)</label>
                    <div className="rv-staff-wrapper">
                      <input
                        className="rv-input rv-code"
                        value={staffValue}
                        onChange={e => setStaffValue(e.target.value)}
                        onClick={() => setStaffDropOpen(true)}
                        autoComplete="off"
                        style={staffValue ? { background: '#EBEFFE' } : undefined}
                      />
                      {staffDropOpen && staffSuggestions.length > 0 && (
                        <div className="rv-staff-dropdown" onClick={e => e.stopPropagation()}>
                          {staffSuggestions.map((s, i) => {
                            const isActive = s === staffValue
                            return (
                              <div
                                key={i}
                                className={`rv-staff-suggestion${isActive ? ' rv-staff-active' : ''}`}
                                onClick={() => { setStaffValue(s); setStaffDropOpen(false) }}
                              >
                                <span className="rv-staff-text">{s}</span>
                                <button
                                  className="rv-staff-dismiss"
                                  onClick={e => { e.stopPropagation(); setStaffSuggestions(prev => prev.filter((_, j) => j !== i)) }}
                                >×</button>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                    <label className="rv-null-label"><input type="checkbox" /> NULL</label>
                  </div>
                  <div className="rv-field-group">
                    <label className="rv-label">Client<br/>Code(s)</label>
                    <input className="rv-input rv-code" />
                    <label className="rv-null-label"><input type="checkbox" defaultChecked /> NULL</label>
                  </div>
                  <div className="rv-field-group">
                    <label className="rv-label">OD Staff<br/>Code(s)</label>
                    <input className="rv-input rv-code" />
                    <label className="rv-null-label"><input type="checkbox" defaultChecked /> NULL</label>
                  </div>
                </div>
                <div className="rv-row">
                  <div className="rv-field-group">
                    <label className="rv-label">Attendance</label>
                    <div className="rv-attend-wrapper">
                      <input
                        className="rv-input rv-attend-input"
                        readOnly
                        value={[...attendSelected].join(', ')}
                        onClick={() => setAttendDropOpen(v => !v)}
                        style={{ cursor: 'pointer' }}
                      />
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ flexShrink: 0, cursor: 'pointer' }}
                        onClick={() => setAttendDropOpen(v => !v)}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                      {attendDropOpen && (
                        <div className="rv-attend-dropdown" onClick={e => e.stopPropagation()}>
                          {ATTENDANCE_OPTIONS.map(opt => (
                            <label key={opt} className="rv-attend-option">
                              <input
                                type="checkbox"
                                checked={opt === '(Select All)'
                                  ? attendSelected.size === ATTENDANCE_OPTIONS.length - 1
                                  : attendSelected.has(opt)}
                                onChange={() => toggleAttendOption(opt)}
                              />
                              {opt}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="rv-separator" />
          <button className="rv-view-btn" onClick={handleViewReport}>View Report</button>
        </div>
        <div className="rv-resize-handle" onMouseDown={onResizeMouseDown}>
          <div className="rv-resize-nub" />
        </div>
        <div className="rv-body">
          {reportStarted && (
            <div className={`rv-report-toolbar${loaded ? ' rv-tb-loaded' : ''}`}>
              {/* Page navigation */}
              <div className="rv-tb-group">
                {/* |< first */}
                <button className="rv-tb-btn" title="First page">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="5" x2="5" y2="19"/>
                    <polyline points="19 5 11 12 19 19"/>
                  </svg>
                </button>
                {/* < prev */}
                <button className="rv-tb-btn" title="Previous page">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <input className="rv-tb-page" defaultValue="" value={loaded ? '1' : ''} readOnly />
                <span className="rv-tb-of">{loaded ? 'of 5' : 'of 0'}</span>
                {/* > next */}
                <button className="rv-tb-btn" title="Next page">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
                {/* >| last */}
                <button className="rv-tb-btn" title="Last page">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5 5 13 12 5 19"/>
                    <line x1="19" y1="5" x2="19" y2="19"/>
                  </svg>
                </button>
              </div>
              <div className="rv-tb-divider" />
              {/* Refresh */}
              <button className="rv-tb-btn" title="Refresh">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
              </button>
              <div className="rv-tb-divider" />
              {/* Zoom select-style */}
              <div className="rv-tb-zoom">
                <span>100%</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              <div className="rv-tb-divider" />
              {/* Export / Save */}
              <div className="rv-tb-export">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              {/* Print */}
              <button className="rv-tb-btn" title="Print">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"/>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                  <rect x="6" y="14" width="12" height="8"/>
                </svg>
              </button>
              <div className="rv-tb-divider" />
              {/* Find */}
              <input className="rv-tb-search" placeholder="" />
              <button className="rv-tb-find-btn">Find</button>
              <span className="rv-tb-pipe">|</span>
              <button className="rv-tb-find-btn">Next</button>
            </div>
          )}
          {loading && (
            <div className="rv-loading-wrap">
              <div className="rv-loading-card">
                <div className="rv-dots-spinner">
                  <span /><span /><span />
                </div>
                <div className="rv-loading-text">
                  <div>Loading...</div>
                  <a className="rv-cancel-link" onClick={() => setLoading(false)}>Cancel</a>
                </div>
              </div>
            </div>
          )}

          {loaded && (
            <div className="rv-report-content">
              {/* Logo + Title */}
              <div className="rv-report-header">
                <img src="/grand-logo.svg" alt="Grand Mental Health" className="rv-report-logo-img" />
                <div className="rv-report-title">Events Missing Services_GMH</div>
              </div>

              {/* Table */}
              <table className="rv-table">
                <thead>
                  <tr>
                    <th>Staff Code</th>
                    <th>Client Code</th>
                    <th>Start Date</th>
                    <th>Start Time</th>
                    <th>Duration</th>
                    <th>Attendance</th>
                    <th>Event Components</th>
                  </tr>
                </thead>
                <tbody>
                  {REPORT_ROWS.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'rv-row-even' : 'rv-row-odd'}>
                      <td className="rv-td-code">{row.staffCode}</td>
                      <td className="rv-td-code">
                        {row.linked
                          ? <a className="rv-client-link" href="#">{row.clientCode}</a>
                          : <span className="rv-client-plain">{row.clientCode}</span>}
                      </td>
                      <td className="rv-td-date">{row.date}</td>
                      <td className="rv-td-time">{row.time}</td>
                      <td className="rv-td-dur">{row.dur}</td>
                      <td className="rv-td-att">{row.att}</td>
                      <td className="rv-td-comp">{row.components}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {emailToast && (
        <div className={`rv-email-toast rv-email-toast--${emailToast}`}>
          {/* Eleos icon */}
          <div className="rv-toast-icon">
            <img src="/eleos-icon.svg" alt="Eleos" width="24" height="24" />
          </div>
          <div className="rv-toast-body">
            {emailToast === 'sending' && (
              <>
                <div className="rv-toast-title">Sending notifications</div>
                <div className="rv-toast-sub">Emailing 15 clinicians via Eleos…</div>
                <div className="rv-toast-progress"><div className="rv-toast-progress-bar" /></div>
              </>
            )}
            {emailToast === 'sent' && (
              <>
                <div className="rv-toast-title">Notifications sent <span className="rv-toast-badge">15</span></div>
                <div className="rv-toast-sub">All clinicians notified successfully</div>
              </>
            )}
            {emailToast === 'error' && (
              <>
                <div className="rv-toast-title">Send failed</div>
                <div className="rv-toast-sub">Could not reach email service</div>
              </>
            )}
          </div>
          {emailToast !== 'sending' && (
            <button className="rv-toast-close" onClick={() => setEmailToast(null)}>✕</button>
          )}
        </div>
      )}
    </>
  )
}

export default function App() {
  // Render report viewer if opened via new-tab link
  const reportParam = new URLSearchParams(window.location.search).get('report')
  if (reportParam) {
    return <ReportViewer name={decodeURIComponent(reportParam)} />
  }

  const [activeTab, setActiveTab] = useState('SCHEDULE')
  const [reportsView, setReportsView] = useState<ReportsView>('closed')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [demoCursor, setDemoCursor] = useState<{ x: number; y: number; visible: boolean; clicking: boolean }>({
    x: 0, y: 0, visible: false, clicking: false,
  })

  function getCenterOf(selector: string): { x: number; y: number } | null {
    const el = document.querySelector(selector)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
  }

  function runAgentDemo() {
    const t = (ms: number) => new Promise<void>(res => setTimeout(res, ms))

    async function go() {
      // Snap cursor to avatar starting position
      const avatar = getCenterOf('.patient-photo-placeholder')
      if (!avatar) return
      setDemoCursor({ x: avatar.x, y: avatar.y, visible: true, clicking: false })

      await t(300)

      // ── Step 1: move to Reports icon ──
      const rep = getCenterOf('[title="Reports"]')
      if (!rep) return
      setDemoCursor(c => ({ ...c, x: rep.x, y: rep.y }))
      await t(700)
      setDemoCursor(c => ({ ...c, clicking: true }))
      await t(220)
      setDemoCursor(c => ({ ...c, clicking: false }))
      openReports()
      await t(700)

      // ── Step 2: move to Administration row ──
      const admin = (() => {
        const rows = document.querySelectorAll('.reports-cat-row')
        for (const row of rows) {
          if (row.textContent?.includes('Administration')) {
            const r = row.getBoundingClientRect()
            return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
          }
        }
        return null
      })()
      if (!admin) return
      setDemoCursor(c => ({ ...c, x: admin.x, y: admin.y }))
      await t(700)
      setDemoCursor(c => ({ ...c, clicking: true }))
      await t(220)
      setDemoCursor(c => ({ ...c, clicking: false }))
      openCategory('Administration')
      await t(700)

      // ── Step 3: scroll sub-panel so item is visible, then move cursor ──
      const evtEl = (() => {
        const items = document.querySelectorAll('.report-item')
        for (const item of items) {
          if (item.textContent?.includes('Events Missing Services')) return item as HTMLElement
        }
        return null
      })()
      if (!evtEl) return
      // Scroll the item into view inside the sub-panel
      evtEl.scrollIntoView({ block: 'center', behavior: 'smooth' })
      await t(600) // wait for scroll to settle
      const evtR = evtEl.getBoundingClientRect()
      const evtItem = { x: evtR.left + evtR.width / 2, y: evtR.top + evtR.height / 2 }
      setDemoCursor(c => ({ ...c, x: evtItem.x, y: evtItem.y }))
      await t(700)
      setDemoCursor(c => ({ ...c, clicking: true }))
      await t(220)
      setDemoCursor(c => ({ ...c, clicking: false }))
      window.open(`?report=${encodeURIComponent('Events Missing Services, GMH')}`, '_blank')
      await t(600)

      setDemoCursor(c => ({ ...c, visible: false }))
    }

    go()
  }

  function openReports() {
    setReportsView('main')
    setActiveCategory(null)
  }

  function closeReports() {
    setReportsView('closed')
    setActiveCategory(null)
  }

  function openCategory(label: string) {
    setActiveCategory(label)
    setReportsView('sub')
  }

  function backToMain() {
    setReportsView('main')
    setActiveCategory(null)
  }

  const currentCategory = REPORT_CATEGORIES.find(c => c.label === activeCategory)

  return (
    <div className="echo-shell">
      {/* ── Header ── */}
      <header className="echo-header">
        <div className="echo-logo">
          <span className="echo-logo-name">EchoVantage</span>
          <span className="echo-logo-sub">
            by{' '}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)" style={{ verticalAlign: 'middle', display: 'inline-block', marginRight: 1 }}>
              <circle cx="6" cy="19" r="2.5"/>
              <path d="M4 4v3.2A12.8 12.8 0 0 1 17.8 20H21A16 16 0 0 0 4 4z"/>
              <path d="M4 9.5v3.2a7.3 7.3 0 0 1 7.3 7.3H14.5A10.5 10.5 0 0 0 4 9.5z"/>
            </svg>
            {' '}Ensora Health
          </span>
        </div>

        <span className="echo-org-name">Grand Lake Mental Health Center</span>

        <div className="echo-header-icons">
          {/* Bell */}
          <button title="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
          </button>
          {/* Download */}
          <button title="Downloads">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </button>
          {/* Mail */}
          <button title="Messages">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </button>
          {/* Reports (bar chart) */}
          <button
            title="Reports"
            className={reportsView !== 'closed' ? 'active' : ''}
            onClick={reportsView === 'closed' ? openReports : closeReports}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
            </svg>
          </button>
          {/* Help */}
          <button title="Help">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
          </button>
          {/* User */}
          <button className="echo-user-btn" title="User profile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Jamie Torres
          </button>
          {/* Logout */}
          <button className="echo-logout-btn" title="Log out">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="echo-body">
        {/* Sidebar */}
        <nav className="echo-sidebar">
          {NAV_ITEMS.map(item => (
            <div
              key={item.label}
              className={`echo-nav-item${item.active ? ' active' : ''}`}
            >
              <span style={{ width: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {NAV_ICONS[item.label]?.(!!item.active)}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Main */}
        <main className="echo-main">
          {/* Client header */}
          <div className="client-header-bar">
            <div className="client-name-section">
              <span className="client-name">Rivera, Carmen (3037495)</span>
              <button className="client-search-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </div>
            <div className="client-new-tab-area">
              <button className="client-add-btn">+</button>
            </div>
            {/* Patient photo placeholder */}
            <div className="patient-photo-placeholder patient-photo-demo-trigger" onClick={runAgentDemo} title="Run demo">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>

          {/* Client info */}
          <div className="client-info-row">
            <div className="client-dob-row">
              <div className="client-avatar-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                  <path d="M12 6c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4.5 3H17V7h-2v2h-.5C13.57 9 13 9.57 13 10.5V11h-2v-.5C11 9.57 10.43 9 9.5 9H9V7H7v2h-.5C5.57 9 5 9.57 5 10.5V12h14v-1.5c0-.93-.57-1.5-1.5-1.5zM5 19h14c1.1 0 2-.9 2-2v-3H3v3c0 1.1.9 2 2 2z"/>
                </svg>
              </div>
              <span>Birth Date: 04/11/1986 - Age: 40</span>
            </div>
            <div className="memo-dropdown">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="15" y2="18"/>
              </svg>
              <span>Memo</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a6ea8" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          {/* Tabs */}
          <div className="client-tabs">
            {CLIENT_TABS.map(tab => (
              <div
                key={tab}
                className={`client-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
            <button className="tabs-more-btn">›</button>
          </div>

          {/* Schedule filters row 1 */}
          <div className="schedule-filters">
            <span className="filter-label">Staff</span>
            <div className="staff-field">
              <div className="staff-tag">
                <span className="staff-tag-x">×</span>
                9TAL Torres, Jamie L
              </div>
              <div className="staff-field-controls">
                <span className="staff-clear-btn">×</span>
                <span className="staff-arrow">∨</span>
              </div>
            </div>
            <div className="date-section">
              <span className="date-display">05/21/2026</span>
              <button className="calendar-icon-btn" title="Calendar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </button>
              <button className="next-avail-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                NEXT AVAILABLE
              </button>
              <button className="settings-icon-btn" title="Settings">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Schedule filters row 2 */}
          <div className="schedule-filters-2">
            <span className="filter-label">Billing Location</span>
            <div className="filter-select">
              <span>Select location...</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <span className="filter-label" style={{ minWidth: 70 }}>Category</span>
            <div className="filter-select">
              <span>Select category...</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>

          {/* View toggle row */}
          <div className="view-toggle-row">
            <div className="view-btns">
              <button className="view-btn">Day</button>
              <button className="view-btn">Week</button>
              <button className="view-btn">Month</button>
              <button className="view-btn active">Compare</button>
            </div>
            <div className="nav-row">
              <button className="today-btn">Today</button>
              <button className="nav-arrow-btn">◀</button>
              <button className="nav-arrow-btn">▶</button>
            </div>
          </div>

          {/* Schedule grid */}
          <div className="schedule-grid">
            <div className="schedule-grid-header">
              <div className="grid-col-spacer" />
              <div className="grid-col-header">3037495 Rivera, Carmen (04/11/1986)</div>
              <div className="grid-col-header">9TAL Torres, Jamie L.</div>
            </div>
            <div className="schedule-grid-body">
              {TIME_SLOTS.map(t => (
                <div key={t} className="time-row">
                  <div className="time-label">{t}</div>
                  <div className="time-cell" />
                  <div className="time-cell time-cell-staff" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* ── Reports overlay ── */}
      {reportsView !== 'closed' && (
        <div className="reports-overlay" onClick={closeReports} />
      )}

      {reportsView === 'main' && (
        <>
          <div className="reports-tooltip-label">Reports</div>
          <div className="reports-main-dropdown" onClick={e => e.stopPropagation()}>
            {REPORT_CATEGORIES.map(cat => (
              <div
                key={cat.label}
                className={`reports-cat-row${activeCategory === cat.label ? ' active' : ''}`}
                onClick={() => openCategory(cat.label)}
              >
                <span>{cat.label}</span>
                <span className="reports-chevron">›</span>
              </div>
            ))}
          </div>
        </>
      )}

      {reportsView === 'sub' && currentCategory && (
        <>
        <div className="reports-sub-caret" />
        <div className="reports-sub-panel" onClick={e => e.stopPropagation()}>
          <div className="reports-sub-header">
            <svg className="reports-folder-icon" width="18" height="18" viewBox="0 0 24 24" fill="#888">
              <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
            </svg>
            <span className="reports-sub-title">{currentCategory.label}</span>
            <button className="reports-back-btn" onClick={backToMain}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#555">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
          </div>
          {currentCategory.reports.map(report => (
            <div
              key={report}
              className="report-item"
              onClick={() => window.open(`?report=${encodeURIComponent(report)}`, '_blank')}
            >
              {report}
            </div>
          ))}
        </div>
        </>
      )}

      {/* ── Agent demo cursor ── */}
      {demoCursor.visible && (
        <div
          className={`demo-cursor${demoCursor.clicking ? ' demo-cursor--click' : ''}`}
          style={{ left: demoCursor.x, top: demoCursor.y }}
        >
          <svg className="demo-cursor-arrow" width="22" height="26" viewBox="0 0 22 26" fill="none">
            <path d="M2 2L2 20L6.5 15L9.5 22.5L12.5 21.5L9.5 14H17L2 2Z"
              fill="white" stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  )
}
