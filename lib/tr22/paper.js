import { A, CH, DED, LB, esc, f0, fdm, n, payCode, pc, range, words } from './core.js';

const CERT = [
  'Received contents and certified that I have satisfied myself that all emoluments included in this bill drawn one month/two/three months previous to this date, with the exception of those detailed below of which the total has been refunded by deduction from this bill have been disbursed to the proper persons and that their acquittances have been taken and filed in my office with receipt stamp duly cancelled for every payment in excess of twenty rupees.',
  'Certified that no person has been absent either on other duty or suspension or without leave (except on casual leave) during the month of ',
  'Certified that no leave has been granted until by reference to the applicant’s service book, leave accounts and to leave rules applicable to him I had satisfied myself that it was admissible and that all grants of leave and departures on and returns from leave and all period of suspension and other duty and other leaves which are required under the rules to be recorded have been recorded in the service books and leave accounts under my attestation.',
  'Certified that all appointments and substantive promotions and such of the officiating promotions as have to be entered in the service books of the persons concerned under my attestation.',
  'Certified that each official for whom house rent allowance / conveyance allowance has been claimed in this bill:-'
];

const ft = (k, N) => `<div class="ft"><span>Created &amp; designed by Asif Ali Shar · Teacher &amp; Staff Ease of Access</span><b>Page ${k} of ${N}</b></div>`;
const SG = '<div class="sg"><span class="dd">DDO Stamp With Name</span></div>';

function sub(S, t, lab) {
  const o = S.o, e = S.e, [fr, to] = range(S);
  return `<div class="lab">${lab}</div>
<div class="tt">FORM T.R.22 — <u>${t}</u><br><span style="font-size:8.5pt">ARREARS BILL FORMAT FOR NON-GAZETTED OFFICIALS OF GOVT. OF SINDH · ${esc(o.type)} ${esc(o.est)} · FOR THE MONTH FROM ${fr} TO ${to}</span></div>
<div class="em"><span>Name: <b>${esc(e.name)}</b></span><span>SAP ID / PID: <b>${esc(e.sap)}</b></span>${e.desig ? `<span>Designation: <b>${esc(e.desig)}</b></span>` : ''}${e.bps ? `<span>BPS: <b>${esc(e.bps)}</b></span>` : ''}<span>Cost Center: <b>${esc(o.cc)}</b></span></div>`;
}

function nmc(S, k) {
  return `<td class="n" rowspan="${k}">${esc(S.e.name)}${S.e.father ? ` ${esc(S.e.rel)} ${esc(S.e.father)}` : ''}<br><span style="font-weight:normal">SAP ID: ${esc(S.e.sap)}</span></td>`;
}

