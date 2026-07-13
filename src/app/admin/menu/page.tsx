'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';

interface MenuItem {
  id: number;
  label: string;
  url: string | null;
  pageSlug: string | null;
  parentId: number | null;
  sortOrder: number;
  location: string;
  megaMenu: boolean;
  children?: MenuItem[];
}

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState({ label: '', url: '', pageSlug: '', parentId: '', sortOrder: 0, location: 'main', megaMenu: false });
  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchItems = () => {
    fetch('/api/menu?location=main', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setItems(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchItems() }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/menu/${editing.id}` : '/api/menu';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        ...form,
        parentId: form.parentId ? parseInt(form.parentId) : null,
      }),
    });

    setShowForm(false);
    setEditing(null);
    setForm({ label: '', url: '', pageSlug: '', parentId: '', sortOrder: 0, location: 'main', megaMenu: false });
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this menu item?')) return;
    await fetch(`/api/menu/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchItems();
  };

  const startEdit = (item: MenuItem) => {
    setEditing(item);
    setForm({
      label: item.label,
      url: item.url || '',
      pageSlug: item.pageSlug || '',
      parentId: String(item.parentId || ''),
      sortOrder: item.sortOrder,
      location: item.location,
      megaMenu: item.megaMenu,
    });
    setShowForm(true);
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => (
    <div key={item.id}>
      <div className={`flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 border border-zinc-100 ${depth > 0 ? 'ml-6' : ''}`}>
        <div className="flex items-center gap-3">
          <GripVertical className="w-3.5 h-3.5 text-zinc-300" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-black">{item.label}</span>
              {item.megaMenu && <span className="text-[8px] bg-blue-50 text-blue-700 font-bold uppercase px-1.5 py-0.5 rounded border border-blue-200">Mega</span>}
              {depth > 0 && <span className="text-[8px] text-zinc-400 uppercase">Sub</span>}
            </div>
            <p className="text-[10px] text-zinc-400">{item.url || '/' + (item.pageSlug || '')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => startEdit(item)} className="p-1.5 text-zinc-400 hover:text-black"><Edit2 className="w-3.5 h-3.5" /></button>
          <button onClick={() => handleDelete(item.id)} className="p-1.5 text-zinc-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      {item.children?.map((child) => renderMenuItem(child, depth + 1))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-black">Menu</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">Manage navigation menu items</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ label: '', url: '', pageSlug: '', parentId: '', sortOrder: 0, location: 'main', megaMenu: false }); setShowForm(true); }}
          className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-800">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-2">
        {items.length === 0 && <p className="text-xs text-zinc-400 text-center py-8">No menu items yet. Add your first item.</p>}
        {items.map((item) => renderMenuItem(item))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-8 space-y-5" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-black">{editing ? 'Edit Menu Item' : 'New Menu Item'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Label</label>
                <input required value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Women" className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">URL</label>
                  <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="/shop?gender=women" className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Page Slug</label>
                  <input value={form.pageSlug} onChange={(e) => setForm({ ...form, pageSlug: e.target.value })} placeholder="about-us" className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Parent Item</label>
                  <select value={form.parentId} onChange={(e) => setForm({ ...form, parentId: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black">
                    <option value="">None (Top Level)</option>
                    {items.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.megaMenu} onChange={(e) => setForm({ ...form, megaMenu: e.target.checked })} className="accent-black" />
                <span className="text-[10px] font-bold uppercase text-zinc-500">Mega Menu (show children as columns)</span>
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
