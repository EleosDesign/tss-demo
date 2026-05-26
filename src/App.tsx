import { useState } from 'react'
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
  'Events Missing Services_GMH',
  'Family Assessment Center Admit Log',
  'Grand Outreach Contact Report',
  'Grand Outreach Monthly Report',
  'TSS Referral Tracking Report',
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

export default function App() {
  const [activeTab, setActiveTab] = useState('SCHEDULE')
  const [reportsView, setReportsView] = useState<ReportsView>('closed')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
          {/* Download */}
          <button title="Downloads">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
          {/* Mail */}
          <button title="Messages">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </button>
          {/* Reports (bar chart) */}
          <button
            title="Reports"
            className={reportsView !== 'closed' ? 'active' : ''}
            onClick={reportsView === 'closed' ? openReports : closeReports}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </button>
          {/* Help */}
          <button title="Help">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </button>
          {/* User */}
          <button className="echo-user-btn" title="User profile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Tiffany Coggins
          </button>
          {/* Logout */}
          <button className="echo-logout-btn" title="Log out">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
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
            <div className="client-name-row">
              <span className="client-name">Peterson, Miriam (3037495)</span>
              <button className="client-search-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
              <button className="client-add-btn">+</button>
            </div>
            {/* Patient photo placeholder */}
            <div className="patient-photo-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          </div>

          {/* Client info */}
          <div className="client-info-row">
            <div className="client-dob-row">
              <div className="client-avatar-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span>Birth Date: 04/11/1986 - Age: 40</span>
            </div>
            <div className="memo-dropdown">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="7" y1="8" x2="17" y2="8"/>
                <line x1="7" y1="12" x2="17" y2="12"/>
                <line x1="7" y1="16" x2="13" y2="16"/>
              </svg>
              <span>Memo</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          {/* Tabs */}
          <div className="client-tabs">
            {CLIENT_TABS.slice(0, 10).map(tab => (
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
                <span className="staff-tag-x">✕</span>
                9TAL Coggins, Tiffany L
              </div>
              <span className="staff-arrow">▼</span>
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
              <span style={{ color: '#888', fontSize: 11 }}>▼</span>
            </div>
            <span className="filter-label" style={{ minWidth: 70 }}>Category</span>
            <div className="filter-select">
              <span>Select category...</span>
              <span style={{ color: '#888', fontSize: 11 }}>▼</span>
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
              <div className="grid-col-header">3037495 Peterson, Miriam (04/11/1986)</div>
              <div className="grid-col-header">9TAL Coggins, Tiffany L.</div>
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
        <div className="reports-main-dropdown" onClick={e => e.stopPropagation()}>
          <div className="reports-tooltip-label">Reports</div>
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
      )}

      {reportsView === 'sub' && currentCategory && (
        <div className="reports-sub-panel" onClick={e => e.stopPropagation()}>
          <div className="reports-sub-header">
            <span className="reports-folder-icon">📁</span>
            <span className="reports-sub-title">{currentCategory.label}</span>
            <button className="reports-back-btn" onClick={backToMain}>‹</button>
          </div>
          {currentCategory.reports.map(report => (
            <div key={report} className="report-item">
              {report}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
