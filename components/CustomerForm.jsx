'use client';
import { useState } from 'react';

export default function CustomerForm({ initial, onSaved }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const isEdit = !!initial?._id;

  const [form, setForm] = useState(
    initial ?? { name: '', dob: '', memberNumber: '', interests: '' }
  );

  async function submit(e) {
    e.preventDefault();
    const url = isEdit ? `${base}/api/customers/${initial._id}` : `${base}/api/customers`;
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, memberNumber: Number(form.memberNumber) })
    });

    if (!res.ok) return alert('Save failed');
    onSaved && onSaved(await res.json());
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input className="border p-2 w-full" placeholder="Name"
        value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
      <input type="date" className="border p-2 w-full"
        value={form.dob?.slice(0,10) || form.dob}
        onChange={e=>setForm({...form, dob:e.target.value})}/>
      <input className="border p-2 w-full" placeholder="Member Number"
        value={form.memberNumber}
        onChange={e=>setForm({...form, memberNumber:e.target.value})}/>
      <input className="border p-2 w-full" placeholder="Interests"
        value={form.interests}
        onChange={e=>setForm({...form, interests:e.target.value})}/>
      <button className="bg-black text-white px-3 py-2 rounded">
        {isEdit ? 'Update' : 'Add'}
      </button>
    </form>
  );
}

