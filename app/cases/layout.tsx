'use client';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ThemeToggle from '@/components/ThemeToggle';
import { useRouter } from 'next/navigation';

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="py-6 sm:py-10">
      <Container>
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="secondary" href="/#cases">← К списку кейсов</Button>
          </div>
          <ThemeToggle />
        </div>
        <article className="prose prose-zinc dark:prose-invert max-w-3xl">
          {children}
        </article>
      </Container>
    </div>
  );
}
