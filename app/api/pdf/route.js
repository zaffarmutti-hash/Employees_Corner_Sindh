import { sanitize, calc } from '@/lib/tr22/core';
import { renderPages } from '@/lib/tr22/paper';
import { generatePdfFromHtml } from '@/lib/pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body || !body.data) {
      return Response.json({ error: 'Missing bill data for PDF generation' }, { status: 400 });
    }

    const S = sanitize(body.data);
    const T = calc(S);
    const pagesHtml = renderPages(S, T);

    const pdfBuffer = await generatePdfFromHtml(pagesHtml);
    const sap = S.e?.sap ? S.e.sap.replace(/[^a-zA-Z0-9_-]/g, '') : 'bill';
    const filename = `TR22_${sap}.pdf`;

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
    console.error('Server PDF generation error:', err);
    return Response.json(
      { error: err.message || 'Could not generate server-side PDF' },
      { status: 500 }
    );
  }
}

