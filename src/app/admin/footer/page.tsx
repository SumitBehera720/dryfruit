'use client';

import React, { useEffect, useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface FooterLink {
  label: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface FooterData {
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  copyright: string;
}

const defaultFooter: FooterData = {
  socialLinks: [
    { platform: 'Instagram', url: '', icon: 'instagram' },
    { platform: 'Facebook', url: '', icon: 'facebook' },
    { platform: 'YouTube', url: '', icon: 'youtube' },
    { platform: 'Pinterest', url: '', icon: 'pinterest' },
  ],
  columns: [
    { title: 'Shop', links: [{ label: 'All Products', url: '/shop' }] },
    { title: 'Company', links: [{ label: 'About Us', url: '/about' }] },
    { title: 'Help', links: [{ label: 'FAQs', url: '/about' }] },
  ],
  copyright: '© 2026, AERTH. All rights reserved.',
};

export default function AdminFooterPage() {
  const [data, setData] = useState<FooterData>(defaultFooter);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  useEffect(() => {
    fetch('/api/footer')
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setData(d); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/footer', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSocial = (i: number, field: keyof SocialLink, value: string) => {
    const links = [...data.socialLinks];
    links[i] = { ...links[i], [field]: value };
    setData({ ...data, socialLinks: links });
  };

  const addColumn = () => {
    setData({ ...data, columns: [...data.columns, { title: '', links: [{ label: '', url: '' }] }] });
  };

  const removeColumn = (ci: number) => {
    setData({ ...data, columns: data.columns.filter((_, i) => i !== ci) });
  };

  const updateColumn = (ci: number, title: string) => {
    const cols = [...data.columns];
    cols[ci] = { ...cols[ci], title };
    setData({ ...data, columns: cols });
  };

  const addLink = (ci: number) => {
    const cols = [...data.columns];
    cols[ci] = { ...cols[ci], links: [...cols[ci].links, { label: '', url: '' }] };
    setData({ ...data, columns: cols });
  };

  const removeLink = (ci: number, li: number) => {
    const cols = [...data.columns];
    cols[ci] = { ...cols[ci], links: cols[ci].links.filter((_, i) => i !== li) };
    setData({ ...data, columns: cols });
  };

  const updateLink = (ci: number, li: number, field: keyof FooterLink, value: string) => {
    const cols = [...data.columns];
    const links = [...cols[ci].links];
    links[li] = { ...links[li], [field]: value };
    cols[ci] = { ...cols[ci], links };
    setData({ ...data, columns: cols });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-black">Footer</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">Manage footer social links & page links</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-lg hover:bg-zinc-800 disabled:opacity-50"
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            'Saved!'
          ) : (
            <><Save className="w-4 h-4" /> Save Footer</>
          )}
        </button>
      </div>

      {/* Social Links */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-black">Social Links</h2>
        {data.socialLinks.map((social, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr] gap-3 items-center">
            <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">{social.platform}</span>
            <input
              type="text"
              value={social.url}
              onChange={(e) => updateSocial(i, 'url', e.target.value)}
              placeholder="https://instagram.com/aerth"
              className="w-full border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black"
            />
          </div>
        ))}
      </div>

      {/* Link Columns */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-black">Link Columns</h2>
          <button onClick={addColumn} className="flex items-center gap-1 text-[10px] font-bold uppercase text-zinc-500 hover:text-black">
            <Plus className="w-3.5 h-3.5" /> Add Column
          </button>
        </div>

        {data.columns.map((col, ci) => (
          <div key={ci} className="border border-zinc-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={col.title}
                onChange={(e) => updateColumn(ci, e.target.value)}
                placeholder="Column Title"
                className="text-xs font-bold uppercase tracking-widest border-none p-0 focus:outline-none focus:ring-0 w-48"
              />
              <button onClick={() => removeColumn(ci)} className="text-zinc-400 hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {col.links.map((link, li) => (
                <div key={li} className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateLink(ci, li, 'label', e.target.value)}
                    placeholder="Link label"
                    className="border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateLink(ci, li, 'url', e.target.value)}
                    placeholder="/about"
                    className="border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black"
                  />
                  <button onClick={() => removeLink(ci, li)} className="text-zinc-400 hover:text-red-500 p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button onClick={() => addLink(ci)} className="text-[10px] font-bold uppercase text-zinc-400 hover:text-black underline underline-offset-2">
              + Add Link
            </button>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-black">Copyright</h2>
        <input
          type="text"
          value={data.copyright}
          onChange={(e) => setData({ ...data, copyright: e.target.value })}
          className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black"
        />
      </div>
    </div>
  );
}
