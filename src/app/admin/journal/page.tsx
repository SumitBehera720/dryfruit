'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface JournalPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  active: boolean;
  image: string | null;
}

export default function AdminJournalPage() {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<JournalPost | null>(null);
  const [form, setForm] = useState({ title: '', excerpt: '', author: '', category: 'Design', active: true, image: '' });
  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchPosts = () => {
    if (!token) return;
    fetch('/api/journal', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setPosts(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchPosts() }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;

    await fetch('/api/journal', {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    setShowForm(false);
    setEditing(null);
    setForm({ title: '', excerpt: '', author: '', category: 'Design', active: true, image: '' });
    fetchPosts();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch('/api/journal', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    fetchPosts();
  };

  const startEdit = (post: JournalPost) => {
    setEditing(post);
    setForm({ title: post.title, excerpt: post.excerpt, author: post.author, category: post.category, active: post.active, image: post.image || '' });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-black">Journal</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">{posts.length} posts</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ title: '', excerpt: '', author: '', category: 'Design', active: true, image: '' }); setShowForm(true); }}
          className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-800">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">{post.category}</span>
                {!post.active && <span className="text-[8px] font-bold uppercase text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Draft</span>}
              </div>
              <p className="text-xs font-semibold text-black">{post.title}</p>
              <p className="text-[10px] text-zinc-500">{post.author} &middot; {new Date(post.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => startEdit(post)} className="p-1.5 text-zinc-400 hover:text-black"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(post.id)} className="p-1.5 text-zinc-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 space-y-5" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-black">{editing ? 'Edit Post' : 'New Post'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Title</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Author</label>
                  <input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black">
                    <option value="Design">Design</option><option value="Mindfulness">Mindfulness</option><option value="Running">Running</option><option value="Technology">Technology</option>
                  </select></div>
              </div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Excerpt</label>
                <textarea rows={3} required value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black" /></div>
              <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} label="Cover Image" />
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
