import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET() {
  await dbConnect();
  const rows = await Customer.find().sort({ createdAt: -1 });
  return Response.json(rows, { status: 200 });
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const created = await Customer.create({
      ...body,
      memberNumber: Number(body.memberNumber)
    });
    return Response.json(created, { status: 201 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}

