import {
  D, DED, LS, MAXFILE, MAXM, MAXROWS, TODAY, calc, cl, esc, f0, gp, isoRange, nextM, okM, range, rowOf, ru, sanitize, sp
} from './core.js';
import { renderPages } from './paper.js';

let S, T, root, billId = '';

const $ = s => root.querySelector(s);

function persist() {
  try { localStorage.setItem(LS, JSON.stringify({ id: billId, data: S })); } catch {}
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS) || '{}');
    if (raw && raw.data) {
      billId = raw.id || '';
      return sanitize(raw.data);
    }
    billId = '';
    return sanitize(raw);
  } catch {
    billId = '';
    return D();
  }
}

const fl = (p, l, t = 'text') => `<label>${l}<input type="${t}" data-p="${p}" value="${esc(gp(S, p))}"></label>`;
const sl = (p, l, op) => `<label>${l}<select data-p="${p}">${op.map(([v, t]) => `<option value="${v}"${gp(S, p) == v ? ' selected' : ''}>${t}</option>`).join('')}</select></label>`;
const ni = (p, v) => `<input type="number" step="1" min="0" data-p="${p}" value="${v || ''}">`;
const dt = (p, l) => `<label>${l}<input type="date" data-p="${p}" max="${TODAY}" value="${esc(gp(S, p))}"></label>`;

function forms() {
  const fe = $('#fe'), fo = $('#fo'), fp = $('#fp'), fh = $('#fh'), fx = $('#fx');
  if (!fe || !fo || !fp || !fh || !fx) return;
  fe.innerHTML = fl('e.name', 'Name') + sl('e.rel', 'Relation', [['S/o', 'S/o'], ['D/o', 'D/o'], ['W/o', 'W/o']]) + fl('e.father', 'Father / Husband name') + fl('e.sap', 'SAP ID / PID') + fl('e.desig', 'Designation') + fl('e.bps', 'BPS (grade)');
  fo.innerHTML = fl('o.type', 'Pay bill of (Permanent/Temporary)') + fl('o.est', 'Establishment / School / Office') + fl('o.sub', 'Sub-heading (optional)') + fl('o.cc', 'Cost Center') + dt('o.from', 'Period from') + dt('o.to', 'Period to') + '<label><span>&nbsp;</span><button type="button" id="auto">Auto from months</button></label><div class="note" id="fdh" style="grid-column:1/-1"></div>' + fl('o.govt', 'Government') + fl('o.vou', 'Voucher No.') + fl('o.moa', 'Month of A/C') + fl('o.tre', 'Treasury Code No.') + fl('o.spc', 'Treasury special code') + fl('o.paycode', 'Pay object code (blank = auto by BPS)') + fl('o.ddo', 'DDO Code No.') + fl('o.ctl', 'Controlling Officer Code No.') + fl('o.fun', 'Functional Code No.') + fl('o.f1', 'Function line 1') + fl('o.f2', 'Function line 2') + fl('o.f3', 'Function line 3') + fl('o.itc', 'Income Tax / PLI code') +
    `<label class="ck"><input type="checkbox" data-p="sz"${S.sz ? ' checked' : ''}> Show empty (all-zero) columns in the statements</label>`;
  fp.innerHTML = sl('o.pm', 'Payment mode', [['transfer', 'By transfer'], ['cash', 'Cash'], ['', 'Leave blank']]) + fl('o.payTo', 'Please pay to (blank = employee)') + fl('o.bank', 'Bank / account note') + fl('o.absent', 'Month for certificate 2') + fl('o.ddon', 'DDO name &amp; designation') + DED.map((x, k) => fl('dc.' + k, x[0] + ' — code')).join('');
  fh.innerHTML = '<tr><th>Use</th><th>#</th><th>Label on form</th><th>Statement column</th><th>Object code</th><th>Authority (Finance Dept. letter No. &amp; date)</th></tr>' + S.heads.map((h, i) => `<tr><td><input type="checkbox" data-p="heads.${i}.on"${h.on ? ' checked' : ''}></td><td>${i + 1}</td><td><input data-p="heads.${i}.l" value="${esc(h.l)}" style="width:220px"></td><td><input data-p="heads.${i}.s" value="${esc(h.s)}" style="width:170px"></td><td><input data-p="heads.${i}.c" value="${esc(h.c)}" style="width:75px"></td><td><input data-p="heads.${i}.au" value="${esc(h.au || '')}" style="width:300px"></td></tr>`).join('');
  fx.innerHTML = S.other.map((x, i) => fl(`other.${i}.l`, 'Other allowance ' + (i + 1)) + `<label>Amount (Rs.)${ni(`other.${i}.a`, x.a).replace('<input', '<input style="width:100%;border:1px solid var(--ln);padding:5px;text-align:left"')}</label>`).join('') +
    ['Personal Pay 013', 'Special Pay 014', 'Other Pay 010'].map((l, i) => `<label>${l} (Rs.)${ni('pp.' + i, S.pp[i]).replace('<input', '<input style="width:100%;border:1px solid var(--ln);padding:5px;text-align:left"')}</label>`).join('');
  const cop = root.querySelector('[data-p=copies]');
  if (cop) cop.value = S.copies;
}

