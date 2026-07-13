'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Package, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface DashboardData {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalSubscribers: number;
  recentOrders: Array<{
    id: number;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
    items: Array<{ productName: string }>;
  }>;
  ordersByStatus: Array<{ status: string; _count: number }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('aerth_admin_token');
    fetch('/api/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setData(d); })
      .catch(() => {});
  }, []);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-black">Dashboard</h1>
        <p className="text-zinc-500 text-xs tracking-wider mt-1">Overview of your store</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-zinc-300" />
          </div>
          <p className="text-2xl font-bold text-black">{data?.totalOrders || 0}</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Revenue</span>
            <TrendingUp className="w-4 h-4 text-zinc-300" />
          </div>
          <p className="text-2xl font-bold text-black">₹{Math.round(data?.totalRevenue || 0).toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Products</span>
            <Package className="w-4 h-4 text-zinc-300" />
          </div>
          <p className="text-2xl font-bold text-black">{data?.totalProducts || 0}</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Subscribers</span>
            <Users className="w-4 h-4 text-zinc-300" />
          </div>
          <p className="text-2xl font-bold text-black">{data?.totalSubscribers || 0}</p>
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {data?.recentOrders?.length === 0 && (
              <p className="text-xs text-zinc-400">No orders yet.</p>
            )}
            {data?.recentOrders?.map((order) => (
              <Link
                key={order.id}
                href="/admin/orders"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 transition-colors border border-zinc-100"
              >
                <div>
                  <p className="text-xs font-semibold text-black">#{order.id} - {order.customerName}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    {order.items?.length || 0} item(s) &middot; {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="text-xs font-bold">₹{Math.round(order.total).toLocaleString('en-IN')}</span>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${statusColors[order.status] || 'bg-zinc-100 text-zinc-600'}`}>
                    {order.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-4">Orders by Status</h2>
          <div className="space-y-3">
            {data?.ordersByStatus?.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <span className="text-xs text-zinc-600 uppercase tracking-wider">{item.status}</span>
                <span className="text-xs font-bold text-black">{item._count}</span>
              </div>
            ))}
            {(!data?.ordersByStatus || data.ordersByStatus.length === 0) && (
              <p className="text-xs text-zinc-400">No data yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
