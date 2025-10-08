'use client';
import { useEffect, useState } from 'react';
import Container from '@/components/Container';

export default function Thanks() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // показываем тост если пришли с формы
    if (typeof window !== 'undefined') {
      const fromForm = new URLSearchParams(window.location.search).get('ok') === '1' ||
        sessionStorage.getItem('brief_toast') === '1';
      if (fromForm) {
        setShowToast(true);
        sessionStorage.removeItem('brief_toast');
        const t = setTimeout(() => setShowToast(false), 4000);
        return () => clearTimeout(t);
      }
    }
  }, []);

  return (
    <div className="relative">
      <Container className="py-20 text-center">
        <h1 className="text-3xl font-semibold mb-2">Спасибо! ✉️</h1>
        <p className="text-zinc-600">Я свяжусь с вами в Telegram или на email.</p>
      </Container>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl border bg-white/90 px-4 py-3 text-sm shadow-lg backdrop-blur">
          Спасибо, заявка отправлена!
        </div>
      )}
    </div>
  );
}
