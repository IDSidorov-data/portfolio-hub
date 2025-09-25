'use client';
import Nav from '@/components/Nav';

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav backToCases />
      <main className="flex-1">{children}</main>
    </div>
  );
}
