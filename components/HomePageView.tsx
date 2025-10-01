"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import Skeleton from "@/components/Skeleton";
import BriefForm from "@/components/BriefForm";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { CleanModeProvider } from "@/lib/clean-mode";

const Services = dynamic(() => import("@/components/Services"), { loading: () => null });
const Cases = dynamic(() => import("@/components/Cases"), { loading: () => null });
const Process = dynamic(() => import("@/components/Process"), { loading: () => null });
const Stack = dynamic(() => import("@/components/Stack"), { loading: () => null });

type HomePageViewProps = {
  cleanMode: boolean;
};

export default function HomePageView({ cleanMode }: HomePageViewProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#brief") {
      document.getElementById("brief")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <CleanModeProvider value={cleanMode}>
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
                <BriefForm />
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
            <p className="text-sm">Оставьте email — пришлю ссылку, когда запись включу.</p>
          </Modal>
        )}
      </div>
    </CleanModeProvider>
  );
}
