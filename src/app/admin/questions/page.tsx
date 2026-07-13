'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, MessageSquare } from 'lucide-react';

interface Question {
  id: number;
  user: string;
  question: string;
  answer: string | null;
  date: string;
  product: { name: string; slug: string };
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answerText, setAnswerText] = useState<Record<number, string>>({});
  const [answering, setAnswering] = useState<number | null>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('aerth_admin_token') : null;

  const fetchQuestions = () => {
    fetch('/api/questions', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setQuestions(d); })
      .catch(() => {});
  };

  useEffect(() => { fetchQuestions() }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitAnswer = async (id: number) => {
    const answer = answerText[id];
    if (!answer?.trim()) return;

    await fetch(`/api/questions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ answer }),
    });

    setAnswering(null);
    setAnswerText((prev) => ({ ...prev, [id]: '' }));
    fetchQuestions();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this question?')) return;
    await fetch(`/api/questions/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchQuestions();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold uppercase tracking-widest text-black">Questions & Answers</h1>
        <p className="text-zinc-500 text-xs tracking-wider mt-1">{questions.length} total questions</p>
      </div>

      <div className="space-y-4">
        {questions.length === 0 && <p className="text-xs text-zinc-400">No questions yet.</p>}
        {questions.map((q) => (
          <div key={q.id} className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-xs font-bold text-black">{q.user}</span>
                  <span className="text-[10px] text-zinc-400">on {q.product.name}</span>
                  <span className="text-[10px] text-zinc-400">&middot; {new Date(q.date).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-zinc-700 mt-1 font-medium">Q: {q.question}</p>
              </div>
              <button onClick={() => handleDelete(q.id)} className="p-1 text-zinc-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>

            {q.answer ? (
              <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3">
                <p className="text-[10px] font-bold uppercase text-zinc-400">AERTH Team Reply</p>
                <p className="text-xs text-zinc-700 mt-1">{q.answer}</p>
              </div>
            ) : (
              <div className="border-t border-zinc-100 pt-3">
                {answering === q.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={answerText[q.id] || ''}
                      onChange={(e) => setAnswerText((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder="Write your answer..."
                      rows={3}
                      className="w-full border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-black"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => submitAnswer(q.id)} className="bg-black text-white text-[10px] font-bold uppercase px-4 py-2 rounded-lg hover:bg-zinc-800">Submit</button>
                      <button onClick={() => setAnswering(null)} className="text-[10px] font-bold uppercase text-zinc-500 px-4 py-2 hover:text-black">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setAnswering(q.id)} className="text-[10px] font-bold uppercase text-zinc-500 hover:text-black underline underline-offset-2">Answer this question</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
