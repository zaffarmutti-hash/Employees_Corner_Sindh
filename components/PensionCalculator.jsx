'use client';

import { useState, useId } from 'react';

// Official Sindh / Federal Commutation Table (Age at next birthday -> Factor)
const COMM_TABLE = {
  20: 40.5043, 21: 39.7341, 22: 38.9653, 23: 38.1974, 24: 37.4307,
  25: 36.6651, 26: 35.9006, 27: 35.1372, 28: 34.3750, 29: 33.6143,
  30: 32.8071, 31: 32.0974, 32: 31.3412, 33: 30.5869, 34: 29.8343,
  35: 29.0841, 36: 28.3362, 37: 27.5908, 38: 26.8482, 39: 26.1009,
  40: 25.3728, 41: 24.6406, 42: 23.9126, 43: 23.1840, 44: 22.4713,
  45: 21.7592, 46: 21.0538, 47: 20.3555, 48: 19.6653, 49: 18.9841,
  50: 18.3129, 51: 17.6526, 52: 17.0050, 53: 16.3710, 54: 15.7517,
  55: 15.1478, 56: 14.5602, 57: 13.9888, 58: 13.4340, 59: 12.8953,
  60: 12.3719, 61: 11.8632, 62: 11.3684, 63: 10.8872, 64: 10.4191,
  65: 9.9639
};

const f0 = v => Math.round(Number(v) || 0).toLocaleString('en-US');

