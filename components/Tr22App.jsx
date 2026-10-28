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
            T.R. 265
          </span>
          <h2 style={{ fontSize: 15, margin: 0, color: 'var(--g)', whiteSpace: 'nowrap' }}>
            Arrears Pay Bill Form
          </h2>
        </div>
        <button className="pri" id="pr">🖨 Print / Save PDF</button>
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
        <div className="card"><h2>Employee</h2><div className="gr" id="fe"></div></div>
        <div className="card"><h2>Office &amp; bill header</h2><div className="gr" id="fo"></div></div>
        <div className="card"><h2>Payment (reverse side)</h2><div className="gr" id="fp"></div></div>
        <div className="card">
          <h2>Allowance heads <small style={{ fontWeight: 'normal', color: '#666' }}>— tick the ones used in this bill (they become columns in the statement)</small></h2>
          <div className="sc" style={{ maxHeight: 'none' }}><table className="t hd" id="fh"></table></div>
        </div>
        <div className="card"><h2>Other allowances &amp; extra pay (lump sums, optional)</h2><div className="gr" id="fx"></div></div>
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
