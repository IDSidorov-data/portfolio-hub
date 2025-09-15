'use client';
import { useState } from 'react';
import { sendEvent } from '@/lib/analytics';
import { useRouter } from 'next/navigation';

export default function BriefForm() {
  const [state, setState] = useState({ name: '', email: '', tg: '', about: '', budget: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...state, source: 'site' })
      });
      const json = await res.json();
      if (json.ok) {
        sendEvent('brief_form_submit', state);
        router.push('/thanks');
      }
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="mb-1 block text-xs">Имя</label>
        <input className="w-full rounded-xl border p-3 text-sm" value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })} />
      </div>
      <div>
        <label className="mb-1 block text-xs">Email</label>
        <input required type="email" className="w-full rounded-xl border p-3 text-sm" value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })} />
      </div>
      <div className="md:col-span-2 flex justify-end gap-3">
        <button type="submit" disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white">{loading ? 'Отправка…' : 'Отправить'}</button>
      </div>
    </form>
  );
}