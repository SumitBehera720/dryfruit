'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface PageData {
  id: number;
  title: string;
  slug: string;
  content: string;
  active: boolean;
}

export default function DynamicPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/pages/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPage(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="w-6 h-6 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!page || !page.active) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-black">Page Not Found</h1>
          <p className="text-zinc-500 text-sm mt-2">The page you&apos;re looking for doesn&apos;t exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-widest text-black mb-8">{page.title}</h1>
        <div className="prose prose-zinc max-w-none text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: page.content }} />
      </main>
      <Footer />
    </div>
  );
}
