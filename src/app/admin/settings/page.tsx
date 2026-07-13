'use client';

import React, { useEffect, useState } from 'react';
import { Save, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchSettings = () => {
    fetch('/api/settings')
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setSettings(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchSettings() }, []);

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: prev[key] === 'true' ? 'false' : 'true',
    }));
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold uppercase tracking-widest text-black">Settings</h1>
        <p className="text-zinc-500 text-xs tracking-wider mt-1">Site configuration & maintenance</p>
      </div>

      {/* Maintenance Mode */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${settings.maintenance_mode === 'true' ? 'bg-red-50' : 'bg-green-50'}`}>
              <Shield className={`w-5 h-5 ${settings.maintenance_mode === 'true' ? 'text-red-500' : 'text-green-500'}`} />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-black">Maintenance Mode</h2>
              <p className="text-[10px] text-zinc-500 mt-0.5">
                {settings.maintenance_mode === 'true'
                  ? 'Site is currently in maintenance mode. Only admins can access.'
                  : 'Site is live and publicly accessible.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('maintenance_mode')}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              settings.maintenance_mode === 'true' ? 'bg-red-500' : 'bg-zinc-300'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                settings.maintenance_mode === 'true' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {settings.maintenance_mode === 'true' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-[10px] text-yellow-800 font-semibold uppercase tracking-wider">
              Warning: Public visitors will see a &quot;Under Maintenance&quot; page. You can still access /admin.
            </p>
          </div>
        )}
      </div>

      {/* General Settings */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-black">General Settings</h2>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Site Name</label>
          <input
            value={settings.site_name || ''}
            onChange={(e) => handleChange('site_name', e.target.value)}
            className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Free Shipping Threshold (₹)</label>
          <input
            value={settings.free_shipping_threshold || ''}
            onChange={(e) => handleChange('free_shipping_threshold', e.target.value)}
            className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Return Policy</label>
          <textarea
            rows={3}
            value={settings.return_policy || ''}
            onChange={(e) => handleChange('return_policy', e.target.value)}
            className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
      >
        {saving ? (
          <span className="w-4 h-4 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
        ) : saved ? (
          <>Saved!</>
        ) : (
          <>
            <Save className="w-4 h-4" /> Save Settings
          </>
        )}
      </button>
    </div>
  );
}
