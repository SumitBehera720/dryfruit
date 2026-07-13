'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Category {
  id: number;
  slug: string;
  name: string;
  gender: string;
  sortOrder: number;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ slug: '', name: '', gender: 'all', sortOrder: 0 });
  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchCategories = () => {
    fetch('/api/categories', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setCategories(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchCategories() }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = '/api/categories';
    const method = editing ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editing ? { id: editing.id, ...form } : form),
    });

    setShowForm(false);
    setEditing(null);
    setForm({ slug: '', name: '', gender: 'all', sortOrder: 0 });
    fetchCategories();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this category?')) return;
    await fetch('/api/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    fetchCategories();
  };

  const startEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ slug: cat.slug, name: cat.name, gender: cat.gender, sortOrder: cat.sortOrder });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-black">Categories</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">{categories.length} categories</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ slug: '', name: '', gender: 'all', sortOrder: 0 }); setShowForm(true); }} className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-800">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Name</th>
              <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Slug</th>
              <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Gender</th>
              <th className="text-center px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Order</th>
              <th className="text-right px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-semibold text-black">{cat.name}</td>
                <td className="px-4 py-3 text-zinc-500">{cat.slug}</td>
                <td className="px-4 py-3 text-zinc-500 uppercase">{cat.gender}</td>
                <td className="px-4 py-3 text-center text-zinc-500">{cat.sortOrder}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => startEdit(cat)} className="p-1.5 text-zinc-400 hover:text-black"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-zinc-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-8 space-y-5" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-black">{editing ? 'Edit Category' : 'New Category'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Slug</label>
                <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Gender</label>
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black">
                    <option value="all">All</option><option value="women">Women</option><option value="men">Men</option>
                  </select></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
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
