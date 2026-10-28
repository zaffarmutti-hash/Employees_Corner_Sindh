'use client';

export default function SeoKnowledgeBase() {
  return (
    <div className="portal-sec">
      <div className="card" style={{ borderLeft: '4px solid var(--g)' }}>
        <h2 style={{ fontSize: 18, margin: '0 0 4px', color: 'var(--g)' }}>
          📚 Employees Corner Sindh Knowledge Base &amp; Treasury Rules Guide
        </h2>
        <div style={{ fontSize: 13, color: '#555' }}>
          Official rules, Treasury Rule 265 guidelines, Pension Form 2 (FO-2) handbook, and DDO instructions
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
        <div className="card">
          <h2 style={{ color: 'var(--g)' }}>📖 What is Form T.R.22 Arrears Pay Bill?</h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#333' }}>
            Under <b>Treasury Rule 265 (T.R. 265)</b> of the Federal and Sindh Treasury Rules, when salaries, annual increments, adhoc relief allowances, or revised pay scales are drawn retrospectively, they must be processed on <b>Form T.R.22 (Detailed Pay Bill of Arrears)</b>.
          </p>
          <ul style={{ fontSize: 13, lineHeight: 1.6, paddingLeft: 18, color: '#444' }}>
            <li><b>Obverse Side (Page 1):</b> Details the Cost Center, DDO code, Functional code, Treasury code, pay breakdown, and 14 regular allowance heads.</li>
            <li><b>Statement of Arrears (Page 2):</b> A month-by-month record of basic pay and admissible allowance heads drawn or claimed.</li>
            <li><b>Statement of Deductions (Page 3):</b> Month-wise record of G.P. Fund, Benevolent Fund, Group Insurance, Professional Tax, and Income Tax.</li>
            <li><b>Reverse Side (Page 4):</b> 5 statutory certifications signed by the Drawing &amp; Disbursing Officer (DDO), along with payment authorization and sanction stamp.</li>
          </ul>
        </div>

        <div className="card">
          <h2 style={{ color: 'var(--g)' }}>🧮 Understanding Form 2 (FO-2) Pension Dossier</h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#333' }}>
            <b>Form 2 (Form FO-2)</b> is the official <i>Pension Calculation and Sanction Paper</i> prescribed under the Sindh Civil Servants Pension Rules for employees retiring on superannuation, voluntary retirement (after 25 years), or invalidation.
          </p>
          <ul style={{ fontSize: 13, lineHeight: 1.6, paddingLeft: 18, color: '#444' }}>
            <li><b>Gross Pension:</b> Calculated as <code>(Last Reckonable Emoluments × Qualifying Service / 30) × 70%</code>. Maximum qualifying service is capped at 30 years.</li>
            <li><b>Commutation (Lumpsum):</b> Up to 35% of gross pension can be commuted into a one-time lump-sum payment based on the pensioner's age at their next birthday.</li>
            <li><b>Net Monthly Pension:</b> The remaining 65% forms the regular monthly pension, with additional allowances such as Medical Allowance.</li>
          </ul>
        </div>

        <div className="card">
          <h2 style={{ color: 'var(--g)' }}>🏛 Key PIFRA Object Codes Used in Sindh</h2>
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', marginTop: 8 }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '4px 6px', fontWeight: 'bold' }}>A01101</td>
                <td style={{ padding: '4px 6px' }}>Officers Basic Pay (BPS-17 &amp; above)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '4px 6px', fontWeight: 'bold' }}>A01151</td>
                <td style={{ padding: '4px 6px' }}>Officials Basic Pay (BPS-01 to BPS-16)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '4px 6px', fontWeight: 'bold' }}>A01202</td>
                <td style={{ padding: '4px 6px' }}>House Rent Allowance (HRA)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '4px 6px', fontWeight: 'bold' }}>A01203</td>
                <td style={{ padding: '4px 6px' }}>Conveyance Allowance (CA)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '4px 6px', fontWeight: 'bold' }}>A01217</td>
                <td style={{ padding: '4px 6px' }}>Medical Allowance (MA)</td>
              </tr>
              <tr>
                <td style={{ padding: '4px 6px', fontWeight: 'bold' }}>A0124X</td>
                <td style={{ padding: '4px 6px' }}>Adhoc Relief Allowance (ARA 2023) 35%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2 style={{ color: 'var(--g)' }}>✅ DDO Checklist for Treasury Bill Clearance</h2>
          <ol style={{ fontSize: 13, lineHeight: 1.6, paddingLeft: 18, color: '#444' }}>
            <li>Verify SAP ID / PID and CNIC matches the employee's payroll database.</li>
            <li>Ensure the correct DDO code, Cost Center, and Functional code are stamped.</li>
            <li>Confirm that the bill is printed in <b>quadruplicate or triplicate (Original, Duplicate, Triplicate)</b> on A4 paper with a left filing gutter.</li>
            <li>Verify all 5 statutory certificates on the reverse side are signed and sealed by the DDO.</li>
            <li>Attach the relevant Finance Department sanction letters or appointment/promotion orders.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

