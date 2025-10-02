'use client';
import { useEffect, useState } from 'react';
import CustomerForm from '@/components/CustomerForm';

export default function Detail({ params }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const r = await fetch(`${base}/api/customers/${params.id}`, { cache: 'no-store' });
      setData(await r.json());
    })();
  }, [params.id]);

  if (!data) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">Customer Detail</h1>
      <div className="p-4 border rounded">
        <div><b>Name:</b> {data.name}</div>
        <div><b>DOB:</b> {new Date(data.dob).toLocaleDateString()}</div>
        <div><b>Member #</b> {data.memberNumber}</div>
        <div><b>Interests:</b> {data.interests}</div>
      </div>

      <h2 className="text-lg font-semibold">Update</h2>
      <CustomerForm initial={data} onSaved={setData} />
    </div>
  );
}

