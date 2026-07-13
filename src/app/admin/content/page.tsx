'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface Content {
  id: number;
  page: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image: string | null;
  linkUrl: string | null;
  linkText: string | null;
  active: boolean;
  sortOrder: number;
}

export default function AdminContentPage() {
  const [content, setContent] = useState<Content[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Content | null>(null);
  const [form, setForm] = useState({ page: 'home', section: '', title: '', subtitle: '', description: '', image: '', linkUrl: '', linkText: '', sortOrder: 0 });
  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchContent = () => {
    fetch('/api/content', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setContent(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchContent() }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing ? `/api/content/${editing.id}` : '/api/content';
    const method = editing ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });

    setShowForm(false);
    setEditing(null);
    setForm({ page: 'home', section: '', title: '', subtitle: '', description: '', image: '', linkUrl: '', linkText: '', sortOrder: 0 });
    fetchContent();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this section?')) return;
    await fetch(`/api/content/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchContent();
  };

  const startEdit = (item: Content) => {
    setEditing(item);
    setForm({
      page: item.page,
      section: item.section,
      title: item.title || '',
      subtitle: item.subtitle || '',
      description: item.description || '',
      image: item.image || '',
      linkUrl: item.linkUrl || '',
      linkText: item.linkText || '',
      sortOrder: item.sortOrder,
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-black">Content Sections</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">Manage homepage & site content</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ page: 'home', section: '', title: '', subtitle: '', description: '', image: '', linkUrl: '', linkText: '', sortOrder: 0 }); setShowForm(true); }}
          className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-800"
        >
          <Plus className="w-4 h-4" /> Add Section
        </button>
      </div>

      <div className="space-y-4">
        {content.map((item) => (
          <div key={item.id} className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">{item.page}</span>
                <span className="text-[10px] font-bold uppercase text-zinc-400">{item.section}</span>
                {!item.active && <span className="text-[8px] font-bold uppercase text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Inactive</span>}
              </div>
              <p className="text-xs font-semibold text-black">{item.title || 'Untitled'}</p>
              {item.subtitle && <p className="text-[10px] text-zinc-500">{item.subtitle}</p>}
              <p className="text-[10px] text-zinc-400">Order: {item.sortOrder}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => startEdit(item)} className="p-1.5 text-zinc-400 hover:text-black"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 text-zinc-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 space-y-5 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-black">{editing ? 'Edit Section' : 'New Section'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Page</label>
                  <select value={form.page} onChange={(e) => setForm({ ...form, page: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black">
                    <option value="home">Home</option><option value="about">About</option><option value="technology">Technology</option>
                  </select></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Section</label>
                  <input required value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} placeholder="hero" className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              </div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Subtitle</label>
                <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} label="Image" />
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
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
