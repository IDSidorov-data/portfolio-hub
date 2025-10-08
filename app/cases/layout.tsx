'use client';

import { useParams } from 'next/navigation';

import Nav from '@/components/Nav';

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  const params = useParams<{ slug?: string }>();
  const slug = typeof params?.slug === 'string' ? params.slug : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <Nav backToCases caseId={slug} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
