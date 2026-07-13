'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  active: boolean;
  createdAt: string;
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Page | null>(null);
  const [form, setForm] = useState({ title: '', slug: '', content: '', active: true });
  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchPages = () => {
    fetch('/api/pages', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setPages(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchPages() }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/pages/${editing.id}` : '/api/pages';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editing ? { id: editing.id, ...form } : form),
    });

    setShowForm(false);
    setEditing(null);
    setForm({ title: '', slug: '', content: '', active: true });
    fetchPages();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this page?')) return;
    await fetch(`/api/pages/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchPages();
  };

  const startEdit = (page: Page) => {
    setEditing(page);
    setForm({ title: page.title, slug: page.slug, content: page.content, active: page.active });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-black">Pages</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">{pages.length} pages</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ title: '', slug: '', content: '', active: true }); setShowForm(true); }}
          className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-800">
          <Plus className="w-4 h-4" /> Add Page
        </button>
      </div>

      <div className="space-y-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-black">{page.title}</p>
                {!page.active && <span className="text-[8px] font-bold uppercase text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Inactive</span>}
              </div>
              <p className="text-[10px] text-zinc-400">/{page.slug}</p>
              <p className="text-[10px] text-zinc-400">{new Date(page.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/${page.slug}`} target="_blank" className="p-1.5 text-zinc-400 hover:text-blue-500"><ExternalLink className="w-3.5 h-3.5" /></Link>
              <button onClick={() => startEdit(page)} className="p-1.5 text-zinc-400 hover:text-black"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(page.id)} className="p-1.5 text-zinc-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 space-y-5 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-black">{editing ? 'Edit Page' : 'New Page'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Title</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Slug</label>
                <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="about-us" className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Content (HTML)</label>
                <textarea rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs font-mono focus:outline-none focus:border-black" /></div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-black" />
                <span className="text-[10px] font-bold uppercase text-zinc-500">Active</span>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-zinc-200 text-zinc-600 text-xs font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-zinc-50">Cancel</button>
                <button type="submit" className="flex-1 bg-black text-white text-xs font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-zinc-800">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