function obverse(S, T, lab, k, N) {
  const o = S.o, e = S.e, [fr, to] = range(S), pp = S.pp;
  const it = i => {
    const h = S.heads[i] || { l: '', c: '' };
    return `${i == 4 ? `<td rowspan="10" class="cc">${esc(e.sap)}</td>` : ''}<td>${i + 1}.&nbsp; ${esc(h.l)}</td><td class="c">${esc(h.c)}</td><td class="r">${A(T.a[i])}</td><td></td>`;
  };
  return `<section class="sheet p"><div class="lab">${lab}</div>
<div class="tt">FORM T.R.22 (See rule 265) — OBVERSE<br><u style="font-size:10.5pt">ARREARS BILL FORMAT FOR NON-GAZETTED OFFICIALS OF GOVT. OF SINDH</u><br><u>DETAILED PAY BILL OF ${esc(o.type)} ${esc(o.est)}</u><br><u>FOR THE MONTH FROM ${fr} TO ${to}</u>${o.sub ? `<br>${esc(o.sub)}` : ''}</div>
<table class="f"><colgroup><col style="width:7.5mm"><col style="width:37.5mm"><col style="width:74mm"><col style="width:15mm"><col style="width:38mm"><col style="width:12mm"></colgroup>
<tr class="hd"><td colspan="2" class="wm"><i>${lab}</i></td><td colspan="4"><div class="hb">
<div class="g2"><span>Voucher No. ${esc(o.vou)}</span><span>Month of A/C ${esc(o.moa)}</span></div><div>${esc(o.govt || 'Government of Sindh')}</div><div class="g2"><span>Treasury Code No. ${esc(o.tre)}</span><span>Special Code ${esc(o.spc)}</span></div><div>Drawing &amp; Disbursing Officer Code No. ${esc(o.ddo)}</div><div>Controlling Officer Code No. ${esc(o.ctl)}</div><div class="fr">Functional Code No. ${esc(o.fun)}</div><div>${esc(o.f1 || '09 EDUCATION AFFAIRS & SERVICE')}</div><div class="g2"><span>${esc(o.f2 || '096. ADMN.')}</span><span>${esc(o.f3 || 'OFFICE STAFF')}</span></div></div></td></tr>
<tr><td colspan="2"><div class="bx"><i></i><i></i><i></i><i></i></div></td><td colspan="4"></td></tr>
<tr><td rowspan="6" class="v"><span>Cost Center</span></td><td rowspan="6" class="cc">${esc(o.cc)}</td><td class="hl">Establishment Charge</td><td rowspan="2" class="c">Object Code No.</td><td colspan="2" class="c">Amount</td></tr>
<tr><td class="hl">&nbsp;&nbsp;Pay 010</td><td class="c">Rs.</td><td class="c">Ps.</td></tr>
<tr><td>&nbsp;&nbsp;Pay of Establishment</td><td class="c">${esc(payCode(S))}</td><td class="r">${A(T.pay)}</td><td></td></tr>
<tr><td>&nbsp;&nbsp;Personal Pay</td><td class="c">013</td><td class="r">${A(pp[0], 1)}</td><td></td></tr>
<tr><td>&nbsp;&nbsp;Special Pay</td><td class="c">014</td><td class="r">${A(pp[1], 1)}</td><td></td></tr>
<tr><td>&nbsp;&nbsp;Other Pay</td><td class="c">010</td><td class="r">${A(pp[2], 1)}</td><td></td></tr>
<tr class="t"><td></td><td rowspan="6" class="cc">${esc((e.name || '').toUpperCase())}</td><td>Total of Pay</td><td class="c">019</td><td class="r">${A(T.payTot)}</td><td></td></tr>
<tr><td rowspan="15" class="v"><span>Name and PID</span></td><td class="hl">Regular Allowances 020</td><td></td><td></td><td></td></tr>
${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => `<tr>${it(i)}</tr>`).join('')}
<tr class="t"><td></td><td></td><td>Total Regular Allowance.</td><td class="c">020</td><td class="r">${A(T.reg)}</td><td></td></tr>
<tr class="ot"><td colspan="2" rowspan="11"><div class="au"><div>For use in Audit Office</div><div>Admitted&nbsp; Rs.</div><div>Objected&nbsp; Rs.</div><div>Auditor&nbsp; Superintendent.</div></div></td><td class="hl">Other Allowances 020</td><td></td><td></td><td></td></tr>
${S.other.map((x, i) => `<tr class="ot"><td>${i + 1}.&nbsp; ${esc(x.l)}</td><td class="c">${esc(x.c)}</td><td class="r">${A(n(x.a), 1)}</td><td></td></tr>`).join('')}
<tr class="t"><td>Total Other Allowances</td><td></td><td class="r">${A(T.oth)}</td><td></td></tr>
<tr class="t"><td>Gross Salary Est: Charge.</td><td></td><td class="r">${A(T.gross)}</td><td></td></tr>
<tr class="t"><td>Total Deduction (Details on last page)</td><td></td><td class="r">${A(T.ded)}</td><td></td></tr>
<tr class="t"><td>Net Amount Payable.</td><td></td><td class="r">${A(T.net)}</td><td></td></tr>
<tr><td colspan="4" class="wd"><b>(${words(T.net)})</b></td></tr></table><div class="sg"><span class="dd">DDO Stamp With Name</span></div>${ft(k, N)}</section>`;
}

