'use client';

import React, { useEffect, useState } from 'react';

interface OrderItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

interface Order {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  items: OrderItem[];
}

const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchOrders = () => {
    fetch('/api/orders', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setOrders(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchOrders() }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold uppercase tracking-widest text-black">Orders</h1>
        <p className="text-zinc-500 text-xs tracking-wider mt-1">{orders.length} total orders</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Order</th>
              <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Customer</th>
              <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Date</th>
              <th className="text-right px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Total</th>
              <th className="text-center px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Status</th>
              <th className="text-right px-4 py-3 font-bold uppercase tracking-wider text-zinc-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-50 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                <td className="px-4 py-3 font-semibold text-black">#{order.id}</td>
                <td className="px-4 py-3 text-zinc-700">{order.customerName}</td>
                <td className="px-4 py-3 text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right font-semibold">₹{Math.round(order.total).toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${statusColors[order.status] || 'bg-zinc-100 text-zinc-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <select
                    value={order.status}
                    onChange={(e) => { e.stopPropagation(); updateStatus(order.id, e.target.value); }}
                    className="text-[10px] border border-zinc-200 rounded px-2 py-1 focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 space-y-5 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-black">Order #{selectedOrder.id}</h2>
              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${statusColors[selectedOrder.status]}`}>{selectedOrder.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-zinc-400">Customer</p>
                <p className="text-black font-semibold">{selectedOrder.customerName}</p>
                <p className="text-zinc-500">{selectedOrder.email}</p>
                <p className="text-zinc-500">{selectedOrder.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-zinc-400">Shipping</p>
                <p className="text-black">{selectedOrder.address}</p>
                <p className="text-zinc-500">{selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}</p>
                <p className="text-zinc-500">Payment: {selectedOrder.paymentMethod.toUpperCase()}</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2">Items</p>
              <div className="space-y-2">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-zinc-50 p-3 rounded-lg">
                    <div>
                      <p className="text-xs font-semibold text-black">{item.productName}</p>
                      <p className="text-[10px] text-zinc-500">{item.color} / {item.size} &times; {item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold">₹{Math.round(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-4 flex justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">Total</span>
              <span className="text-sm font-bold">₹{Math.round(selectedOrder.total).toLocaleString('en-IN')}</span>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase text-zinc-400">Update Status</p>
              <div className="flex gap-2 flex-wrap">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selectedOrder.id, s)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg border transition-colors ${
                      selectedOrder.status === s ? 'bg-black text-white border-black' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
