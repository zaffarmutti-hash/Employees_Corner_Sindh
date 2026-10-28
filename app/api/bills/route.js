import { listBills, saveBill } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const bills = await listBills();
    return Response.json({ bills });
  } catch (err) {
    return Response.json({ error: err.message || 'Could not list bills' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return Response.json({ error: 'Invalid bill payload' }, { status: 400 });
    }
    const saved = await saveBill(body.data, body.id);
    return Response.json(saved);
  } catch (err) {
    return Response.json({ error: err.message || 'Could not save bill' }, { status: 500 });
  }
}
