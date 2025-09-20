'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';
const Services = dynamic(() => import('@/components/Services'), { loading: () => null });
const Cases = dynamic(() => import('@/components/Cases'), { loading: () => null });
const Process = dynamic(() => import('@/components/Process'), { loading: () => null });
const Stack = dynamic(() => import('@/components/Stack'), { loading: () => null });
import Container from '@/components/Container';
import BriefForm from '@/components/BriefForm';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

function SourceProvider({ children }: { children: (source: string) => React.ReactNode }) {
  const params = useSearchParams();
  const source = params.get('utm_source') ?? 'site';
  return <>{children(source)}</>;
}

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero onOpenBooking={() => setOpen(true)} />
        <Services />
        <Cases />
        <Process />
        <Stack />
        <Container id="brief" className="md:scroll-mt-20 py-10 scroll-mt-16">
          <h2 className="mb-6 text-2xl font-semibold">Оставить бриф проекта</h2>
          <Suspense fallback={<BriefForm defaultSource="site" />}>
            <SourceProvider>
              {(source) => <BriefForm defaultSource={source} />}
            </SourceProvider>
          </Suspense>
        </Container>
      </main>
      <Footer />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Скоро: запись через Telegram WebApp"
      >
        <p className="text-sm">
          Оставьте email — пришлю ссылку, когда запись включу.
        </p>
      </Modal>
    </div>
  );
}
