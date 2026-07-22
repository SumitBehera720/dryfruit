'use client';

import React, { useEffect, useState } from 'react';
import { Save, Plus, Trash2, Upload, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  image: string;
  link: string;
}

export default function AdminInstagramPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // New item form state
  const [newImage, setNewImage] = useState('');
  const [newLink, setNewLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchGallery = () => {
    setLoading(true);
    fetch('/api/instagram')
      .then(async (res) => res.ok ? res.json() : [])
      .then((data: GalleryItem[]) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setNewImage(data.url);
    } catch {
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage) {
      setError('Please upload an image first.');
      return;
    }
    if (!newLink) {
      setError('Please provide an Instagram link.');
      return;
    }

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      image: newImage,
      link: newLink,
    };

    setItems([...items, newItem]);
    setNewImage('');
    setNewLink('');
    setError('');
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/instagram', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(items),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      setError('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-black">Instagram Gallery</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">Manage home page Instagram feed images & links</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors"
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            'Saved!'
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Gallery
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg p-3 uppercase tracking-wider font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Add New Item Form */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 h-fit space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-zinc-100 pb-2">Add New Image</h2>
          
          <form onSubmit={handleAddItem} className="space-y-4">
            
            {/* Image Upload Area */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Upload Image</label>
              
              {newImage ? (
                <div className="relative w-full aspect-square bg-zinc-50 rounded-lg overflow-hidden border border-zinc-200 group">
                  <Image src={newImage} alt="Preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setNewImage('')}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-square border border-dashed border-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors">
                  <Upload className="w-6 h-6 text-zinc-400 mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {uploading ? 'Uploading...' : 'Choose File'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                </label>
              )}
            </div>

            {/* Instagram Link */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Instagram Link (URL)</label>
              <input
                type="text"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="https://instagram.com/p/..."
                className="w-full border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full flex items-center justify-center gap-1.5 bg-black hover:bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" /> Add to Gallery
            </button>

          </form>
        </div>

        {/* Current Items Grid */}
        <div className="md:col-span-2 bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-zinc-100 pb-2 mb-4">Gallery Images ({items.length})</h2>
          
          {loading ? (
            <div className="text-center py-12 text-xs text-zinc-400 uppercase tracking-widest font-semibold">
              Loading gallery...
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-xs text-zinc-400 uppercase tracking-widest font-semibold">
              No gallery images found. Add some on the left.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden border border-zinc-100 shadow-sm group bg-zinc-50">
                  <Image src={item.image} alt="Gallery item" fill className="object-cover" />
                  
                  {/* Delete & Link Controls */}
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-3 transition-opacity space-y-2">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-white bg-zinc-800 px-3 py-1.5 rounded hover:bg-zinc-700 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" /> Visit Link
                    </a>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-500/20 px-3 py-1.5 rounded hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
