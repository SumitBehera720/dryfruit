'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, ShoppingBag, Package, Star, HelpCircle,
  FileText, Grid3X3, Mail, Settings, LogOut, Menu, X, BookOpen,
  File, Menu as MenuIcon,
} from 'lucide-react';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/questions', label: 'Q&A', icon: HelpCircle },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/categories', label: 'Categories', icon: Grid3X3 },
  { href: '/admin/journal', label: 'Journal', icon: BookOpen },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
  { href: '/admin/pages', label: 'Pages', icon: File },
  { href: '/admin/menu', label: 'Menu', icon: MenuIcon },
  { href: '/admin/footer', label: 'Footer', icon: MenuIcon },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('aerth_admin_token');
    if (!token) {
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      return;
    }

    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('aerth_admin_token');
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('aerth_admin_token');
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0c0c0c] text-white flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <Link href="/admin" className="text-sm font-bold uppercase tracking-widest">
            AERTH Admin
          </Link>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-3">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
            {user?.name} <span className="text-zinc-600">({user?.email})</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar (mobile) */}
        <header className="lg:hidden bg-white border-b border-zinc-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="p-1">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold uppercase tracking-widest">AERTH Admin</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