function grid() {
  const g = $('#grid');
  if (!g) return;
  const hs = S.heads.map((h, i) => i).filter(i => S.heads[i].on);
  g.innerHTML = `<thead><tr><th>#</th><th>Month</th><th>Pay</th>${hs.map(i => `<th>${esc(S.heads[i].s)}</th>`).join('')}<th>Total</th>${DED.map(x => `<th>${x[0]}</th>`).join('')}<th>Ded.</th><th>Net</th><th></th></tr></thead><tbody>` +
    S.rows.map((r, i) => `<tr><td>${i + 1}</td><td><input type="month" max="${MAXM}" id="m${i}" data-p="rows.${i}.m" value="${r.m}"></td><td>${ni(`rows.${i}.pay`, r.pay)}</td>${hs.map(j => `<td>${ni(`rows.${i}.a.${j}`, r.a[j])}</td>`).join('')}<td class="k" id="re${i}"></td>${DED.map((x, k) => `<td>${ni(`rows.${i}.d.${k}`, r.d[k])}</td>`).join('')}<td class="k" id="rd${i}"></td><td class="k" id="rn${i}"></td><td style="white-space:nowrap"><button data-act="dup" data-i="${i}" title="Duplicate row">⧉</button><button data-act="del" data-i="${i}" title="Delete row">✕</button></td></tr>`).join('') +
    `</tbody><tfoot><tr><td colspan="2">Total</td><td id="tp"></td>${hs.map(j => `<td id="ta${j}"></td>`).join('')}<td id="te"></td>${DED.map((x, k) => `<td id="td${k}"></td>`).join('')}<td id="tdd"></td><td id="tn"></td><td></td></tr></tfoot>`;
}

const tx = (id, v) => { const e = root.querySelector('#' + id); if (e) e.textContent = f0(v); };

function upd() {
  if (!S.o.manual) {
    const [a, b] = isoRange(S);
    S.o.from = a; S.o.to = b;
    ['o.from', 'o.to'].forEach(q => { const i = root.querySelector(`[data-p="${q}"]`); if (i) i.value = gp(S, q); });
  }
  T = calc(S);
  const hh = $('#fdh');
  if (hh) hh.textContent = 'Prints as: ' + range(S).join('  to  ');
  S.rows.forEach((r, i) => {
    tx('re' + i, T.R[i].e); tx('rd' + i, T.R[i].d); tx('rn' + i, T.R[i].net);
    const m = root.querySelector('#m' + i);
    if (m) m.classList.toggle('dup', !!r.m && S.rows.some((q, j) => j != i && q.m == r.m));
  });
  tx('tp', T.pay); T.a.forEach((v, j) => tx('ta' + j, v)); tx('te', T.e); T.d.forEach((v, k) => tx('td' + k, v)); tx('tdd', T.ded); tx('tn', T.e - T.ded);
  const pages = $('#pages');
  if (pages) pages.innerHTML = renderPages(S, T);
  persist();
}

function boot() {
  forms();
  grid();
  const gf = $('#gf'), gt = $('#gt');
  if (gf) gf.max = MAXM;
  if (gt) gt.max = MAXM;
  upd();
  refreshServerList();
}

async function refreshServerList() {
  const sel = $('#srv');
  if (!sel) return;
  try {
    const res = await fetch('/api/bills', { cache: 'no-store' });
    if (!res.ok) throw new Error('list failed');
    const { bills } = await res.json();
    const cur = billId;
    sel.innerHTML = '<option value="">Load from server…</option>' + (bills || []).map(b =>
      `<option value="${esc(b.id)}"${b.id === cur ? ' selected' : ''}>${esc((b.name || 'Bill') + (b.sap ? ' · ' + b.sap : ''))}</option>`
    ).join('');
  } catch {
    sel.innerHTML = '<option value="">Server bills unavailable</option>';
  }
}

function onInput(e) {
  const t = e.target, p = t.dataset.p;
  if (!p || !S) return;
  let v = t.type == 'checkbox' ? t.checked : (t.type == 'number' || t.dataset.n) ? ru(t.value) : t.value;
  if (t.type == 'number' && t.value !== '' && +t.value < 0) t.value = v;
  if (t.type == 'date' || t.type == 'month') {
    const mx = t.type == 'date' ? TODAY : MAXM;
    if (v && v > mx) { v = mx; t.value = v; }
    if (t.type == 'month' && v && !okM(v) && /^\d{4}-(0[1-9]|1[0-2])$/.test(v)) { v = MAXM; t.value = v; }
  }
  if (p == 'o.from' || p == 'o.to') S.o.manual = true;
  if (p == 'copies') v = Math.min(3, Math.max(1, ru(v) || 1));
  sp(S, p, v);
  upd();
}

function onChange(e) {
  if (/^heads\./.test(e.target.dataset.p || '')) { grid(); upd(); }
}

