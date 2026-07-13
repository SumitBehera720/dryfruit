'use client';

import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('aerth_admin_token');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        onChange(data.url);
      }
    } catch {
      console.error('Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{label}</label>}
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-200 flex-shrink-0">
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-lg border-2 border-dashed border-zinc-200 flex items-center justify-center flex-shrink-0 bg-zinc-50">
            {uploading ? (
              <span className="w-4 h-4 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
            ) : (
              <Upload className="w-5 h-5 text-zinc-300" />
            )}
          </div>
        )}
        <div className="flex-1 space-y-1">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL or upload"
            className="w-full border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black"
          />
          <label className="cursor-pointer inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-zinc-500 hover:text-black transition-colors">
            <Upload className="w-3 h-3" />
            Upload from device
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
