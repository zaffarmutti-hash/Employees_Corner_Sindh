'use client';

import { useState } from 'react';
import Tr22App from './Tr22App';
import PensionCalculator from './PensionCalculator';
import DigitalRecordsArchive from './DigitalRecordsArchive';
import DdoDirectory from './DdoDirectory';
import SeoKnowledgeBase from './SeoKnowledgeBase';

export default function EmployeesCornerPortal() {
  const [activeTab, setActiveTab] = useState('tr22');

  const handleSelectBill = (id) => {
    setActiveTab('tr22');
    setTimeout(() => {
      const sel = document.querySelector('#srv');
      if (sel) {
        sel.value = id;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 150);
  };

  return (
    <div className="portal-wrapper">
      {/* Official Government Portal Header */}
      <header className="portal-header">
        <div className="portal-brand-row">
          <div className="portal-brand">
            <img
              src="/logo.png"
              alt="Employees Corner Sindh Logo"
              className="portal-logo"
            />
            <div className="portal-titles">
              <span className="gov-badge">Government of Sindh · Finance &amp; Education Portal</span>
              <h1 className="portal-main-title">Employees Corner Sindh</h1>
              <p className="portal-tagline">Your Digital Workplace for a Better Tomorrow</p>
            </div>
          </div>
          <div className="portal-header-actions">
            <div className="portal-quick-info">
              <span><b>DDO Treasury Support:</b> TR-265 &amp; Form 2 (FO-2)</span>
              <span><b>Portal Version:</b> 3.8 Professional (2026 Edition)</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="portal-nav-bar" aria-label="Portal Modules">
          <button
            onClick={() => setActiveTab('tr22')}
            className={`portal-nav-btn ${activeTab === 'tr22' ? 'active' : ''}`}
          >
            <span className="icon">📄</span>
            <span>Form T.R.22 Arrears Bill</span>
          </button>
          <button
            onClick={() => setActiveTab('pension')}
            className={`portal-nav-btn ${activeTab === 'pension' ? 'active' : ''}`}
          >
            <span className="icon">🧮</span>
            <span>Pension &amp; FO-2 Dossier</span>
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={`portal-nav-btn ${activeTab === 'archive' ? 'active' : ''}`}
          >
            <span className="icon">📂</span>
            <span>Digital Bills &amp; Records</span>
          </button>
          <button
            onClick={() => setActiveTab('ddo')}
            className={`portal-nav-btn ${activeTab === 'ddo' ? 'active' : ''}`}
          >
            <span className="icon">🏛</span>
            <span>DDO &amp; Object Codes</span>
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`portal-nav-btn ${activeTab === 'faq' ? 'active' : ''}`}
          >
            <span className="icon">📚</span>
            <span>Rules &amp; FAQ</span>
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="portal-content">
        <div style={{ display: activeTab === 'tr22' ? 'block' : 'none' }}>
          <Tr22App />
        </div>

        {activeTab === 'pension' && <PensionCalculator />}
        {activeTab === 'archive' && <DigitalRecordsArchive onSelectBill={handleSelectBill} />}
        {activeTab === 'ddo' && <DdoDirectory />}
        {activeTab === 'faq' && <SeoKnowledgeBase />}
      </main>

      {/* SEO Footer */}
      <footer className="portal-footer">
        <div className="portal-footer-grid">
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 6 }}>
              Employees Corner Sindh
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: '#d1d5db', margin: 0 }}>
              The comprehensive digital platform for Government of Sindh employees, DDOs, teachers, and accounts officers. Facilitates digitized pay bill preparation under Treasury Rule 265 and civil service retirement pensions under Sindh Pension Rules.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 6 }}>
              Core Digital Modules
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: '#d1d5db', lineHeight: 1.8 }}>
              <li>• Form T.R.22 Arrears Pay Bill Generator</li>
              <li>• Pension Form 2 (FO-2) &amp; Commutation Sheet</li>
              <li>• PIFRA / SAP Object Codes &amp; Allowance Heads</li>
              <li>• District Accounts Offices (DAO) Directory</li>
            </ul>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 6 }}>
              Author &amp; Attribution
            </div>
            <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.5 }}>
              Created &amp; designed by <b>Asif Ali Shar</b>.<br />
              Dedicated to modernizing public service administration and digital payroll processing across the Province of Sindh.
            </div>
          </div>
        </div>
        <div className="portal-footer-bottom">
          <span>© 2026 Employees Corner Sindh. All Rights Reserved.</span>
          <span>Form T.R.22 compliant with Treasury Rule 265 &amp; Sindh Civil Servants Pension Rules</span>
        </div>
      </footer>
    </div>
  );
}

