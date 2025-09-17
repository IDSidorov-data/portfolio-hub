'use client';
import Nav from '@/components/Nav';
import Container from '@/components/Container';

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav backToCases />
      <main className="flex-1">
        <Container className="py-10">
          <article className="prose prose-zinc dark:prose-invert max-w-3xl">{children}</article>
        </Container>
      </main>
    </div>
  );
}