export default function PensionCalculator() {
  const [emp, setEmp] = useState({
    name: '',
    father: '',
    cnic: '',
    sap: '',
    desig: '',
    bps: '16',
    dept: 'School Education & Literacy Department Sindh',
    dob: '1966-06-15',
    doa: '1994-09-01',
    dor: '2026-06-14',
    basicPay: 78500,
    specialPay: 0,
    commRate: 35
  });

  const [previewFo2, setPreviewFo2] = useState(false);

  const calculateService = () => {
    if (!emp.doa || !emp.dor) return { years: 0, months: 0, days: 0, qualifying: 0 };
    const d1 = new Date(emp.doa);
    const d2 = new Date(emp.dor);
    if (d2 <= d1) return { years: 0, months: 0, days: 0, qualifying: 0 };

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Sindh pension rule: 6 months or more count as 1 full year, capped at 30 years
    let qualifying = years + (months >= 6 ? 1 : 0);
    qualifying = Math.min(30, Math.max(0, qualifying));

    return { years, months, days, qualifying };
  };

  const calculateAge = () => {
    if (!emp.dob || !emp.dor) return 60;
    const b = new Date(emp.dob);
    const r = new Date(emp.dor);
    let age = r.getFullYear() - b.getFullYear();
    const m = r.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && r.getDate() < b.getDate())) age--;
    return age + 1; // Age at next birthday
  };

  const service = calculateService();
  const nextAge = calculateAge();
  const factor = COMM_TABLE[nextAge] || COMM_TABLE[60];

  const totalEmoluments = Number(emp.basicPay || 0) + Number(emp.specialPay || 0);
  const grossPension = (totalEmoluments * service.qualifying * 7) / 300; // Formula: Pay * QS * 70% / 30
  const commAmount = (grossPension * (emp.commRate / 100));
  const commLumpsum = commAmount * 12 * factor;
  const netMonthlyPension = grossPension - commAmount;
  const medicalAllowance = Math.max(1500, netMonthlyPension * 0.25);
  const totalMonthlyPayable = netMonthlyPension + medicalAllowance;

  return (
    <div className="portal-sec">
      <div className="card" style={{ borderLeft: '4px solid var(--g)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h2 style={{ fontSize: 18, margin: '0 0 4px', color: 'var(--g)' }}>
              🧮 Civil Servants Pension &amp; Form 2 (FO-2) Dossier Calculator
            </h2>
            <div style={{ fontSize: 13, color: '#555' }}>
              Compliant with Sindh Civil Servants Pension Rules, AG Sindh &amp; District Accounts Offices
            </div>
          </div>
          <button
            className="pri"
            onClick={() => setPreviewFo2(!previewFo2)}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            {previewFo2 ? '✏ Edit Data' : '📄 View / Print Official FO-2 Dossier'}
          </button>
        </div>
      </div>

      {!previewFo2 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
          {/* Employee Profile */}
          <div className="card">
            <h2>1 · Employee Service Profile</h2>
            <div className="gr" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <label>Employee Name<input type="text" value={emp.name} onChange={e => setEmp({ ...emp, name: e.target.value })} placeholder="e.g. Asif Ali Shar" /></label>
              <label>Father / Husband Name<input type="text" value={emp.father} onChange={e => setEmp({ ...emp, father: e.target.value })} placeholder="e.g. Ghulam Rasool" /></label>
              <label>CNIC No.<input type="text" value={emp.cnic} onChange={e => setEmp({ ...emp, cnic: e.target.value })} placeholder="45206-xxxxxxx-x" /></label>
              <label>Personnel / SAP ID<input type="text" value={emp.sap} onChange={e => setEmp({ ...emp, sap: e.target.value })} placeholder="10xxxxxx" /></label>
              <label>Designation<input type="text" value={emp.desig} onChange={e => setEmp({ ...emp, desig: e.target.value })} placeholder="e.g. High School Teacher (HST)" /></label>
              <label>BPS Grade
                <select value={emp.bps} onChange={e => setEmp({ ...emp, bps: e.target.value })}>
                  {Array.from({ length: 22 }, (_, i) => i + 1).map(b => (
                    <option key={b} value={b}>BPS-{b}</option>
                  ))}
                </select>
              </label>
              <label style={{ gridColumn: '1 / -1' }}>Department / School / Office
                <input type="text" value={emp.dept} onChange={e => setEmp({ ...emp, dept: e.target.value })} />
              </label>
            </div>
          </div>

          {/* Service Dates */}
          <div className="card">
            <h2>2 · Service &amp; Retirement Dates</h2>
            <div className="gr" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <label>Date of Birth<input type="date" value={emp.dob} onChange={e => setEmp({ ...emp, dob: e.target.value })} /></label>
              <label>Date of Entry / Appointment<input type="date" value={emp.doa} onChange={e => setEmp({ ...emp, doa: e.target.value })} /></label>
              <label style={{ gridColumn: '1 / -1' }}>Date of Retirement (Superannuation / Voluntary)
                <input type="date" value={emp.dor} onChange={e => setEmp({ ...emp, dor: e.target.value })} />
              </label>
            </div>

            <div style={{ background: '#f5f7f4', padding: '10px 12px', borderRadius: 6, marginTop: 12, fontSize: 13, border: '1px solid var(--ln)' }}>
              <div><b>Total Service Length:</b> {service.years} Years, {service.months} Months, {service.days} Days</div>
              <div style={{ marginTop: 4 }}><b>Qualifying Service for Pension:</b> <span style={{ color: 'var(--g)', fontWeight: 700 }}>{service.qualifying} Years</span> (Max 30 Yrs)</div>
              <div style={{ marginTop: 4 }}><b>Age at Next Birthday:</b> {nextAge} Years (Factor: <b>{factor.toFixed(4)}</b>)</div>
            </div>
          </div>

          {/* Pay & Commutation Options */}
          <div className="card">
            <h2>3 · Emoluments &amp; Commutation</h2>
            <div className="gr" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <label>Last Basic Pay (Rs.)<input type="number" min="0" value={emp.basicPay} onChange={e => setEmp({ ...emp, basicPay: e.target.value })} /></label>
              <label>Special / Personal Pay (Rs.)<input type="number" min="0" value={emp.specialPay} onChange={e => setEmp({ ...emp, specialPay: e.target.value })} /></label>
              <label style={{ gridColumn: '1 / -1' }}>Commutation Rate (%)
                <select value={emp.commRate} onChange={e => setEmp({ ...emp, commRate: Number(e.target.value) })}>
                  <option value={35}>35% (Standard Maximum allowed in Sindh)</option>
                  <option value={30}>30%</option>
                  <option value={25}>25%</option>
                  <option value={0}>0% (Full monthly pension, no lumpsum)</option>
                </select>
              </label>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
              * Under Sindh Civil Servants Pension Rules, 70% of last emoluments forms the baseline gross pension for 30 years qualifying service.
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="card" style={{ background: '#eef6f1', borderColor: 'var(--g)' }}>
            <h2 style={{ color: 'var(--g)', borderBottom: '1px solid #c2decb', paddingBottom: 6 }}>
              💰 Pension &amp; Commutation Summary
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Last Reckonable Emoluments:</span>
                <b>Rs. {f0(totalEmoluments)}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Gross Pension ({service.qualifying}/30 × 70%):</span>
                <b>Rs. {f0(grossPension)} /mo</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b91c1c' }}>
                <span>Commuted Pension ({emp.commRate}%):</span>
                <b>- Rs. {f0(commAmount)} /mo</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #c2decb', paddingTop: 6 }}>
                <span>Net Monthly Pension:</span>
                <b>Rs. {f0(netMonthlyPension)} /mo</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Medical Allowance (approx. 25%):</span>
                <b>Rs. {f0(medicalAllowance)} /mo</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: '#d2ebdb', padding: '6px 10px', borderRadius: 4, fontWeight: 700, fontSize: 15, color: 'var(--g)' }}>
                <span>Total Monthly Pension:</span>
                <span>Rs. {f0(totalMonthlyPayable)} /mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: '#2563eb', color: '#fff', padding: '8px 10px', borderRadius: 4, fontWeight: 700, fontSize: 15, marginTop: 4 }}>
                <span>Lumpsum Commutation Value:</span>
                <span>Rs. {f0(commLumpsum)}</span>
              </div>
              <div style={{ fontSize: 11, color: '#555', textAlign: 'right' }}>
                Formula: Commuted Pension × 12 × {factor.toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Printable Form 2 (FO-2) Dossier Preview */
        <div>
          <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
            <button className="pri" onClick={() => window.print()}>🖨 Print Official FO-2 Paper</button>
            <button onClick={() => setPreviewFo2(false)}>Back to Form</button>
          </div>

          <div className="sheet p" style={{ background: '#fff', padding: '14mm 16mm', border: '1px solid #ccc', margin: '0 auto', maxWidth: 840 }}>
            <div style={{ textAlign: 'center', marginBottom: '8mm' }}>
              <div style={{ fontSize: '14pt', fontWeight: 'bold', textTransform: 'uppercase' }}>Government of Sindh</div>
              <div style={{ fontSize: '11pt', fontWeight: 'bold' }}>FORM 2 (FORM FO-2) — PENSION CALCULATION SHEET</div>
              <div style={{ fontSize: '9pt', color: '#444' }}>(See Sindh Civil Servants Pension Rules, Chapter III)</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9.5pt', marginBottom: '6mm' }}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', width: '35%', fontWeight: 'bold' }}>1. Name of Civil Servant:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>{emp.name || '—'}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>2. Father / Husband Name:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>{emp.father || '—'}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>3. CNIC No. &amp; SAP PID:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>CNIC: {emp.cnic || '—'} &nbsp;|&nbsp; SAP ID: {emp.sap || '—'}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>4. Post &amp; Pay Scale (BPS):</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>{emp.desig || '—'} (BPS-{emp.bps})</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>5. Department / Office:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>{emp.dept}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>6. Date of Birth:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>{emp.dob}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>7. Date of Entry in Govt. Service:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>{emp.doa}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>8. Date of Retirement:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>{emp.dor}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>9. Gross Service Length:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>{service.years} Y, {service.months} M, {service.days} D</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>10. Qualifying Service Admissible:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}><b>{service.qualifying} Years</b> (Subject to max 30 years)</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>11. Last Basic Pay Emoluments:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>Rs. {f0(totalEmoluments)}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>12. Gross Pension Amount:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}><b>Rs. {f0(grossPension)}</b> ({totalEmoluments} × {service.qualifying} / 30 × 70%)</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>13. Commutation ({emp.commRate}%):</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>Rs. {f0(commAmount)}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '5px 8px', fontWeight: 'bold' }}>14. Age next birthday &amp; Factor:</td>
                  <td style={{ border: '1px solid #000', padding: '5px 8px' }}>Age: {nextAge} Y &nbsp;|&nbsp; Commutation Factor: {factor.toFixed(4)}</td>
                </tr>
                <tr style={{ background: '#f5f5f5' }}>
                  <td style={{ border: '1px solid #000', padding: '6px 8px', fontWeight: 'bold' }}>15. Commutation Value Payable:</td>
                  <td style={{ border: '1px solid #000', padding: '6px 8px', fontSize: '11pt', fontWeight: 'bold' }}>Rs. {f0(commLumpsum)}</td>
                </tr>
                <tr style={{ background: '#f5f5f5' }}>
                  <td style={{ border: '1px solid #000', padding: '6px 8px', fontWeight: 'bold' }}>16. Net Monthly Pension:</td>
                  <td style={{ border: '1px solid #000', padding: '6px 8px', fontSize: '11pt', fontWeight: 'bold' }}>Rs. {f0(netMonthlyPension)} (+ Medical: Rs. {f0(medicalAllowance)})</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: '12mm', display: 'flex', justifyContent: 'space-between', textAlign: 'center', fontSize: '9pt' }}>
              <div style={{ width: '45%', borderTop: '1px solid #000', paddingTop: '2mm' }}>
                Signature &amp; Official Seal of<br /><b>Head of Office / DDO</b>
              </div>
              <div style={{ width: '45%', borderTop: '1px solid #000', paddingTop: '2mm' }}>
                Audit Officer / Senior Accounts Officer<br /><b>District Accounts Office / AG Sindh</b>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

