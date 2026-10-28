import { generatePdfFromHtml } from '@/lib/pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const f0 = v => Math.round(Number(v) || 0).toLocaleString('en-US');

export async function POST(req) {
  try {
    const body = await req.json();
    const { emp, service, nextAge, factor, totalEmoluments, grossPension, commAmount, commLumpsum, netMonthlyPension, medicalAllowance } = body || {};

    if (!emp) {
      return Response.json({ error: 'Missing employee pension data' }, { status: 400 });
    }

    const html = `
    <section class="sheet p" style="background:#fff;padding:12mm 16mm;border:none;margin:0 auto;box-shadow:none;">
      <div style="text-align:center;margin-bottom:6mm;">
        <div style="font-size:14pt;font-weight:bold;text-transform:uppercase;">Government of Sindh</div>
        <div style="font-size:11pt;font-weight:bold;">FORM 2 (FORM FO-2) — PENSION CALCULATION SHEET</div>
        <div style="font-size:9pt;color:#444;">(See Sindh Civil Servants Pension Rules, Chapter III)</div>
      </div>

      <table style="width:100%;border-collapse:collapse;font-size:9.5pt;margin-bottom:6mm;">
        <tbody>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;width:35%;font-weight:bold;">1. Name of Civil Servant:</td>
            <td style="border:1px solid #000;padding:5px 8px;">${emp.name || '—'}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">2. Father / Husband Name:</td>
            <td style="border:1px solid #000;padding:5px 8px;">${emp.father || '—'}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">3. CNIC No. &amp; SAP PID:</td>
            <td style="border:1px solid #000;padding:5px 8px;">CNIC: ${emp.cnic || '—'} &nbsp;|&nbsp; SAP ID: ${emp.sap || '—'}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">4. Post &amp; Pay Scale (BPS):</td>
            <td style="border:1px solid #000;padding:5px 8px;">${emp.desig || '—'} (BPS-${emp.bps || '—'})</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">5. Department / Office:</td>
            <td style="border:1px solid #000;padding:5px 8px;">${emp.dept || '—'}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">6. Date of Birth:</td>
            <td style="border:1px solid #000;padding:5px 8px;">${emp.dob || '—'}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">7. Date of Entry in Govt. Service:</td>
            <td style="border:1px solid #000;padding:5px 8px;">${emp.doa || '—'}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">8. Date of Retirement:</td>
            <td style="border:1px solid #000;padding:5px 8px;">${emp.dor || '—'}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">9. Gross Service Length:</td>
            <td style="border:1px solid #000;padding:5px 8px;">${service?.years || 0} Y, ${service?.months || 0} M, ${service?.days || 0} D</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">10. Qualifying Service Admissible:</td>
            <td style="border:1px solid #000;padding:5px 8px;"><b>${service?.qualifying || 0} Years</b> (Subject to max 30 years)</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">11. Last Basic Pay Emoluments:</td>
            <td style="border:1px solid #000;padding:5px 8px;">Rs. ${f0(totalEmoluments)}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">12. Gross Pension Amount:</td>
            <td style="border:1px solid #000;padding:5px 8px;"><b>Rs. ${f0(grossPension)}</b> (${totalEmoluments} × ${service?.qualifying || 0} / 30 × 70%)</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">13. Commutation (${emp.commRate}%):</td>
            <td style="border:1px solid #000;padding:5px 8px;">Rs. ${f0(commAmount)}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:5px 8px;font-weight:bold;">14. Age next birthday &amp; Factor:</td>
            <td style="border:1px solid #000;padding:5px 8px;">Age: ${nextAge} Y &nbsp;|&nbsp; Commutation Factor: ${Number(factor).toFixed(4)}</td>
          </tr>
          <tr style="background:#f5f5f5;">
            <td style="border:1px solid #000;padding:6px 8px;font-weight:bold;">15. Commutation Value Payable:</td>
            <td style="border:1px solid #000;padding:6px 8px;font-size:11pt;font-weight:bold;">Rs. ${f0(commLumpsum)}</td>
          </tr>
          <tr style="background:#f5f5f5;">
            <td style="border:1px solid #000;padding:6px 8px;font-weight:bold;">16. Net Monthly Pension:</td>
            <td style="border:1px solid #000;padding:6px 8px;font-size:11pt;font-weight:bold;">Rs. ${f0(netMonthlyPension)} (+ Medical: Rs. ${f0(medicalAllowance)})</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top:12mm;display:flex;justify-content:space-between;text-align:center;font-size:9pt;">
        <div style="width:45%;border-top:1px solid #000;padding-top:2mm;">
          Signature &amp; Official Seal of<br><b>Head of Office / DDO</b>
        </div>
        <div style="width:45%;border-top:1px solid #000;padding-top:2mm;">
          Audit Officer / Senior Accounts Officer<br><b>District Accounts Office / AG Sindh</b>
        </div>
      </div>
    </section>
    `;

    const pdfBuffer = await generatePdfFromHtml(html);
    const sap = emp.sap ? emp.sap.replace(/[^a-zA-Z0-9_-]/g, '') : 'pension';
    const filename = `Pension_FO2_${sap}.pdf`;

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfBuffer.length),
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    });
  } catch (err) {
    console.error('Pension PDF generation error:', err);
    return Response.json(
      { error: err.message || 'Could not generate pension PDF' },
      { status: 500 }
    );
  }
}

