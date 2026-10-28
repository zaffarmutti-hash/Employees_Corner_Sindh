'use client';

import { useState } from 'react';
import Tr22App from './Tr22App';

/* ── Dashboard cards configuration ─────────────────────────────────────── */
const DASHBOARD_CARDS = [
  {
    id: 'tr22',
    icon: '📄',
    title: 'T.R. Form / Arrears Bill Proforma',
    subtitle: 'Form T.R. 22 · Treasury Rule 265',
    desc: 'Generate complete digitized 4-page Arrears Pay Bill for non-gazetted staff, including Obverse summary, month-wise arrears statement, deductions, and sanction certificates.',
    status: 'Ready to Use',
    clickable: true,
    color: '#0b5d3b',
    btnText: 'Open Proforma →',
  },
  {
    id: 'pension',
    icon: '🧮',
    title: 'Pension & FO-2 Dossier',
    subtitle: 'Civil Service Retirement Calculations',
    desc: 'Compute gross pension, 35% commutation value, net monthly pension, and prepare Form FO-2 dossier sheets for retiring employees.',
    status: 'Coming Soon',
    clickable: false,
    color: '#0284c7',
  },
  {
    id: 'archive',
    icon: '📂',
    title: 'Digital Bills & Records Archive',
    subtitle: 'Bill History & Cloud Backup',
    desc: 'Browse, manage, and retrieve previously created salary bills, arrears records, and employee profiles with easy one-click reload.',
    status: 'Coming Soon',
    clickable: false,
    color: '#7c3aed',
  },
  {
    id: 'faq',
    icon: '📚',
    title: 'Rules & Treasury Guidelines',
    subtitle: 'Administrative Knowledge Base',
    desc: 'Step-by-step guides for Treasury Rule 265, admissible allowance rules, pay fixation instructions, and common audit objections.',
    status: 'Coming Soon',
    clickable: false,
    color: '#d97706',
  },
  {
    id: 'gpfund',
    icon: '💰',
    title: 'GP Fund Statement & Interest',
    subtitle: 'General Provident Fund Ledger',
    desc: 'Calculate annual compound interest on GP Fund subscriptions, project closing balances, and generate printable statement sheets.',
    status: 'Coming Soon',
    clickable: false,
    color: '#059669',
  },
  {
    id: 'increments',
    icon: '📈',
    title: 'Increment & Pay Scale Planner',
    subtitle: 'Annual Increments & Fixations',
    desc: 'Estimate future basic pay scales, track annual December increments, and verify allowance revisions across basic pay scales.',
    status: 'Coming Soon',
    clickable: false,
    color: '#db2777',
  },
];

/* ── Navigation bar items (DDO & Object removed) ──────────────────────── */
const NAV_ITEMS = [
  { id: 'home', icon: '🏠', label: 'Home', clickable: true },
  { id: 'tr22', icon: '📄', label: 'T.R. Form / Arrears Bill Proforma', clickable: true },
  { id: 'pension', icon: '🧮', label: 'Pension & FO-2', clickable: false, soon: true },
  { id: 'archive', icon: '📂', label: 'Digital Records', clickable: false, soon: true },
  { id: 'faq', icon: '📚', label: 'Rules & Guide', clickable: false, soon: true },
];

