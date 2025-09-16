'use client';
import React from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Container from '@/components/Container';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Modal from '@/components/Modal';

export default function Sandbox() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <h1 className="mb-8 text-4xl sm:text-6xl leading-tight font-semibold">Sandbox</h1>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl">Buttons</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" aria-busy="true">Loading…</Button>
            <Button variant="secondary" onClick={() => setOpen(true)}>Open Modal</Button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl">Cards</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map(i => (
              <Card key={i} className="p-6">
                <h3 className="mb-2 text-xl font-semibold">Card {i}</h3>
                <p className="opacity-80">Secondary text via opacity instead of gray hardcodes.</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl">Form</h2>
          <div className="grid gap-4 sm:max-w-md">
            <label className="text-sm font-medium">Email
              <Input type="email" placeholder="you@example.com" />
            </label>
            <label className="text-sm font-medium">Message
              <Textarea rows={4} placeholder="Tell me more…" />
            </label>
            <p id="error" className="text-red-600 text-xs mt-1">Example error</p>
          </div>
        </section>
      </Container>

      <Modal open={open} onClose={() => setOpen(false)} title="Example modal">
        <p className="opacity-80">Accessible: Esc to close, focus trap, labeled close button.</p>
      </Modal>
    </div>
  );
}
