'use client';

import { useEffect, useRef } from 'react';
import { mount } from '@/lib/tr22/client';

export default function Tr22App() {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;
    return mount(root.current);
  }, []);

  return (
    <div ref={root}>
      <div className="bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
          <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 7px', borderRadius: 4, fontWeight: 700, fontSize: 12 }}>
            T.R. 22
          </span>
          <h2 style={{ fontSize: 15, margin: 0, color: 'var(--g)', whiteSpace: 'nowrap' }}>
            T.R. Form / Arrears Bill Proforma (Non-Gazetted Staff)
          </h2>
        </div>
        <button className="pri" id="dlpdf" title="Generate and download PDF">
          📥 Download PDF
        </button>
        <button id="pr" title="Open print dialog">
          🖨 Print / Preview
        </button>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          Copies{' '}
          <select data-p="copies" data-n="1" style={{ padding: 5 }}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </label>
        <button id="sv">⬇ Save data</button>
        <label className="btn" style={{ flexDirection: 'row', color: 'inherit', fontSize: 14 }}>
          ⬆ Load data
          <input type="file" id="ld" accept=".json,application/json" hidden />
        </label>
        <button id="ss">☁ Save on server</button>
        <select id="srv" style={{ maxWidth: 220 }}>
          <option value="">Load from server…</option>
        </select>
        <button id="rs">New / reset</button>
        <div className="tbs">
          <button data-t="d" className="on">1 · Details</button>
          <button data-t="m">2 · Monthly data</button>
          <button data-t="pv">3 · Preview &amp; print</button>
        </div>
      </div>

      <div className="tab on" id="d">
        <div className="card"><h2>1 · Teacher / Official Information &amp; Basic Pay</h2><div className="gr" id="fe"></div></div>
        <div className="card"><h2>2 · Office &amp; Bill Header (T.R. 265)</h2><div className="gr" id="fo"></div></div>
        <div className="card"><h2>3 · Payment &amp; Monthly Deductions (Reverse Side)</h2><div className="gr" id="fp"></div></div>
        <div className="card">
          <h2>4 · Allowance Heads &amp; Monthly Rates <small style={{ fontWeight: 'normal', color: '#666' }}>— enter monthly rate or tick to include in Front Page columns</small></h2>
          <div className="sc" style={{ maxHeight: 'none' }}><table className="t hd" id="fh"></table></div>
        </div>
        <div className="card"><h2>5 · Other Allowances &amp; Extra Pay (Lump sums, optional)</h2><div className="gr" id="fx"></div></div>

        {/* Front Page Columns Totals Summary Card */}
        <div className="card" style={{ background: '#f8faf8', borderLeft: '4px solid var(--g)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
            <h2 style={{ margin: 0, fontSize: 15, color: 'var(--g)' }}>
              📊 Front Page (Obverse) Columns Totals Summary
            </h2>
            <span style={{ fontSize: 12, color: '#555' }}>
              Auto-calculated totals that show in the Front Page columns &amp; statements
            </span>
          </div>
          <div className="gr" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <div style={{ background: '#fff', padding: '8px 12px', border: '1px solid var(--ln)', borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: '#666' }}>Pay of Establishment (A01151)</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--g)' }} id="prev_pay">Rs. 0</div>
            </div>
            <div style={{ background: '#fff', padding: '8px 12px', border: '1px solid var(--ln)', borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: '#666' }}>Total Regular Allowances (020)</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--g)' }} id="prev_reg">Rs. 0</div>
            </div>
            <div style={{ background: '#fff', padding: '8px 12px', border: '1px solid var(--ln)', borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: '#666' }}>Gross Salary Est: Charge</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--g)' }} id="prev_gross">Rs. 0</div>
            </div>
            <div style={{ background: '#fff', padding: '8px 12px', border: '1px solid var(--ln)', borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: '#666' }}>Total Deductions (P &amp; C)</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#b91c1c' }} id="prev_ded">Rs. 0</div>
            </div>
            <div style={{ background: '#fff', padding: '8px 12px', border: '1px solid var(--ln)', borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: '#666' }}>Net Amount Payable</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0b5d3b' }} id="prev_net">Rs. 0</div>
            </div>
          </div>
          <div style={{ marginTop: 10, padding: '6px 10px', background: '#eef6f1', borderRadius: 5, fontSize: 12, fontWeight: 600, color: '#1e3a2b' }} id="prev_words">
            Rupees Zero only
          </div>
        </div>
      </div>

      <div className="tab" id="m">
        <div className="card">
          <h2>Generate months</h2>
          <div className="gr" style={{ alignItems: 'end', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))' }}>
            <label>From<input type="month" id="gf" /></label>
            <label>To<input type="month" id="gt" /></label>
            <button id="gen">Generate rows</button>
            <button id="add">+ Add next month</button>
          </div>
          <div className="note">Generate copies the amounts of the first row into every month; then edit only the months that differ. Whole rupees only. A red month = duplicate month.</div>
        </div>
        <div className="card sc"><table className="t" id="grid"></table></div>
      </div>

      <div className="tab" id="pv">
        <div className="hint note">
          In the print dialog choose <b>Save as PDF</b> · Paper <b>A4</b> · Margins <b>None</b> (or Default) · Scale <b>100%</b> · tick <b>Background graphics</b>. All pages are A4 portrait, numbered “Page n of N”. Order: <b>1</b> Obverse · <b>2</b> Month-wise pay &amp; allowances · <b>3</b> Deductions &amp; recoveries · <b>4</b> Reverse. Print <b>double-sided, flip on long edge</b>; with several copies a blank back is inserted when the page count is odd.
          Zoom <select id="zm"><option value="1">100%</option><option value=".8">80%</option><option value=".6">60%</option><option value=".45">45%</option></select>
        </div>
        <div id="pages"></div>
      </div>
    </div>
  );
}