function reverse(S, T, lab, k, N) {
  const o = S.o, d = T.d, pm = o.pm, pv = d[0] + d[1] + d[2] + d[3] + d[4] + d[6];
  const L = [['G.P.Fund .', d[0], 0], ['Group Insurance Fund', d[2], 2], ['Benevolent Fund', d[1], 1], ['House Rent', 0, -1], ['House Building Advances', d[3], 3], ['Motor Cycle Advances', 0, -1], ['Cycle Advances', 0, -1], ['Others Advances (Eid Adv:)', 0, -1], ['Professional Tax.', d[6], 6], ['Other Recovery of Overpayment', d[4], 4]];
  const itcStr = o.itc ? ' ' + esc(o.itc) : '';
  const R = [['Income Tax' + itcStr + ' Rs.', d[5]], ['P.L.I' + itcStr + ' Rs.', 0], ['Other Fund Rs.', 0], ['Other central Ded: Rs.', 0]];
  return `<section class="sheet p rv"><div class="lab">${lab}</div>
<div class="tt" style="margin-bottom:1.5mm;font-size:9.5pt">FORM T.R.22 (See rule 265) — REVERSE<br><u style="font-size:9pt">ARREARS BILL FORMAT FOR NON-GAZETTED OFFICIALS OF GOVT. OF SINDH</u></div>
${CERT.map((c, i) => `<p>${i + 1}.&nbsp;&nbsp;&nbsp;&nbsp;${c}${i == 1 ? `<span class="ul">${esc(o.absent)}</span>` : ''}</p>`).join('')}
<p class="s">a)&nbsp;&nbsp;&nbsp;&nbsp;has neither been provided with accommodation by the Government nor sharing such accommodation with another allottee without necessary permission of the Estate Officer and is not in occupation of rent free Government Quarter;</p>
<p class="s">b)&nbsp;&nbsp;&nbsp;&nbsp;his/her wife/husband is not in the service of the Federal/Provincial Government/Autonomous Body.</p>
<div class="g2" style="margin-top:3mm;font-weight:bold"><u>Under Rupees:-</u><span style="text-align:center"><u>Signature &amp; Designation D.D.O</u><br><span style="font-weight:normal">${esc(o.ddon)}</span></span></div>
<div class="two"><table class="dl"><colgroup><col style="width:55mm"><col style="width:14mm"><col style="width:27mm"></colgroup>
<tr class="th"><td>Gross Salary of Estt: Rs. <b>${f0(T.gross)}</b></td><td style="text-align:center">Code No</td><td style="text-align:center">Rs. &nbsp; Ps.</td></tr>
<tr><td colspan="3"><b>Deduction</b></td></tr>
${L.map(x => `<tr><td>${x[0]}</td><td style="text-align:center;font-size:8pt">${esc(S.dc[x[2]] || '')}</td><td class="rr">${A(x[1], 1)}</td></tr>`).join('')}
<tr class="t"><td colspan="2">Total Provincial deduction ( P to P)</td><td class="rr">${A(pv, 1)}</td></tr></table>
<table class="dr"><colgroup><col style="width:61mm"><col style="width:27mm"></colgroup>
${R.map(x => `<tr><td>${x[0]}</td><td class="rr">${A(x[1], 1)}</td></tr>`).join('')}
<tr class="t"><td>Total Central Ded: (P &amp; C) Rs.</td><td class="rr">${A(d[5], 1)}</td></tr>
<tr class="t"><td>Total Deduction P &amp; C Rs.</td><td class="rr">${A(T.ded, 1)}</td></tr>
<tr class="t"><td>Net: Amount Payable Rs.</td><td class="rr">${A(T.net, 1)}</td></tr>
<tr><td colspan="2" class="wd"><b>${words(T.net)}</b></td></tr></table></div>
<div style="margin-top:2.5mm;font-size:8.5pt"><b>Received Payment</b><br>Please Pay to <u>${esc(o.payTo || S.e.name)}</u> ${esc(o.bank)}</div>
<div class="stp"><span>DDO Stamp With Name</span><span>DDO Stamp With Name</span></div>
<table class="pay"><colgroup><col style="width:28mm"><col style="width:34mm"><col style="width:18mm"><col></colgroup>
<tr><td>Pay Rs.</td><td class="b">${pm == 'cash' ? f0(T.net) : ''}</td><td style="padding-left:6mm">Rupees</td><td class="b" rowspan="3" style="text-align:left;vertical-align:top;font-size:8pt;white-space:normal;width:auto">${pm ? words(T.net) : ''}</td></tr>
<tr><td>by Transfer Rs.</td><td class="b">${pm == 'transfer' ? f0(T.net) : ''}</td><td></td></tr>
<tr><td>Total Rs.</td><td class="b">${pm ? f0(T.net) : ''}</td><td></td></tr></table>${ft(k, N)}</section>`;
}

