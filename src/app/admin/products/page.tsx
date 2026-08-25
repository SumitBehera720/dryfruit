'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, X, Upload } from 'lucide-react';


interface Variant {
  id?: number;
  colorName: string;
  hex: string;
  image: string;
  images: string[];
  stock: number;
}

interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  salePrice: number | null;
  label: string | null;
  category: string;
  gender: string;
  active: boolean;
  variants: Variant[];
  description?: string;
}

const defaultForm = {
  slug: '', name: '', price: '', salePrice: '', label: '', category: 'leggings', gender: 'women', description: '', image: '', variants: [] as Variant[],
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchProducts = () => {
    fetch('/api/products', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setProducts(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchProducts() }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...defaultForm });
    setError('');
    setShowForm(true);
  };

  const startEdit = (product: Product) => {
    setEditing(product);
    setForm({
      slug: product.slug,
      name: product.name,
      price: String(product.price),
      salePrice: product.salePrice ? String(product.salePrice) : '',
      label: product.label || '',
      category: product.category,
      gender: product.gender,
      description: product.description || '',
      image: product.variants?.[0]?.image || '',
      variants: product.variants?.map(v => ({ ...v, images: safeParse(v.images) })) || [],
    });
    setError('');
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const url = editing ? `/api/products/${editing.id}` : '/api/products';
    const method = editing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: form.price, salePrice: form.salePrice || null }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to save'); return; }
      setShowForm(false);
      fetchProducts();
    } catch { setError('Network error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchProducts();
  };

  const addVariant = () => {
    setForm({ ...form, variants: [...form.variants, { colorName: '', hex: '#cccccc', image: '', images: [], stock: 10 }] });
  };

  const removeVariant = (idx: number) => {
    setForm({ ...form, variants: form.variants.filter((_, i) => i !== idx) });
  };

  const updateVariant = (idx: number, field: keyof Variant, value: unknown) => {
    setForm((prev) => {
      const updated = prev.variants.map((v, i) => {
        if (i !== idx) return v;
        return { ...v, [field]: value };
      });
      return { ...prev, variants: updated };
    });
  };

  const addVariantImage = (idx: number, url: string) => {
    const updated = [...form.variants];
    updated[idx].images.push(url);
    if (!updated[idx].image) updated[idx].image = url;
    setForm({ ...form, variants: updated });
  };

  const removeVariantImage = (vIdx: number, imgIdx: number) => {
    const updated = [...form.variants];
    updated[vIdx].images = updated[vIdx].images.filter((_, i) => i !== imgIdx);
    if (updated[vIdx].image === form.variants[vIdx].images[imgIdx]) {
      updated[vIdx].image = updated[vIdx].images[0] || '';
    }
    setForm({ ...form, variants: updated });
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
        <button onClick={openNew} className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors">
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
              <th className="text-right px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Sale</th>
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
                <td className="px-4 py-3 text-right">{product.salePrice ? <span className="text-red-500 font-semibold">₹{product.salePrice.toLocaleString('en-IN')}</span> : <span className="text-zinc-300">&mdash;</span>}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {product.variants?.map((v, i) => (
                      <span key={i} className="w-3.5 h-3.5 rounded-full border border-zinc-300 inline-block" style={{ backgroundColor: v.hex }} title={v.colorName} />
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

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 space-y-5 my-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-black">{editing ? 'Edit Product' : 'New Product'}</h2>

            {error && <p className="text-red-500 text-[10px] uppercase font-bold">{error}</p>}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Slug</label><input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Price (₹)</label><input required type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Sale Price (₹)</label><input type="number" step="0.01" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Label</label><input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="NEW" className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black">
                  <option value="nuts">Nuts & Kernels</option><option value="dried-fruits">Dried Fruits & Dates</option><option value="seeds">Seeds & Mixes</option><option value="gifting">Exotic Gifting</option>
                </select></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Gender</label><select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black">
                  <option value="women">Women</option><option value="men">Men</option><option value="unisex">Unisex</option>
                </select></div>
              </div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>

              {/* Variants */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase text-zinc-500">Color Variants</label>
                  <button type="button" onClick={addVariant} className="text-[10px] font-bold uppercase text-black hover:text-zinc-600 flex items-center gap-1"><Plus className="w-3 h-3" /> Add Color</button>
                </div>
                {form.variants.length === 0 && <p className="text-[10px] text-zinc-400 italic">No variants. Add at least one color variant.</p>}
                {form.variants.map((v, idx) => (
                  <div key={idx} className="border border-zinc-200 rounded-lg p-4 space-y-3 relative">
                    <button type="button" onClick={() => removeVariant(idx)} className="absolute top-2 right-2 text-zinc-400 hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-zinc-400">Color Name</label><input value={v.colorName} onChange={(e) => updateVariant(idx, 'colorName', e.target.value)} placeholder="Black" className="w-full border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black" /></div>
                      <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-zinc-400">Hex</label><div className="flex gap-1 items-center"><input type="color" value={v.hex} onChange={(e) => updateVariant(idx, 'hex', e.target.value)} className="w-8 h-8 p-0 border border-zinc-200 rounded cursor-pointer" /><input value={v.hex} onChange={(e) => updateVariant(idx, 'hex', e.target.value)} className="flex-1 border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black" /></div></div>
                      <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-zinc-400">Image URL</label><input value={v.image} onChange={(e) => updateVariant(idx, 'image', e.target.value)} placeholder="Main image URL" className="w-full border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black" /></div>
                      <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-zinc-400">Stock</label><input type="number" value={v.stock} onChange={(e) => updateVariant(idx, 'stock', parseInt(e.target.value) || 0)} className="w-full border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black" /></div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-zinc-400">Images (multiple)</label>
                      <div className="flex flex-wrap gap-2">
                        {v.images.map((img, imgIdx) => (
                          <div key={imgIdx} className="relative group">
                            <img src={img} alt="" className="w-14 h-14 object-cover rounded border border-zinc-200" />
                            <button type="button" onClick={() => removeVariantImage(idx, imgIdx)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-2.5 h-2.5" /></button>
                          </div>
                        ))}
                        <VariantImageUpload onUpload={(url) => addVariantImage(idx, url)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-zinc-200 text-zinc-600 text-xs font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-zinc-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-black text-white text-xs font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-zinc-800 disabled:opacity-50">{saving ? 'Saving...' : editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function VariantImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // Read file as Base64 data URL to bypass CDN multipart filtering
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
      const token = localStorage.getItem('aerth_admin_token');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: dataUrl, name: file.name, type: file.type }),
      });
      const data = await res.json();
      if (res.ok) onUpload(data.url);
    } catch { console.error('Upload failed'); }
    finally { setUploading(false); if (inputRef.current) inputRef.current.value = ''; }
  };

  return (
    <label className="w-14 h-14 rounded-lg border-2 border-dashed border-zinc-200 flex items-center justify-center bg-zinc-50 cursor-pointer hover:border-zinc-400 transition-colors">
      {uploading ? <span className="w-4 h-4 border-2 border-zinc-300 border-t-black rounded-full animate-spin" /> : <Upload className="w-4 h-4 text-zinc-400" />}
      <input type="file" accept="image/*" onChange={handleFile} className="hidden" ref={inputRef} />
    </label>
  );
}

function safeParse(val: unknown): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') { try { const p = JSON.parse(val); return Array.isArray(p) ? p : []; } catch { return []; } }
  return [];
}
