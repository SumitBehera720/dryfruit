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
          <p className="text-zinc-500 text-xs tracking-wider mt-1">Manage Homepage & Shop page banners, headers, and text</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ page: 'home', section: 'hero', title: '', subtitle: '', description: '', image: '', linkUrl: '', linkText: '', sortOrder: 0 }); setShowForm(true); }}
          className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-800"
        >
          <Plus className="w-4 h-4" /> Add Section
        </button>
      </div>

      {/* Helper guide card */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs space-y-2">
        <p className="font-bold text-black uppercase tracking-wider">💡 How to update website banners & sections:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-600">
          <div className="bg-white p-2.5 rounded border border-zinc-200">
            <span className="font-bold text-black block">🖼️ Homepage Hero Banner</span>
            Set Page = <code className="bg-zinc-100 px-1 py-0.5 rounded text-black font-semibold">home</code>, Section = <code className="bg-zinc-100 px-1 py-0.5 rounded text-black font-semibold">hero</code>
          </div>
          <div className="bg-white p-2.5 rounded border border-zinc-200">
            <span className="font-bold text-black block">📖 Brand Story Section</span>
            Set Page = <code className="bg-zinc-100 px-1 py-0.5 rounded text-black font-semibold">home</code>, Section = <code className="bg-zinc-100 px-1 py-0.5 rounded text-black font-semibold">brand_story</code>
          </div>
          <div className="bg-white p-2.5 rounded border border-zinc-200">
            <span className="font-bold text-black block">🛍️ Shop Collection Banners</span>
            Set Page = <code className="bg-zinc-100 px-1 py-0.5 rounded text-black font-semibold">shop</code>, Section = <code className="bg-zinc-100 px-1 py-0.5 rounded text-black font-semibold">banner_all / banner_men / banner_women</code>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {content.map((item) => (
          <div key={item.id} className="bg-white border border-zinc-200 rounded-xl p-5 flex items-center justify-between gap-4">
            {item.image && (
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-zinc-200 flex-shrink-0 bg-zinc-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">{item.page}</span>
                <span className="text-[10px] font-bold uppercase text-black bg-zinc-200/70 px-2 py-0.5 rounded">{item.section}</span>
                {!item.active && <span className="text-[8px] font-bold uppercase text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Inactive</span>}
              </div>
              <p className="text-xs font-semibold text-black truncate">{item.title || 'Untitled'}</p>
              {item.subtitle && <p className="text-[10px] text-zinc-500 truncate">{item.subtitle}</p>}
              {item.description && <p className="text-[10px] text-zinc-400 truncate max-w-md">{item.description}</p>}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => startEdit(item)} className="px-3 py-1.5 text-xs font-semibold border border-zinc-200 rounded-lg hover:bg-zinc-50 flex items-center gap-1.5"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
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
                    <option value="home">Home</option>
                    <option value="shop">Shop</option>
                    <option value="about">About</option>
                    <option value="technology">Technology</option>
                  </select>
                </div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Section Name</label>
                  <select
                    value={['hero', 'brand_story', 'banner_all', 'banner_men', 'banner_women'].includes(form.section) ? form.section : 'custom'}
                    onChange={(e) => {
                      if (e.target.value !== 'custom') setForm({ ...form, section: e.target.value });
                    }}
                    className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black"
                  >
                    <option value="hero">Hero Main Banner (home &rarr; hero)</option>
                    <option value="brand_story">Brand Story Banner (home &rarr; brand_story)</option>
                    <option value="banner_all">Shop Banner All (shop &rarr; banner_all)</option>
                    <option value="banner_men">Shop Banner Men (shop &rarr; banner_men)</option>
                    <option value="banner_women">Shop Banner Women (shop &rarr; banner_women)</option>
                    <option value="custom">Custom Section Name...</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-500">Exact Section Identifier</label>
                <input required value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} placeholder="hero" className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" />
              </div>

              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Banner Title / Heading</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Made For Movement" className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Banner Subtitle / Tag</label>
                <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="e.g. Built Between Air and Earth" className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Banner Description Text</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Performance apparel that moves with you..." className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              
              <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} label="Banner Image (Upload or Paste URL)" />
              
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

