'use client';

import React, { useEffect, useState } from 'react';
import { Star, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  approved: boolean;
  date: string;
  product: { name: string; slug: string };
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchReviews = () => {
    fetch('/api/reviews', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setReviews(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchReviews() }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleApproval = async (id: number, approved: boolean) => {
    await fetch(`/api/reviews/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ approved }),
    });
    fetchReviews();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this review?')) return;
    await fetch(`/api/reviews/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchReviews();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold uppercase tracking-widest text-black">Reviews</h1>
        <p className="text-zinc-500 text-xs tracking-wider mt-1">{reviews.length} total reviews</p>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 && <p className="text-xs text-zinc-400">No reviews yet.</p>}
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-black">{review.author}</span>
                  {review.verified && <span className="text-[8px] bg-green-50 text-green-700 font-bold uppercase px-1.5 py-0.5 rounded border border-green-200">Verified</span>}
                </div>
                <p className="text-[10px] text-zinc-400 mt-0.5">on {review.product.name} &middot; {new Date(review.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-black stroke-black' : 'stroke-zinc-200'}`} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-black">{review.title}</p>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              {review.approved ? (
                <button onClick={() => toggleApproval(review.id, false)} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-yellow-600 hover:text-yellow-700">
                  <XCircle className="w-3.5 h-3.5" /> Unapprove
                </button>
              ) : (
                <button onClick={() => toggleApproval(review.id, true)} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-green-600 hover:text-green-700">
                  <CheckCircle className="w-3.5 h-3.5" /> Approve
                </button>
              )}
              <button onClick={() => handleDelete(review.id)} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-red-500 hover:text-red-600">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
