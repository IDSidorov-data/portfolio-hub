'use client';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Cases from '@/components/Cases';
import Process from '@/components/Process';
import Stack from '@/components/Stack';
import Container from '@/components/Container';
import BriefForm from '@/components/BriefForm';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const source = params.get('utm_source') ?? 'site';

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero onOpenBooking={() => setOpen(true)} />
        <Services />
        <Cases />
        <Process />
        <Stack />
        <Container id="brief" className="py-10">
          <h2 className="mb-6 text-2xl font-semibold">Оставить бриф проекта</h2>
          <BriefForm defaultSource={source} />
        </Container>
      </main>
      <Footer />
      <Modal open={open} onClose={() => setOpen(false)} title="Скоро: запись через Telegram WebApp">
        <p className="text-sm">Оставьте email — пришлю ссылку, когда запись включу.</p>
      </Modal>
    </div>
  );
}
