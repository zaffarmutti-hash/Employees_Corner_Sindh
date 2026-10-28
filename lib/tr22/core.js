export const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const n = v => { const x = Number(v); return Number.isFinite(x) ? x : 0; };
export const ru = v => Math.max(0, Math.round(n(v)));
export const f0 = v => Math.round(n(v)).toLocaleString('en-US');
export const A = (v, b) => n(v) ? f0(v) : b ? '' : '-';
export const MN = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
export const LB = ['ORIGINAL', 'DUPLICATE', 'TRIPLICATE'];
export const DED = [['G.P. Fund Ded:'], ['B.F'], ['G.I'], ['House Purc: Adv:'], ['Other Recovery'], ['Income Tax Post'], ['P.Tax']];
export const LS = 'tr22v3';
export const MAXFILE = 2 * 1024 * 1024;
export const MAXROWS = 240;

export const nextM = m => {
  let [y, k] = String(m || '').split('-').map(Number);
  if (!y || !k) return m;
  if (++k > 12) { k = 1; y++; }
  return y + '-' + String(k).padStart(2, '0');
};

export const TODAY = new Date(new Date() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
export const MAXM = TODAY.slice(0, 7);
export const isM = m => /^\d{4}-(0[1-9]|1[0-2])$/.test(m || '');
export const okM = m => isM(m) && m <= MAXM;
export const fd = x => {
  if (!x || !/^\d{4}-\d{2}-\d{2}$/.test(x)) return '';
  const [y, m, d] = x.split('-');
  return d + '-' + (MN[+m - 1] || m) + '-' + y;
};
export const fdm = m => m ? fd(m + '-01') : '—';

const O = 'One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen'.split(' ');
const TY = 'Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety'.split(' ');
const w2 = x => x < 20 ? O[x - 1] : TY[(x / 10 | 0) - 2] + (x % 10 ? ' ' + O[x % 10 - 1] : '');
const w3 = x => (x > 99 ? O[(x / 100 | 0) - 1] + ' Hundred' + (x % 100 ? ' ' : '') : '') + (x % 100 ? w2(x % 100) : '');

export function words(v) {
  v = Math.round(n(v));
  if (v <= 0) return 'Rupees Zero only';
  if (v > 99999999999) return 'Rupees ' + f0(v) + ' only';
  const p = [], c = v / 1e7 | 0, l = v / 1e5 % 100 | 0, t = v / 1e3 % 100 | 0, h = v % 1000;
  if (c) p.push((c > 99 ? w3(c) : c > 19 ? w2(c) : w3(c)) + ' Crore');
  if (l) p.push(w2(l) + (l > 1 ? ' Lacs' : ' Lac'));
  if (t) p.push(w2(t) + ' Thousand');
  if (h) p.push(w3(h));
  return 'Rupees ' + p.join(' ') + ' only';
}

const HD = [
  ['House Rent Allowances.', 'HRA', 'A01202', 1],
  ['Conveyance Allow:/P.T.A', 'C.A', 'A01203', 1],
  ['Medical Allowances.', 'M.A', 'A01217', 1],
  ['Differential Allwc 1-15', 'Differential Allw 1-15', '', 1],
  ['A.R.A 2023 35%', 'A.R.A 2023, 35%', 'A0124X', 1],
  ['A.R.A 2024 25%', 'A.R.A 2024, 25%', '', 1],
  ['A.R.A 2026 15%', 'A.R.A 2026, 15%', '', 1],
  ['Teaching Allowances.', 'Teaching Allw', '', 0],
  ...[2013, 2015, 2016, 2017, 2018, 2019].map(y => ['A.R.A ' + y, 'A.R.A ' + y, y == 2013 ? 'A0121T' : '', 0])
];

export const D = () => ({
  copies: 1, sz: false, dc: ['', '', '', '', '', '', ''], pp: [0, 0, 0],
  dedRates: [0, 0, 0, 0, 0, 0, 0],
  o: { type: 'Permanent', est: '', sub: '', cc: '', govt: 'Government of Sindh', vou: '', moa: '', tre: '', ddo: '', ctl: '', fun: '', f1: '09 EDUCATION AFFAIRS & SERVICE', f2: '096. ADMN.', f3: 'OFFICE STAFF', from: '', to: '', itc: '', spc: '', paycode: 'A01151', manual: false, absent: '', ddon: '', pm: 'transfer', payTo: '', bank: '' },
  e: { name: '', rel: 'S/o', father: '', sap: '', desig: '', bps: '14', basicPay: 0 },
  heads: HD.map(h => ({ l: h[0], s: h[1], c: h[2], au: '', on: !!h[3], rate: 0 })),
  other: ['Overtime Allow:', 'Honoraria', 'Rest & Recreation Allow:', 'Leave Salary', 'Other Allow:(F.Cant.Allow)'].map(l => ({ l, c: '', a: 0 })),
  rows: [{ m: '', pay: 0, a: Array(HD.length).fill(0), d: Array(DED.length).fill(0) }]
});

const str = v => v == null ? '' : String(v);
const padA = (arr, len, fill) => Array.from({ length: len }, (_, i) => arr && arr[i] != null ? arr[i] : fill);

export function rowOf(r, nh) {
  r = r && typeof r === 'object' ? r : {};
  return {
    m: okM(r.m) ? r.m : (isM(r.m) ? MAXM : ''),
    pay: ru(r.pay),
    a: padA(Array.isArray(r.a) ? r.a : [], nh, 0).map(ru),
    d: padA(Array.isArray(r.d) ? r.d : [], DED.length, 0).map(ru)
  };
}

export function sanitize(s) {
  const d = D();
  if (!s || typeof s !== 'object' || Array.isArray(s)) return d;
  const o = { ...d };
  o.copies = Math.min(3, Math.max(1, ru(s.copies) || 1));
  o.sz = !!s.sz;
  o.dc = padA(Array.isArray(s.dc) ? s.dc : d.dc, DED.length, '').map(str);
  o.pp = padA(Array.isArray(s.pp) ? s.pp : d.pp, 3, 0).map(ru);
  o.dedRates = padA(Array.isArray(s.dedRates) ? s.dedRates : (s.rows?.[0]?.d || d.dedRates), DED.length, 0).map(ru);
  o.o = { ...d.o, ...(s.o && typeof s.o === 'object' ? s.o : {}) };
  o.e = { ...d.e, ...(s.e && typeof s.e === 'object' ? s.e : {}) };
  o.e.basicPay = ru(s.e?.basicPay != null ? s.e.basicPay : (s.rows?.[0]?.pay || 0));
  ['type', 'est', 'sub', 'cc', 'govt', 'vou', 'moa', 'tre', 'ddo', 'ctl', 'fun', 'f1', 'f2', 'f3', 'from', 'to', 'itc', 'spc', 'paycode', 'absent', 'ddon', 'pm', 'payTo', 'bank'].forEach(k => o.o[k] = str(o.o[k]));
  o.o.govt = o.o.govt || 'Government of Sindh';
  o.o.f1 = o.o.f1 || '09 EDUCATION AFFAIRS & SERVICE';
  o.o.f2 = o.o.f2 || '096. ADMN.';
  o.o.f3 = o.o.f3 || 'OFFICE STAFF';
  o.o.manual = !!o.o.manual;
  if (!['transfer', 'cash', ''].includes(o.o.pm)) o.o.pm = 'transfer';
  ['name', 'rel', 'father', 'sap', 'desig', 'bps'].forEach(k => o.e[k] = str(o.e[k]));
  if (!['S/o', 'D/o', 'W/o'].includes(o.e.rel)) o.e.rel = 'S/o';
  const hs = Array.isArray(s.heads) ? s.heads : [];
  o.heads = d.heads.map((h, i) => {
    const x = hs[i] && typeof hs[i] === 'object' ? hs[i] : {};
    const fallbackRate = ru(s.rows?.[0]?.a?.[i] || 0);
    const rate = ru(x.rate != null ? x.rate : fallbackRate);
    return {
      l: str(x.l ?? h.l),
      s: str(x.s ?? h.s),
      c: str(x.c ?? h.c),
      au: str(x.au ?? h.au),
      on: x.on == null ? (rate > 0 || h.on) : !!x.on,
      rate
    };
  });
  const ot = Array.isArray(s.other) ? s.other : [];
  o.other = d.other.map((x, i) => {
    const y = ot[i] && typeof ot[i] === 'object' ? ot[i] : {};
    return { l: str(y.l ?? x.l), c: str(y.c ?? x.c), a: ru(y.a) };
  });
  const rows = Array.isArray(s.rows) ? s.rows.filter(r => r && typeof r === 'object') : [];
  o.rows = (rows.length ? rows : d.rows).slice(0, MAXROWS).map(r => rowOf(r, o.heads.length));
  if (!o.rows.length) o.rows = [rowOf({}, o.heads.length)];
  return o;
}

export const cl = o => JSON.parse(JSON.stringify(o));

export function gp(S, p) {
  return p.split('.').reduce((o, k) => o == null ? undefined : o[k], S);
}

export function sp(S, p, v) {
  const k = p.split('.');
  let o = S;
  for (let i = 0; i < k.length - 1; i++) {
    const x = k[i], nkey = /^\d+$/.test(k[i + 1]);
    if (o[x] == null || typeof o[x] !== 'object') o[x] = nkey ? [] : {};
    o = o[x];
  }
  o[k[k.length - 1]] = v;
}

export function calc(S) {
  const on = S.heads.map(h => h.on);
  const R = S.rows.map(r => {
    const e = n(r.pay) + r.a.reduce((t, v, i) => t + (on[i] ? n(v) : 0), 0);
    const d = r.d.reduce((t, v) => t + n(v), 0);
    return { e, d, net: e - d };
  });
  const sm = f => S.rows.reduce((t, r) => t + f(r), 0);
  const t = { R };
  t.pay = sm(r => n(r.pay));
  t.a = S.heads.map((h, i) => h.on ? sm(r => n(r.a[i])) : 0);
  t.d = DED.map((x, k) => sm(r => n(r.d[k])));
  t.e = R.reduce((x, r) => x + r.e, 0);
  t.ded = t.d.reduce((x, y) => x + y, 0);
  t.reg = t.a.reduce((x, y) => x + y, 0);
  t.oth = S.other.reduce((x, o) => x + n(o.a), 0);
  t.payTot = t.pay + S.pp.reduce((x, y) => x + n(y), 0);
  t.gross = t.payTot + t.reg + t.oth;
  t.net = t.gross - t.ded;
  return t;
}

export function isoRange(S) {
  const ms = S.rows.map(r => r.m).filter(isM).sort();
  if (!ms.length) return ['', ''];
  const [y2, k2] = ms.at(-1).split('-');
  const last = y2 + '-' + k2 + '-' + String(new Date(y2, k2, 0).getDate()).padStart(2, '0');
  return [ms[0] + '-01', last > TODAY ? TODAY : last];
}

export function range(S) {
  return [fd(S.o.from), fd(S.o.to)];
}

export const payCode = S => S.o.paycode || (S.e.bps ? (n(S.e.bps) >= 17 ? 'A01101' : 'A01151') : 'A01151');
export const CH = 24;
export const pc = S => Math.max(1, Math.ceil((S.rows.length || 1) / CH));
