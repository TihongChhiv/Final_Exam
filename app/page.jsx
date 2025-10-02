'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CustomerForm from '@/components/CustomerForm';

export default function Home() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [rows, setRows] = useState([]);

  async function load() {
    const r = await fetch(`${base}/api/customers`, { cache: 'no-store' });
    setRows(await r.json());
  }
  useEffect(() => { load(); }, []);

  async function del(id) {
    if (!confirm('Delete?')) return;
    await fetch(`${base}/api/customers/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Customers</h1>

      <CustomerForm onSaved={load} />

      <ul className="divide-y">
        {rows.map(c => (
          <li key={c._id} className="py-3 flex items-center justify-between gap-3">
            <div>
              <Link className="underline" href={`/customer/${c._id}`}>{c.name}</Link>
              <div className="text-sm text-gray-500">
                #{c.memberNumber} · {new Date(c.dob).toLocaleDateString()}
              </div>
              <div className="text-sm">{c.interests}</div>
            </div>
            <Link className="px-3 py-1 border rounded" href={`/customer/${c._id}`}>Edit</Link>
            <button className="px-3 py-1 border rounded" onClick={() => del(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

