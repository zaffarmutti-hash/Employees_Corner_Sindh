'use client';

import { useState } from 'react';

const OBJECT_CODES = [
  { code: 'A01101', title: 'Basic Pay of Officers (BPS 17 to 22)', cat: 'Pay', desc: 'Standard PIFRA pay object code for Gazetted Officers in government service.' },
  { code: 'A01151', title: 'Basic Pay of Other Staff / Officials (BPS 01 to 16)', cat: 'Pay', desc: 'Standard PIFRA pay code for Non-Gazetted staff and teachers (BPS-1 to 16).' },
  { code: '013', title: 'Personal Pay', cat: 'Pay', desc: 'Pay granted to save from loss of emoluments on promotion or special rules.' },
  { code: '014', title: 'Special Pay', cat: 'Pay', desc: 'Special addition to pay granted for arduous nature of duties.' },
  { code: 'A01202', title: 'House Rent Allowance (HRA)', cat: 'Allowance', desc: '45% of basic pay (Big cities like Karachi, Hyderabad) or 30% in other stations.' },
  { code: 'A01203', title: 'Conveyance Allowance (C.A / P.T.A)', cat: 'Allowance', desc: 'Fixed monthly conveyance allowance according to BPS slabs.' },
  { code: 'A01217', title: 'Medical Allowance (M.A)', cat: 'Allowance', desc: 'Standard monthly medical reimbursement allowance for serving employees.' },
  { code: 'A0124X', title: 'Adhoc Relief Allowance (ARA 2023) - 35% / 30%', cat: 'Allowance', desc: 'Granted w.e.f July 01, 2023 (35% for BPS 1-16, 30% for BPS 17-22).' },
  { code: 'A0125X', title: 'Adhoc Relief Allowance (ARA 2024) - 25% / 20%', cat: 'Allowance', desc: 'Granted w.e.f July 01, 2024 (25% for BPS 1-16, 20% for BPS 17-22).' },
  { code: 'A0121T', title: 'Adhoc Relief Allowance (ARA 2013)', cat: 'Allowance', desc: 'Adhoc relief allowance initiated in Sindh budget 2013.' },
  { code: 'A0122Y', title: 'Differential Allowance (BPS 1 to 15)', cat: 'Allowance', desc: 'Allowance provided to bridge disparity in provincial pay scales.' },
  { code: 'A01228', title: 'Teaching Allowance', cat: 'Allowance', desc: 'Special monthly incentive for certified teaching cadre in Sindh schools.' },
  { code: 'G05106', title: 'General Provident Fund (G.P. Fund)', cat: 'Deduction', desc: 'Statutory provincial monthly retirement savings deduction.' },
  { code: 'G05105', title: 'Benevolent Fund (B.F)', cat: 'Deduction', desc: 'Provincial welfare deduction for welfare grants and family protection.' },
  { code: 'G05107', title: 'Group Insurance (G.I)', cat: 'Deduction', desc: 'Standard provincial life insurance protection deduction.' },
  { code: 'B01603', title: 'Professional Tax (P.Tax)', cat: 'Deduction', desc: 'Sindh provincial professional tax assessed on salary income.' },
  { code: 'B01101', title: 'Federal Income Tax (IT)', cat: 'Deduction', desc: 'Federal Board of Revenue (FBR) PAYE withholding income tax.' },
  { code: 'G01101', title: 'House Building Advance (HBA Recovery)', cat: 'Deduction', desc: 'Monthly principal/interest recovery towards government house loans.' }
];

