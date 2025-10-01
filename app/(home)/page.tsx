'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';
const Services = dynamic(() => import('@/components/Services'), { loading: () => null });

// ensure hash #brief scrolls after hydration (mobile reliability)
if (typeof window !== 'undefined') {
  // run once on mount
  setTimeout(() => {
    if (window.location.hash === '#brief') {
      document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 0);
}
const Cases = dynamic(() => import('@/components/Cases'), { loading: () => null });
const Process = dynamic(() => import('@/components/Process'), { loading: () => null });
const Stack = dynamic(() => import('@/components/Stack'), { loading: () => null });
import Container from '@/components/Container';
import Skeleton from '@/components/Skeleton';
import BriefForm from '@/components/BriefForm';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import { useCleanMode } from '@/lib/clean-mode';

function SourceProvider({ children }: { children: (source: string) => React.ReactNode }) {
  const params = useSearchParams();
  const source = params.get('utm_source') ?? 'site';
  return <>{children(source)}</>;
}

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const cleanMode = useCleanMode();

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
          {cleanMode ? (
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
              Для связи используйте чат площадки.
            </p>
          ) : (
            <Suspense fallback={<Skeleton className="h-48" />}>
              <SourceProvider>
                {(source) => <BriefForm defaultSource={source} />}
              </SourceProvider>
            </Suspense>
          )}
        </Container>
      </main>
      <Footer />
      {cleanMode ? null : (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Скоро: запись через Telegram WebApp"
        >
          <p className="text-sm">
            Оставьте email — пришлю ссылку, когда запись включу.
          </p>
        </Modal>
      )}
    </div>
  );
}
