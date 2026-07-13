'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, Download } from 'lucide-react';

interface Subscriber {
  id: number;
  email: string;
  createdAt: string;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchSubscribers = () => {
    fetch('/api/newsletter', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setSubscribers(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchSubscribers() }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this subscriber?')) return;
    await fetch('/api/newsletter', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    fetchSubscribers();
  };

  const exportCSV = () => {
    const csv = 'Email,Subscribed Date\n' + subscribers.map((s) => `${s.email},${new Date(s.createdAt).toLocaleDateString()}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-black">Newsletter</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">{subscribers.length} subscribers</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-800">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Email</th>
              <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Subscribed</th>
              <th className="text-right px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-semibold text-black">{sub.email}</td>
                <td className="px-4 py-3 text-zinc-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(sub.id)} className="p-1.5 text-zinc-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