const DAO_LIST = [
  { dist: 'Karachi Central / South / East', code: 'KQ-001', ddoCount: '450+', dao: 'Accountant General Sindh, Karachi' },
  { dist: 'Hyderabad', code: 'HB-002', ddoCount: '280+', dao: 'District Accounts Office, Hyderabad' },
  { dist: 'Khairpur Mirs', code: 'KX-003', ddoCount: '210+', dao: 'District Accounts Office, Khairpur' },
  { dist: 'Sukkur', code: 'SY-004', ddoCount: '190+', dao: 'District Accounts Office, Sukkur' },
  { dist: 'Larkana', code: 'LN-005', ddoCount: '175+', dao: 'District Accounts Office, Larkana' },
  { dist: 'Shaheed Benazirabad (Nawabshah)', code: 'SB-006', ddoCount: '160+', dao: 'District Accounts Office, SBA' },
  { dist: 'Mirpurkhas', code: 'MP-007', ddoCount: '140+', dao: 'District Accounts Office, Mirpurkhas' },
  { dist: 'Dadu', code: 'DD-008', ddoCount: '130+', dao: 'District Accounts Office, Dadu' },
  { dist: 'Naushahro Feroze', code: 'NF-009', ddoCount: '125+', dao: 'District Accounts Office, N. Feroze' },
  { dist: 'Ghotki', code: 'GK-010', ddoCount: '120+', dao: 'District Accounts Office, Ghotki' },
  { dist: 'Badin', code: 'BD-011', ddoCount: '110+', dao: 'District Accounts Office, Badin' },
  { dist: 'Sanghar', code: 'SG-012', ddoCount: '115+', dao: 'District Accounts Office, Sanghar' }
];

export default function DdoDirectory() {
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('All');

  const filteredCodes = OBJECT_CODES.filter(item => {
    const matchesCat = category === 'All' || item.cat === category;
    const matchesText = item.code.toLowerCase().includes(filter.toLowerCase()) ||
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.desc.toLowerCase().includes(filter.toLowerCase());
    return matchesCat && matchesText;
  });

  return (
    <div className="portal-sec">
      <div className="card" style={{ borderLeft: '4px solid var(--g)' }}>
        <h2 style={{ fontSize: 18, margin: '0 0 4px', color: 'var(--g)' }}>
          🏛 Sindh Treasury &amp; DDO Object Code Directory
        </h2>
        <div style={{ fontSize: 13, color: '#555' }}>
          Official PIFRA / SAP Accounting Codes, Deduction Heads, and District Accounts Offices across Sindh
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search code (e.g. A01101, HRA, Medical, G.P. Fund)..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ flex: 1, minWidth: 260, padding: '7px 10px', fontSize: 14, border: '1px solid var(--ln)', borderRadius: 6 }}
          />
          <div style={{ display: 'flex', gap: 6 }}>
            {['All', 'Pay', 'Allowance', 'Deduction'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={category === cat ? 'pri' : ''}
                style={{ padding: '6px 12px', fontSize: 13 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card sc" style={{ maxHeight: '60vh', padding: 0 }}>
        <table className="t" style={{ width: '100%', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', width: 90 }}>Code</th>
              <th style={{ textAlign: 'left', width: 280 }}>Head / Title</th>
              <th style={{ textAlign: 'center', width: 95 }}>Classification</th>
              <th style={{ textAlign: 'left' }}>Description &amp; Government Authority</th>
            </tr>
          </thead>
          <tbody>
            {filteredCodes.map(c => (
              <tr key={c.code}>
                <td style={{ textAlign: 'left', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--g)', fontSize: 14 }}>
                  {c.code}
                </td>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{c.title}</td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{
                    fontSize: 11,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: c.cat === 'Pay' ? '#e0f2fe' : c.cat === 'Allowance' ? '#ecfdf5' : '#fef2f2',
                    color: c.cat === 'Pay' ? '#0369a1' : c.cat === 'Allowance' ? '#047857' : '#b91c1c',
                    fontWeight: 'bold'
                  }}>
                    {c.cat}
                  </span>
                </td>
                <td style={{ textAlign: 'left', color: '#444' }}>{c.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <h2>📍 District Accounts Offices (DAO) in Sindh</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10, marginTop: 8 }}>
          {DAO_LIST.map(d => (
            <div key={d.code} style={{ border: '1px solid var(--ln)', borderRadius: 6, padding: '8px 12px', background: '#fafbfa' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--g)' }}>{d.dist}</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>Office: <b>{d.dao}</b></div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>District Code: <code>{d.code}</code> · Approx. {d.ddoCount} DDOs</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