export default function EmployeesCornerPortal() {
  const [activeTab, setActiveTab] = useState('home');

  const navigateTo = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="portal-wrapper">
      {/* ── Top Header ── */}
      <header className="portal-header">
        <div className="portal-brand-row">
          <div className="portal-brand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
            <img
              src="/logo.png"
              alt="Employees Corner Sindh Logo"
              className="portal-logo"
            />
            <div className="portal-titles">
              <span className="portal-badge-pill">Community Utility Portal</span>
              <h1 className="portal-main-title">Employees Corner Sindh</h1>
              <p className="portal-tagline">Ease-of-Access Utilities for Teachers &amp; Non-Gazetted Staff</p>
            </div>
          </div>
          <div className="portal-header-meta">
            <span className="portal-edition-chip">v3.8 · Independent Utility</span>
          </div>
        </div>

        {/* ── Enhanced Nav Bar ── */}
        <nav className="portal-nav-bar" aria-label="Portal Navigation">
          <div className="portal-nav-container">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              if (item.clickable) {
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`portal-nav-btn ${isActive ? 'active' : ''}`}
                    type="button"
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={item.id}
                  disabled
                  className="portal-nav-btn nav-btn-disabled"
                  type="button"
                  title={`${item.label} — Coming Soon`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-soon-pill">Soon</span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* ── Main Content Area ── */}
      <main className="portal-content">
        {/* ── HOME DASHBOARD ── */}
        {activeTab === 'home' && (
          <div className="dashboard-section">
            {/* Hero Welcome Banner */}
            <div className="dashboard-hero">
              <div className="hero-content">
                <span className="hero-pill">Welcome to Employees Corner Sindh</span>
                <h2 className="hero-title">Administrative Ease for Teachers &amp; Staff</h2>
                <p className="hero-desc">
                  An independent digital workspace created to assist education staff, teachers, and
                  non-gazetted employees in Sindh with pay bill documentation, arrears claims, and service calculations.
                </p>
              </div>
              <div className="hero-highlight-card" onClick={() => navigateTo('tr22')}>
                <div className="highlight-tag">Active Utility</div>
                <div className="highlight-title">📄 Form T.R. 22 Arrears Bill Proforma</div>
                <p className="highlight-text">
                  Fully operational 4-page pay bill generator compliant with Treasury Rule 265. Click to begin creating or printing your arrears bill.
                </p>
                <span className="highlight-action">Open Arrears Bill Form →</span>
              </div>
            </div>

            {/* Dashboard Modules Grid */}
            <div className="dashboard-grid-header">
              <h3 className="section-title">Portal Modules &amp; Utilities</h3>
              <p className="section-subtitle">
                Select an active module below or explore upcoming utilities currently under development.
              </p>
            </div>

            <div className="dashboard-grid">
              {DASHBOARD_CARDS.map((card) => {
                if (card.clickable) {
                  return (
                    <div
                      key={card.id}
                      className="dash-card dash-card-active"
                      style={{ '--accent-color': card.color }}
                      onClick={() => navigateTo(card.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && navigateTo(card.id)}
                      aria-label={`Open ${card.title}`}
                    >
                      <div className="card-top-bar">
                        <span className="card-icon-box">{card.icon}</span>
                        <span className="card-badge card-badge-ready">{card.status}</span>
                      </div>
                      <h4 className="card-title">{card.title}</h4>
                      <div className="card-subtitle">{card.subtitle}</div>
                      <p className="card-desc">{card.desc}</p>
                      <div className="card-footer">
                        <span className="card-btn-action">{card.btnText}</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={card.id}
                    className="dash-card dash-card-disabled"
                    style={{ '--accent-color': card.color }}
                    aria-disabled="true"
                    title={`${card.title} — Coming Soon`}
                  >
                    <div className="card-top-bar">
                      <span className="card-icon-box card-icon-muted">{card.icon}</span>
                      <span className="card-badge card-badge-soon">{card.status}</span>
                    </div>
                    <h4 className="card-title">{card.title}</h4>
                    <div className="card-subtitle">{card.subtitle}</div>
                    <p className="card-desc">{card.desc}</p>
                    <div className="card-footer">
                      <span className="card-btn-disabled">Under Development</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TR22 ARREARS BILL PROFORMA ── */}
        <div style={{ display: activeTab === 'tr22' ? 'block' : 'none' }}>
          {/* Top Breadcrumb & Return Bar */}
          <div className="module-top-bar">
            <button
              onClick={() => navigateTo('home')}
              className="btn-return-home"
              type="button"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
            <div className="module-breadcrumbs">
              <span className="breadcrumb-link" onClick={() => navigateTo('home')}>Home</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">T.R. Form / Arrears Bill Proforma (T.R. 22)</span>
            </div>
          </div>

          <Tr22App />
        </div>
      </main>

      {/* ── Portal Footer ── */}
      <footer className="portal-footer">
        <div className="portal-footer-grid">
          <div>
            <div className="footer-col-title">Employees Corner Sindh</div>
            <p className="footer-col-desc">
              Dedicated community utility for teachers, non-gazetted employees, and education staff in Sindh.
              Facilitates standardized pay bill preparation under Treasury Rule 265.
            </p>
            <p className="footer-col-notice">
              Non-official community initiative · Independent utility
            </p>
          </div>
          <div>
            <div className="footer-col-title">Available Modules</div>
            <ul className="footer-col-list">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('tr22')}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#93c5fd', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
                >
                  ✓ T.R. Form / Arrears Bill Proforma (T.R. 22)
                </button>
              </li>
              <li>• Pension &amp; FO-2 Dossier <em>(coming soon)</em></li>
              <li>• Digital Bills &amp; Records Archive <em>(coming soon)</em></li>
              <li>• Rules &amp; Treasury FAQ <em>(coming soon)</em></li>
              <li>• GP Fund Statement <em>(coming soon)</em></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Author &amp; Dedication</div>
            <div className="footer-col-desc">
              Designed &amp; developed by <b>Asif Ali Shar</b>.<br />
              Built to simplify administrative workflows and pay bill processing for education staff.
            </div>
          </div>
        </div>
        <div className="portal-footer-bottom">
          <span>© 2026 Employees Corner Sindh. Independent educational &amp; administrative utility.</span>
          <span>Standard Form T.R. 22 proforma compliant with Treasury Rule 265</span>
        </div>
      </footer>
    </div>
  );
}