async function onClick(e) {
  if (!S) return;
  if (e.target.id == 'auto') { S.o.manual = false; upd(); return; }
  const b = e.target.closest('[data-act]'), i = b && +b.dataset.i;
  if (b && Number.isInteger(i) && S.rows[i]) {
    if (b.dataset.act == 'del') { if (S.rows.length > 1) S.rows.splice(i, 1); }
    else {
      if (S.rows.length >= MAXROWS) return alert('Maximum ' + MAXROWS + ' months reached.');
      const c = cl(S.rows[i]); c.m = nextM(c.m);
      if (!okM(c.m)) return alert('Future months are not allowed.');
      S.rows.splice(i + 1, 0, c);
    }
    grid(); upd();
  }
  const tb = e.target.closest('[data-t]');
  if (tb && tb.dataset.t) {
    const tab = root.querySelector('#' + tb.dataset.t);
    if (!tab) return;
    root.querySelectorAll('.tab,.tbs button').forEach(x => x.classList.remove('on'));
    tab.classList.add('on'); tb.classList.add('on');
  }
}

function on(id, ev, fn) {
  const el = $(id);
  if (el) el[ev] = fn;
}

function bindClicks() {
  on('#gen', 'onclick', () => {
    const a = $('#gf') && $('#gf').value, b = $('#gt') && $('#gt').value;
    if (!a || !b || a > b || !okM(b)) return alert('Choose a valid From and To month (not in the future).');
    let count = 0, m = a;
    while (m <= b) { count++; m = nextM(m); if (count > MAXROWS) return alert('That range is too long (max ' + MAXROWS + ' months).'); }
    if (S.rows.length > 1 && !confirm('Replace the existing ' + S.rows.length + ' rows? (amounts are copied from the first row)')) return;
    const t = S.rows[0] || rowOf({}, S.heads.length), out = [];
    m = a;
    while (m <= b) { const c = cl(t); c.m = m; out.push(c); m = nextM(m); }
    S.rows = out; grid(); upd();
  });
  on('#add', 'onclick', () => {
    if (S.rows.length >= MAXROWS) return alert('Maximum ' + MAXROWS + ' months reached.');
    const last = S.rows.at(-1) || rowOf({}, S.heads.length);
    const l = cl(last); l.m = nextM(l.m);
    if (!okM(l.m)) return alert('Future months are not allowed.');
    S.rows.push(l); grid(); upd();
  });
  on('#pr', 'onclick', () => { try { upd(); } catch {} window.print(); });
  on('#dlpdf', 'onclick', async () => {
    const btn = $('#dlpdf');
    const orig = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Rendering PDF...'; }
    try {
      upd();
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: S })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Server PDF generation failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'TR22_' + (S.e?.sap || 'bill').replace(/[^a-zA-Z0-9_-]/g, '') + '.pdf';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 3000);
    } catch (err) {
      alert(err.message || 'Could not generate server-side PDF');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = orig; }
    }
  });
  on('#zm', 'onchange', e => { const p = $('#pages'); if (p) p.style.zoom = e.target.value; });
  on('#sv', 'onclick', () => {
    try {
      const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'TR22_' + (S.e.sap || 'bill') + '.json';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1500);
    } catch { alert('Could not save the file.'); }
  });
  on('#ld', 'onchange', e => {
    const f = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!f) return;
    if (f.size > MAXFILE) return alert('File is too large (max 2 MB).');
    f.text().then(t => {
      let parsed;
      try { parsed = JSON.parse(t); } catch { alert('Not a valid saved bill.'); return; }
      billId = '';
      S = sanitize(parsed);
      boot();
    }).catch(() => alert('Could not read that file.'));
  });
  on('#rs', 'onclick', () => {
    if (!confirm('Clear employee and monthly amounts? Office details are kept.')) return;
    const d = D(), r = cl(d.rows[0]);
    r.pay = 0; r.a = r.a.map(() => 0); r.d = r.d.map(() => 0);
    billId = '';
    S = { ...d, o: { ...S.o, manual: false }, heads: S.heads, dc: S.dc, e: { name: '', rel: 'S/o', father: '', sap: '', desig: '', bps: '' }, rows: [r] };
    boot();
  });
  on('#ss', 'onclick', async () => {
    try {
      const res = await fetch('/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: billId || undefined, data: S })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Save failed');
      billId = json.id;
      persist();
      await refreshServerList();
      alert('Saved on server.');
    } catch (err) {
      alert(err.message || 'Could not save on server.');
    }
  });
  on('#srv', 'onchange', async e => {
    const id = e.target.value;
    if (!id) return;
    try {
      const res = await fetch('/api/bills/' + encodeURIComponent(id), { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Load failed');
      billId = json.id;
      S = sanitize(json.data);
      boot();
    } catch (err) {
      alert(err.message || 'Could not load that bill.');
    }
  });
}

export function mount(el) {
  root = el;
  S = loadState();
  bindClicks();
  boot();
  root.addEventListener('input', onInput);
  root.addEventListener('change', onChange);
  root.addEventListener('click', onClick);
  return () => {
    root.removeEventListener('input', onInput);
    root.removeEventListener('change', onChange);
    root.removeEventListener('click', onClick);
  };
}
