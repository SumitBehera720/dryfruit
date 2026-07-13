'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  label: string | null;
  category: string;
  gender: string;
  active: boolean;
  variants: Array<{ id: number; colorName: string; hex: string; image: string; stock: number }>;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ slug: '', name: '', price: '', label: '', category: 'leggings', gender: 'women', description: '', image: '' });

  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchProducts = () => {
    fetch('/api/products', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setProducts(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchProducts() }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing ? `/api/products/${editing.id}` : '/api/products';
    const method = editing ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });

    setShowForm(false);
    setEditing(null);
    setForm({ slug: '', name: '', price: '', label: '', category: 'leggings', gender: 'women', description: '', image: '' });
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchProducts();
  };

  const startEdit = (product: Product) => {
    setEditing(product);
    setForm({
      slug: product.slug,
      name: product.name,
      price: String(product.price),
      label: product.label || '',
      category: product.category,
      gender: product.gender,
      description: '',
      image: product.variants?.[0]?.image || '',
    });
    setShowForm(true);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-black">Products</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">{products.length} products</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ slug: '', name: '', price: '', label: '', category: 'leggings', gender: 'women', description: '', image: '' }); setShowForm(true); }} className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full bg-white border border-zinc-200 rounded-lg pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-black" />
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Name</th>
              <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Category</th>
              <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Gender</th>
              <th className="text-right px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Price</th>
              <th className="text-center px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Variants</th>
              <th className="text-right px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-semibold text-black">{product.name}</td>
                <td className="px-4 py-3 text-zinc-500 uppercase">{product.category}</td>
                <td className="px-4 py-3 text-zinc-500 uppercase">{product.gender}</td>
                <td className="px-4 py-3 text-right font-semibold">₹{product.price.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {product.variants?.map((v) => (
                      <span key={v.id} className="w-3.5 h-3.5 rounded-full border border-zinc-300 inline-block" style={{ backgroundColor: v.hex }} title={v.colorName} />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => startEdit(product)} className="p-1.5 text-zinc-400 hover:text-black transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(product.id)} className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 space-y-5" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-black">{editing ? 'Edit Product' : 'New Product'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Slug</label><input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Price (₹)</label><input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Label</label><input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="NEW" className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black">
                  <option value="leggings">Leggings</option><option value="shorts">Shorts</option><option value="bras">Bras</option><option value="tops">Tops</option><option value="jackets">Jackets</option>
                </select></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Gender</label><select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black">
                  <option value="women">Women</option><option value="men">Men</option><option value="unisex">Unisex</option>
                </select></div>
              </div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} label="Main Image (first variant)" />
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