function stmt(S, T, lab, k0, N, title, fs, head, cell, tot, extra) {
  let h = '';
  const P = pc(S);
  for (let p = 0; p < P; p++) {
    const ix = S.rows.map((r, i) => i).slice(p * CH, (p + 1) * CH), last = p == P - 1;
    h += `<section class="sheet p" style="--fs:${fs}pt">${sub(S, title, lab)}<table class="a"><thead><tr>${head}</tr></thead><tbody>${ix.map((i, j) => `<tr>${j ? '' : nmc(S, ix.length)}<td style="text-align:center">${fdm(S.rows[i].m)}</td>${cell(S.rows[i], i)}</tr>`).join('')}${last ? `<tr class="tot"><td colspan="2" style="text-align:center">Total</td>${tot}</tr>` : ''}</tbody></table>${last ? extra + SG : '<div style="text-align:right;font-size:8pt;margin-top:2mm"><i>Continued on next page…</i></div>'}${ft(k0 + p, N)}</section>`;
  }
  return h;
}

function earnings(S, T, lab, k0, N) {
  const hs = S.heads.map((h, i) => i).filter(i => S.heads[i].on && (S.sz || T.a[i]));
  const cols = 4 + hs.length, fs = cols <= 9 ? 9 : cols <= 12 ? 8 : cols <= 15 ? 7 : 6.2;
  const au = S.heads.filter(h => h.on && h.au).map(h => `<div>${esc(h.s)}${h.c ? ` (${esc(h.c)})` : ''}: ${esc(h.au)}</div>`).join('');
  return stmt(S, T, lab, k0, N, 'STATEMENT OF ARREARS — BASIC PAY &amp; ALLOWANCES (MONTH-WISE)', fs,
    `<th>NAME</th><th>PERIOD</th><th>PAY<br><small>${esc(payCode(S))}</small></th>${hs.map(i => `<th>${esc(S.heads[i].s)}${S.heads[i].c ? `<br><small>${esc(S.heads[i].c)}</small>` : ''}</th>`).join('')}<th>TOTAL (GROSS)</th>`,
    (r, i) => `<td>${A(n(r.pay))}</td>${hs.map(j => `<td>${A(n(r.a[j]))}</td>`).join('')}<td><b>${A(T.R[i].e)}</b></td>`,
    `<td>${A(T.pay)}</td>${hs.map(j => `<td>${A(T.a[j])}</td>`).join('')}<td>${A(T.e)}</td>`,
    au ? `<div style="font-size:7pt;line-height:1.2;margin-top:1.5mm"><b>Authority (Finance Department letters):</b>${au}</div>` : '');
}

function deductions(S, T, lab, k0, N) {
  const ds = DED.map((x, i) => i).filter(i => S.sz || T.d[i]);
  return stmt(S, T, lab, k0, N, 'STATEMENT OF DEDUCTIONS &amp; RECOVERIES (MONTH-WISE)', ds.length > 5 ? 8 : 9,
    `<th>NAME</th><th>PERIOD</th><th>GROSS</th>${ds.map(i => `<th>${DED[i][0]}${S.dc[i] ? `<br><small>${esc(S.dc[i])}</small>` : ''}</th>`).join('')}<th>TOTAL DEDUCTION</th><th>NET PAYABLE</th>`,
    (r, i) => `<td>${A(T.R[i].e)}</td>${ds.map(k => `<td>${A(n(r.d[k]))}</td>`).join('')}<td><b>${A(T.R[i].d)}</b></td><td><b>${A(T.R[i].net)}</b></td>`,
    `<td>${A(T.e)}</td>${ds.map(k => `<td>${A(T.d[k])}</td>`).join('')}<td>${A(T.ded)}</td><td>${A(T.e - T.ded)}</td>`,
    `<div style="margin-top:2mm;font-weight:bold;font-size:8.5pt">Net amount payable: Rs. ${f0(T.net)} — ${words(T.net)}</div>`);
}

export function renderPages(S, T) {
  const P = pc(S), N = 2 + 2 * P;
  let h = '';
  for (let c = 0; c < S.copies; c++) {
    const lab = LB[c] || ('COPY ' + (c + 1));
    h += obverse(S, T, lab, 1, N) + earnings(S, T, lab, 2, N) + deductions(S, T, lab, 2 + P, N) + reverse(S, T, lab, N, N);
    if (N % 2 && c < S.copies - 1) h += '<section class="sheet p"></section>';
  }
  return h;
}
