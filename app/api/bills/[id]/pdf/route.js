import { getBill } from '@/lib/store';
import { sanitize, calc } from '@/lib/tr22/core';
import { renderPages } from '@/lib/tr22/paper';
import { generatePdfFromHtml } from '@/lib/pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    const bill = await getBill(id);
    if (!bill || !bill.data) {
      return Response.json({ error: 'Bill record not found' }, { status: 404 });
    }

    const S = sanitize(bill.data);
    const T = calc(S);
    const pagesHtml = renderPages(S, T);

    const pdfBuffer = await generatePdfFromHtml(pagesHtml);
    const sap = S.e?.sap ? S.e.sap.replace(/[^a-zA-Z0-9_-]/g, '') : 'bill';
    const filename = `TR22_${sap}.pdf`;

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Content-Length': String(pdfBuffer.length),
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    });
  } catch (err) {
    console.error('Server PDF generation error:', err);
    return Response.json(
      { error: err.message || 'Could not generate server-side PDF' },
      { status: 500 }
    );
  }
}

