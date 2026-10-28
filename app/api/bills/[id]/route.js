import { deleteBill, getBill, saveBill } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    const bill = await getBill(id);
    if (!bill) return Response.json({ error: 'Bill not found' }, { status: 404 });
    return Response.json(bill);
  } catch (err) {
    return Response.json({ error: err.message || 'Could not load bill' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const saved = await saveBill(body?.data, id);
    return Response.json(saved);
  } catch (err) {
    return Response.json({ error: err.message || 'Could not update bill' }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    const ok = await deleteBill(id);
    if (!ok) return Response.json({ error: 'Bill not found' }, { status: 404 });
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: err.message || 'Could not delete bill' }, { status: 500 });
  }
}
