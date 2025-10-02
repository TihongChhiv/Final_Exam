import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET(_, { params }) {
  await dbConnect();
  const row = await Customer.findById(params.id);
  if (!row) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(row, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();
    const updated = await Customer.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(updated, { status: 200 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  await dbConnect();
  const del = await Customer.findByIdAndDelete(params.id);
  if (!del) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ ok: true }, { status: 200 });
}

